import { useBudget } from "@/contexts/budgetProvider";
import { Button } from "@/components/ui/button";
import { PlaneTakeoff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { flightService } from "@/services/FlightService";

function DiscoverButton() {
  const { 
    departureLocation, 
    dateRange, 
    totalBudget,
    tripVibe,
    isLoading, 
    setIsLoading,
    setFlightResults
  } = useBudget();

  // Button is disabled if we don't have basic search parameters
  const isReady = departureLocation.trim() !== "" && dateRange?.from !== undefined;

  const month = dateRange?.from?.toLocaleString('default', { month: 'long' }) || '';
  console.log(`[DiscoverButton] Month: ${month}`);

  const handleDiscover = async () => {
    if (!isReady || isLoading) return;

    setIsLoading(true);

    try {
      // Execute the production discovery using our flight service
      // We pass the location code (e.g., ATL) and the month
      const results = await flightService.discoverFlights(
        departureLocation, 
        totalBudget, 
        tripVibe, 
        month
      );
      
      // Store results in global state
      setFlightResults(results);
      console.log("Discovery successful! Results found:", results);
    } catch (error) {
      console.error("Discovery failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-auto pt-8 pb-4">
      <Button
        onClick={handleDiscover}
        disabled={!isReady || isLoading}
        className={cn(
          "w-full h-14 text-lg font-bold uppercase tracking-widest transition-all duration-300 shadow-2xl",
          isReady && !isLoading
            ? "bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-primary/40"
            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <PlaneTakeoff className="mr-2 h-5 w-5" />
            Discover Your Trip
          </>
        )}
      </Button>
      
      {!isReady && !isLoading && (
        <p className="text-[10px] text-zinc-500 text-center mt-3 uppercase tracking-tighter opacity-80">
          Enter departure and dates to unlock
        </p>
      )}
    </div>
  );
}

export default DiscoverButton;

