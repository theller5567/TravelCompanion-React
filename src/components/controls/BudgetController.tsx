import { Slider } from "@/components/ui/slider";
import { useBudget } from "@/contexts/budgetProvider";

function BudgetController() {
  const { totalBudget, setTotalBudget } = useBudget();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Total Budget
        </label>
        <span className="text-sm font-bold text-primary">
          ${totalBudget}
        </span>
      </div>
      
      <Slider 
        value={[totalBudget]} 
        onValueChange={(value) => setTotalBudget(value[0])}
        max={500} 
        step={5} 
      />
      
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
        Max Spendable Funds
      </p>
    </div>
  );
}

export default BudgetController;
