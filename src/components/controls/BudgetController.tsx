import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useBudget } from "@/contexts/budgetProvider";
import { formatCurrency } from "@/utils/FinanceHelper";

function BudgetController() {
  const { totalBudget, setTotalBudget } = useBudget();


  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Total Budget
        </label>
        <span className="text-sm font-bold text-primary">
          {formatCurrency(totalBudget, 'USD', 'en-US')}
        </span>
      </div>
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Use the slider to set your total budget, or enter it manually below.</p>
        <Input
          type="number"
          placeholder="Enter your total budget manually..."
          value={totalBudget}
          onChange={(e) => setTotalBudget(Number(e.target.value))}
          className="bg-zinc-800 border-zinc-700 text-white font-mono text-xs h-8"
        />
      <Slider 
        value={[totalBudget]} 
        onValueChange={(value) => setTotalBudget(value[0])}
        max={95000} 
        step={5} 
      />
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
        Max Spendable Funds
      </p>
    </div>
  );
}

export default BudgetController;
