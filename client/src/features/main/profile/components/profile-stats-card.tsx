import { useGetExpenseSummary } from '@/features/main/dashboard/hooks/queries/use-get-expense-summary';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { IndianRupee, ReceiptText, Flame, ArrowUpRight } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

export function ProfileStatsCard() {
  const { data, isLoading, isFetching } = useGetExpenseSummary();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="bg-card relative flex h-[130px] items-center justify-center overflow-hidden border">
            <Spinner className="text-muted-foreground h-6 w-6 animate-spin" />
          </Card>
        ))}
      </div>
    );
  }

  const totalSpent = data?.totalExpenses ?? 0;
  const transactionCount = data?.totalTransactions ?? 0;
  const topCategory = data?.mostUsedCategory ?? 'None';
  const highestExpense = data?.highestExpense;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">Spending Summary</h3>

      <div className="grid gap-4 sm:grid-cols-3">
        {/* Card: Total Expenses */}
        <Card className="relative overflow-hidden shadow-sm transition-shadow hover:shadow">
          {isFetching && (
            <div className="absolute top-2.5 right-2.5 z-20">
              <Spinner className="h-3 w-3" />
            </div>
          )}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription className="text-sm font-medium">
              Total Expenses Tracked
            </CardDescription>
            <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-500">
              <IndianRupee className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSpent.toLocaleString('en-IN')}</div>
            <p className="text-muted-foreground mt-1 text-xs">All-time tracked value</p>
          </CardContent>
        </Card>

        {/* Card: Transaction Count */}
        <Card className="relative overflow-hidden shadow-sm transition-shadow hover:shadow">
          {isFetching && (
            <div className="absolute top-2.5 right-2.5 z-20">
              <Spinner className="h-3 w-3" />
            </div>
          )}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription className="text-sm font-medium">Transaction Count</CardDescription>
            <div className="rounded-full bg-indigo-500/10 p-2 text-indigo-500">
              <ReceiptText className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactionCount}</div>
            <p className="text-muted-foreground mt-1 text-xs">Successful transactions logged</p>
          </CardContent>
        </Card>

        {/* Card: Top Category */}
        <Card className="relative overflow-hidden shadow-sm transition-shadow hover:shadow">
          {isFetching && (
            <div className="absolute top-2.5 right-2.5 z-20">
              <Spinner className="h-3 w-3" />
            </div>
          )}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription className="text-sm font-medium">Most Used Category</CardDescription>
            <div className="rounded-full bg-orange-500/10 p-2 text-orange-500">
              <Flame className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="truncate text-2xl font-bold capitalize">
              {topCategory.toLowerCase()}
            </div>
            {highestExpense ? (
              <p className="text-muted-foreground mt-1 flex items-center gap-0.5 truncate text-xs">
                Highest expense: <span className="font-semibold">₹{highestExpense.amount}</span>
                <ArrowUpRight className="inline h-3 w-3 text-red-500" />
              </p>
            ) : (
              <p className="text-muted-foreground mt-1 text-xs">No transaction history</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
