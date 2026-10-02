export interface FundingGoal {
  id: string;
  title: string;
  description: string | null;
  /** Open Collective goal type; unknown future types are preserved. */
  type: string;
  /** Goal target in major currency units. */
  amount: number;
  /** Percentage against the goal type's matching funding figure, or null when unknown/unavailable. */
  progress: number | null;
}

export interface FundingData {
  available: boolean;
  currency: string;
  /** Active monthly contributions plus active yearly contributions divided by 12, in major currency units. */
  monthlyIncome: number | null;
  /** Open Collective yearly budget divided by 12, in major currency units. */
  estimatedMonthlyBudget: number | null;
  /** Open Collective balance in major currency units. */
  balance: number | null;
  supporterCount: number | null;
  /** Available monthly flexible tier presets and suggested amount, in major currency units. */
  presets: number[];
  /** Lowest available monthly flexible tier minimum, in major currency units. */
  minimumAmount: number | null;
  goals: FundingGoal[];
  /** Timestamp of the successful Open Collective snapshot, not the cache-read time. */
  fetchedAt: string | null;
}
