// Tiny disk cache with a TTL. The CI build runs one `docusaurus build` process
// per locale, and each process would otherwise repeat identical GitHub API
// fetches. Lives under node_modules/.cache so it never dirties the git tree.
const fs = require('fs');
const path = require('path');

const CACHE_DIR = path.join(__dirname, '..', 'node_modules', '.cache', 'owncast-build-data');

async function cached(name, ttlMs, fetchFn) {
  const file = path.join(CACHE_DIR, `${name}.json`);
  try {
    if (Date.now() - fs.statSync(file).mtimeMs < ttlMs) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch {
    // missing or unreadable cache: fall through to a fresh fetch
  }
  const data = await fetchFn();
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data));
  return data;
}

module.exports = { cached, ONE_HOUR: 60 * 60 * 1000 };
