const { cached, ONE_HOUR } = require('../build-cache');

const V2_ENDPOINT = 'https://api.opencollective.com/graphql/v2';
const V1_ENDPOINT = 'https://api.opencollective.com/graphql/v1';

const V2_QUERY = `
  query PublicCollectiveFunding($slug: String!) {
    account(slug: $slug) {
      id
      slug
      currency
      stats {
        balance { value currency }
        yearlyBudget { value currency }
        activeRecurringContributionsBreakdown { label amount { value currency } count }
      }
      ... on Collective {
        tiers {
          nodes {
            amount { value currency }
            currency
            frequency
            presets
            availableQuantity
            amountType
            minimumAmount { value currency }
            endsAt
          }
        }
      }
    }
  }
`;

const V1_GOALS_QUERY = `
  query PublicCollectiveFundingGoals($slug: String!) {
    Collective(slug: $slug) {
      settings
    }
  }
`;

function numericValue(value) {
  if (typeof value === 'string' && value.trim() === '') return null;
  const number = typeof value === 'number' || typeof value === 'string' ? Number(value) : NaN;
  return Number.isFinite(number) ? number : null;
}

function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function amountValue(amount) {
  if (!amount || typeof amount !== 'object') return null;
  const value = numericValue(amount.value);
  return value == null ? null : roundMoney(value);
}

async function fetchGraphql(endpoint, query, slug) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query, variables: { slug } }),
  });
  if (!response.ok) {
    throw new Error(`Open Collective returned HTTP ${response.status} from ${endpoint}`);
  }

  let body;
  try {
    body = await response.json();
  } catch (error) {
    throw new Error(`Open Collective returned invalid JSON: ${error.message}`);
  }
  if (Array.isArray(body.errors) && body.errors.length > 0) {
    const details = body.errors.map(error => error.message || 'Unknown GraphQL error').join('; ');
    throw new Error(`Open Collective GraphQL error: ${details}`);
  }
  if (!body.data || typeof body.data !== 'object') {
    throw new Error('Open Collective GraphQL response did not contain data');
  }
  return body.data;
}

