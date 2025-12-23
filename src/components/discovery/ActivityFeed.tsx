import React from "react";
import { useBudget } from "@/contexts/budgetProvider";
import ResultCard from "./ResultCard";
import { motion, AnimatePresence } from "framer-motion";
import { PlaneTakeoff, Search, Loader2, Map } from "lucide-react";

const ActivityFeed: React.FC = () => {
  const { flightResults, isLoading, tripVibe } = useBudget();

  // Loading State - "Scanning the Globe"
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center bg-zinc-950/80 backdrop-blur-xl">
        <div className="relative mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-2 border-dashed border-primary/30 rounded-full"
          />
          <div className="relative bg-primary/10 border border-primary/20 p-8 rounded-full shadow-[0_0_50px_rgba(139,92,246,0.3)]">
            <Loader2 className="h-16 w-12 text-primary animate-spin" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Scanning the Globe</h2>
        <p className="text-zinc-400 max-w-xs mx-auto text-sm leading-relaxed animate-pulse">
          Translating your <span className="text-highlight font-bold uppercase">{tripVibe}</span> vibe into the best available flight paths...
        </p>
      </div>
    );
  }

  // If no results and not loading, show the empty state
  if (flightResults.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative bg-zinc-900 border border-zinc-800 p-6 rounded-full shadow-2xl">
            <Search className="h-12 w-12 text-primary animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Ready for Discovery?</h2>
        <p className="text-zinc-400 max-w-xs mx-auto text-sm leading-relaxed">
          Adjust your budget and pick a vibe in the sidebar to reveal hidden gems within your reach.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white tracking-tight">Found Escapes</h2>
          <p className="text-xs text-highlight font-bold uppercase tracking-widest">
            {flightResults.length} Locations within budget
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Live Prices</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        <AnimatePresence mode="popLayout">
          {flightResults.map((flight, index) => (
            <motion.div
              key={flight.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
              <ResultCard flight={flight} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityFeed;
