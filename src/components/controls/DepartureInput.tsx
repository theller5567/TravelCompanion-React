import { useBudget } from "@/contexts/budgetProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Users } from "lucide-react";

function DepartureInput() {
  const { departureLocation, setDepartureLocation, numberOfPeople, setNumberOfPeople } = useBudget();

  return (
    <div className="space-y-2">
      <Label className="text-zinc-400 text-[10px] uppercase tracking-widest font-bold">
        Departure City
      </Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-highlight" size={14} />
        <Input
          placeholder="e.g. Atlanta, GA"
          value={departureLocation}
          onChange={(e) => setDepartureLocation(e.target.value)}
          className="bg-zinc-900 border-white/10 text-white pl-9 h-10 placeholder:text-zinc-600 focus:border-highlight/50 transition-colors"
        />
      </div>
      <div className="relative">
        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-highlight" size={14} />
        <Input
          type="number"
          placeholder="How many people are going?"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(Number(e.target.value))}
          className="bg-zinc-900 border-white/10 text-white pl-9 h-10 placeholder:text-zinc-600 focus:border-highlight/50 transition-colors"
        />
      </div>
    </div>
  );
}

export default DepartureInput;