function normalizeGoals(sourceGoals, account, yearlyBudget, monthlyBudget, balance) {
  if (typeof sourceGoals === 'string') {
    try {
      sourceGoals = JSON.parse(sourceGoals);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(sourceGoals)) return [];

  return sourceGoals.flatMap((goal, index) => {
    if (!goal || typeof goal !== 'object' || Array.isArray(goal)) return [];
    if (typeof goal.type !== 'string' || goal.type.trim() === '') return [];
    if (typeof goal.title !== 'string' || goal.title.trim() === '') return [];

    const amountCents = numericValue(goal.amount);
    if (amountCents == null || amountCents <= 0) return [];
    const amount = roundMoney(amountCents / 100);
    if (amount <= 0) return [];

    let progressBasis = null;
    if (goal.type === 'monthlyBudget') progressBasis = monthlyBudget;
    else if (goal.type === 'yearlyBudget') progressBasis = yearlyBudget;
    else if (goal.type === 'balance') progressBasis = balance;

    const key = goal.key;
    const id = typeof key === 'string' || typeof key === 'number' ? String(key) : `${account.id}-${index}`;
    return [{
      id,
      title: goal.title,
      description: typeof goal.description === 'string' ? goal.description : null,
      type: goal.type,
      amount,
      progress: progressBasis == null ? null : roundMoney((progressBasis / amount) * 100),
    }];
  });
}

function tierIsAvailable(tier, now) {
  if (tier.availableQuantity != null) {
    const quantity = numericValue(tier.availableQuantity);
    if (quantity == null || quantity <= 0) return false;
  }
  if (tier.endsAt != null) {
    if (typeof tier.endsAt !== 'string') return false;
    const endsAt = Date.parse(tier.endsAt);
    if (!Number.isFinite(endsAt) || endsAt <= now) return false;
  }
  return true;
}

function normalizeFundingData(account, settings, fetchedAt = new Date().toISOString(), now = Date.now()) {
  const stats = account.stats || {};
  const yearlyBudgetAmount = amountValue(stats.yearlyBudget);
  const balanceAmount = amountValue(stats.balance);
  const yearlyBudget = yearlyBudgetAmount == null ? null : roundMoney(yearlyBudgetAmount);
  const balance = balanceAmount == null ? null : roundMoney(balanceAmount);
  const monthlyBudget = yearlyBudget == null ? null : roundMoney(yearlyBudget / 12);

  let monthlyIncome = null;
  let supporterCount = null;
  const breakdown = stats.activeRecurringContributionsBreakdown;
  if (Array.isArray(breakdown)) {
    let income = 0;
    let recognizedPeriod = breakdown.length === 0;
    let count = 0;
    let recognizedCount = false;
    for (const contribution of breakdown) {
      if (!contribution || typeof contribution !== 'object') continue;
      const isMonthly = contribution.label === 'monthly';
      const isYearly = contribution.label === 'yearly';
      if (isMonthly || isYearly) {
        const value = amountValue(contribution.amount);
        if (value != null) {
          income += isMonthly ? value : value / 12;
          recognizedPeriod = true;
        }
        const contributionCount = numericValue(contribution.count);
        if (contributionCount != null && Number.isInteger(contributionCount) && contributionCount >= 0) {
          count += contributionCount;
          recognizedCount = true;
        }
      }
    }
    if (recognizedPeriod) monthlyIncome = roundMoney(income);
    if (recognizedCount || breakdown.length === 0) supporterCount = count;
  }

  const presets = new Set();
  const minimumAmounts = [];
  const tiers = account.tiers && Array.isArray(account.tiers.nodes) ? account.tiers.nodes : [];
  for (const tier of tiers) {
    if (!tier || typeof tier !== 'object' || typeof tier.amountType !== 'string' || tier.amountType.toUpperCase() !== 'FLEXIBLE') continue;
    if (typeof tier.frequency !== 'string' || tier.frequency.toUpperCase() !== 'MONTHLY') continue;
    if (!tierIsAvailable(tier, now)) continue;

    const suggestedAmount = amountValue(tier.amount);
    if (suggestedAmount != null && suggestedAmount > 0) presets.add(roundMoney(suggestedAmount));

    if (Array.isArray(tier.presets)) {
      for (const preset of tier.presets) {
        const cents = numericValue(preset);
        if (cents != null && cents > 0) presets.add(roundMoney(cents / 100));
      }
    }

    const minimumAmount = amountValue(tier.minimumAmount);
    if (minimumAmount != null && minimumAmount >= 0) minimumAmounts.push(roundMoney(minimumAmount));
  }

  const tierCurrency = tiers.find(tier => typeof tier?.currency === 'string' && tier.currency.trim() !== '')?.currency;
  const currency = [account.currency, stats.balance?.currency, tierCurrency]
    .find(value => typeof value === 'string' && value.trim() !== '') || '';

  return {
    available: true,
    currency,
    monthlyIncome,
    estimatedMonthlyBudget: monthlyBudget,
    balance,
    supporterCount,
    presets: [...presets].sort((a, b) => a - b),
    minimumAmount: minimumAmounts.length ? Math.min(...minimumAmounts) : null,
    goals: normalizeGoals(settings?.goals, account, yearlyBudget, monthlyBudget, balance),
    fetchedAt,
  };
}

function unavailableData() {
  return {
    available: false,
    currency: '',
    monthlyIncome: null,
    estimatedMonthlyBudget: null,
    balance: null,
    supporterCount: null,
    presets: [],
    minimumAmount: null,
    goals: [],
    fetchedAt: null,
  };
}

module.exports = function owncastFundingPlugin(_context, options = {}) {
  const { slug = 'owncast' } = options;

  return {
    name: 'owncast-funding',

    async contentLoaded({ actions }) {
      try {
        const data = await cached(`owncast-funding-${slug.replace(/[^a-zA-Z0-9_-]/g, '_')}`, ONE_HOUR, async () => {
          const [v2Data, v1Data] = await Promise.all([
            fetchGraphql(V2_ENDPOINT, V2_QUERY, slug),
            fetchGraphql(V1_ENDPOINT, V1_GOALS_QUERY, slug),
          ]);
          const account = v2Data.account;
          if (!account || typeof account !== 'object') {
            throw new Error(`Open Collective account not found: ${slug}`);
          }
          if (!v1Data.Collective || typeof v1Data.Collective !== 'object') {
            throw new Error(`Open Collective goals were not returned for ${slug}`);
          }
          const settings = v1Data.Collective.settings;
          return normalizeFundingData(account, settings, new Date().toISOString());
        });
        actions.setGlobalData(data);
        console.log(`[owncast-funding] Loaded public funding data for ${slug}`);
      } catch (error) {
        console.error(`[owncast-funding] Failed to load funding data for ${slug}: ${error.message}`);
        actions.setGlobalData(unavailableData());
      }
    },
  };
};

module.exports.normalizeFundingData = normalizeFundingData;
module.exports.unavailableData = unavailableData;
