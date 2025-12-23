import { useBudget } from "@/contexts/budgetProvider";
import { cn } from "@/lib/utils";
import { 
  Palmtree, 
  Mountain, 
  Globe, 
  Building2, 
  Compass,
  Wind
} from "lucide-react";

const VIBES = [
  { id: 'beach', label: 'Beach', icon: Palmtree },
  { id: 'mountain', label: 'Mountain', icon: Mountain },
  { id: 'europe', label: 'Europe', icon: Globe },
  { id: 'city', label: 'Big City', icon: Building2 },
  { id: 'adventure', label: 'Adventure', icon: Compass },
  { id: 'relax', label: 'Relax', icon: Wind },
];

function ActivityFilter() {
  const { tripVibe, setTripVibe } = useBudget();

  return (
    <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-white/10">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-highlight uppercase tracking-widest">
            Trip Vibe
          </h3>
          <span className="text-[10px] text-zinc-500 font-mono uppercase">
            {tripVibe}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {VIBES.map((vibe) => {
            const Icon = vibe.icon;
            const isActive = tripVibe === vibe.id;

            return (
              <button
                key={vibe.id}
                onClick={() => setTripVibe(vibe.id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200 group text-left",
                  isActive 
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                    : "bg-zinc-900/50 border-white/5 text-zinc-400 hover:border-white/20 hover:bg-zinc-800"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-md transition-colors",
                  isActive ? "bg-white/20" : "bg-zinc-800 group-hover:bg-zinc-700"
                )}>
                  <Icon size={14} className={isActive ? "text-white" : "text-highlight"} />
                </div>
                <span className="text-xs font-medium tracking-tight">
                  {vibe.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ActivityFilter;
