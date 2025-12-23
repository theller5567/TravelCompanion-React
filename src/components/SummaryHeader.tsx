import { useBudget } from "@/contexts/budgetProvider";

function SummaryHeader() {
  const { netBudget } = useBudget();

  // Senior dev tip: Use Intl.NumberFormat for clean, localized currency
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <header 
      id="summary-header" 
      className="px-6 h-16 flex justify-between items-center bg-primary text-white shadow-xl z-50 border-b border-white/10"
    >
      <div className="flex flex-col">
        <h1 className="text-[10px] uppercase font-black tracking-[0.2em] opacity-70">
          Travel Companion
        </h1>
        <span className="text-xs font-medium text-highlight">Discovery Engine</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-[10px] uppercase font-bold text-white/50 leading-none mb-1">
            Available Funds
          </p>
          <p className="text-2xl font-mono font-bold tracking-tight">
            {formatter.format(netBudget)}
          </p>
        </div>
      </div>
    </header>
  )
}

export default SummaryHeader;
