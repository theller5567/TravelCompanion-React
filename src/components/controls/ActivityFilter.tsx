import { useBudget } from "@/contexts/budgetProvider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { 
  Utensils, 
  Coffee, 
  Palmtree, 
  Ticket, 
  Camera, 
  ShoppingBag,
  Dumbbell,
  Music
} from "lucide-react";

const ACTIVITIES = [
  { id: 'restaurant', label: 'Dining', icon: Utensils },
  { id: 'cafe', label: 'Coffee', icon: Coffee },
  { id: 'park', label: 'Outdoor', icon: Palmtree },
  { id: 'museum', label: 'Culture', icon: Camera },
  { id: 'movie_theater', label: 'Movies', icon: Ticket },
  { id: 'shopping_mall', label: 'Shopping', icon: ShoppingBag },
  { id: 'gym', label: 'Fitness', icon: Dumbbell },
  { id: 'night_club', label: 'Nightlife', icon: Music },
];

function ActivityFilter() {
  const { selectedCategories, setSelectedCategories } = useBudget();

  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(c => c !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-white/10">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-highlight uppercase tracking-widest">
            Vibe & Activities
          </h3>
          <span className="text-[10px] text-zinc-500 font-mono">
            {selectedCategories.length} Selected
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {ACTIVITIES.map((activity) => {
            const Icon = activity.icon;
            const isActive = selectedCategories.includes(activity.id);

            return (
              <button
                key={activity.id}
                onClick={() => toggleCategory(activity.id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200 group",
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
                  {activity.label}
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

