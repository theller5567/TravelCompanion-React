import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBudget } from "@/contexts/budgetProvider";
import { Label } from "@/components/ui/label";

function TripDatePicker() {
  const { dateRange, setDateRange } = useBudget();

  // Convert internal DateRange to react-day-picker's expected format
  const range: DateRange | undefined = React.useMemo(() => ({
    from: dateRange.from,
    to: dateRange.to,
  }), [dateRange]);

  const handleSelect = (newRange: DateRange | undefined) => {
    setDateRange({
      from: newRange?.from,
      to: newRange?.to,
    });
  };

  return (
    <div className="space-y-2 mt-6">
      <Label className="text-zinc-400 text-[10px] uppercase tracking-widest font-bold">
        Travel Dates
      </Label>
      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal bg-zinc-900 border-white/10 h-10 hover:bg-zinc-800 hover:text-white transition-colors",
                !dateRange.from && "text-zinc-600"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-highlight" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick your dates</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-zinc-900 border-white/10 shadow-2xl" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={range}
              onSelect={handleSelect}
              numberOfMonths={2}
              className="text-white"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default TripDatePicker;

