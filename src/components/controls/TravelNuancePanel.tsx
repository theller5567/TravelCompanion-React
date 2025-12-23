import { useBudget } from "@/contexts/budgetProvider";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function TravelNuancePanel() {
  const {
    travelDistance,
    setTravelDistance,
    vehicleMPG,
    setVehicleMPG,
    fuelPrice,
    setFuelPrice,
    trafficMultiplier,
    setTrafficMultiplier,
    travelCost,
    totalBudget,
    netBudget,
  } = useBudget();

  return (
    <div className="flex flex-col gap-6 mt-8 pt-8 border-t border-white/10">
      <div className="space-y-6">
        <h3 className="text-xs font-bold text-highlight uppercase tracking-widest">
          Travel Nuances
        </h3>
        
        {/* Distance Control - The main driver of cost */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label className="text-zinc-400">One-Way Distance</Label>
            <span className="text-xs font-mono text-white">{travelDistance} miles</span>
          </div>
          <Slider
            value={[travelDistance]}
            onValueChange={(val) => setTravelDistance(val[0])}
            max={200}
            step={5}
          />
        </div>

        {/* Traffic Friction Toggle */}
        <div className="space-y-3">
          <Label className="text-zinc-400">Traffic Density</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Light', val: 1.0, color: 'bg-success' },
              { label: 'Mod', val: 1.3, color: 'bg-warning' },
              { label: 'Heavy', val: 1.8, color: 'bg-accent' }
            ].map((t) => (
              <button
                key={t.label}
                onClick={() => setTrafficMultiplier(t.val)}
                className={cn(
                  "px-2 py-1.5 rounded text-[10px] font-bold uppercase transition-all border border-transparent",
                  trafficMultiplier === t.val 
                    ? `${t.color} text-white shadow-lg scale-105` 
                    : "bg-zinc-800 text-zinc-500 hover:border-zinc-600"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* MPG Control */}
          <div className="space-y-2">
            <Label className="text-zinc-400 text-[10px] uppercase">Vehicle MPG</Label>
            <Input
              type="number"
              value={vehicleMPG}
              onChange={(e) => setVehicleMPG(parseFloat(e.target.value) || 0)}
              className="bg-zinc-800 border-zinc-700 text-white font-mono text-xs h-8"
            />
          </div>

          {/* Fuel Price */}
          <div className="space-y-2">
            <Label className="text-zinc-400 text-[10px] uppercase">Gas ($/gal)</Label>
            <Input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(parseFloat(e.target.value) || 0)}
              className="bg-zinc-800 border-zinc-700 text-white font-mono text-xs h-8"
            />
          </div>
        </div>
      </div>

      {/* --- THE GRAND SUMMARY --- */}
      <div className="mt-4 p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-3">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
          <span className="text-zinc-500">Budget Breakdown</span>
          <span className="text-highlight">Live Calculation</span>
        </div>

        <div className="space-y-2 border-b border-white/5 pb-3">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400 text-xs">Initial Funds</span>
            <span className="text-white font-mono">${totalBudget.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">Est. Travel Cost</span>
            <span className="text-accent font-mono">-${travelCost.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <span className="text-[10px] uppercase font-bold text-success tracking-widest">Net Play Money</span>
          <span className="text-2xl font-mono text-success leading-none">
            ${netBudget.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TravelNuancePanel;
