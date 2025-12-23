import ActivityFeed from "@/components/discovery/ActivityFeed";
import { useBudget } from "@/contexts/budgetProvider";
import { cn } from "@/lib/utils";

function MapOverlay() {
  const { flightResults, isLoading } = useBudget();
  const hasResults = flightResults.length > 0 || isLoading;

  return (
    <div 
      className={cn(
        "absolute inset-0 z-30 transition-all duration-500 pointer-events-none",
        hasResults ? "bg-zinc-950/40 backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className={cn(
        "h-full w-full max-w-4xl mx-auto transition-transform duration-700 ease-out pointer-events-auto",
        hasResults ? "translate-y-0" : "translate-y-full"
      )}>
        <ActivityFeed />
      </div>
    </div>
  )
}

export default MapOverlay;