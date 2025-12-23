import React from "react";
import { motion } from "framer-motion";
import { Plane, Calendar, MapPin, Percent } from "lucide-react";
import type { FlightResult } from "@/services/FlightService";
import { formatCurrency } from "@/utils/FinanceHelper";
import { Button } from "@/components/ui/button";

interface ResultCardProps {
  flight: FlightResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ flight }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl transition-all duration-300 hover:border-primary/50"
    >
      {/* Destination Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
        <img
          src={flight.imageUrl}
          alt={flight.destination}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Vibe Match Badge */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
          <Percent className="h-3 w-3 text-highlight" />
          <span className="text-[10px] font-bold text-white uppercase tracking-tighter">
            {Math.round(flight.vibeMatch * 100)}% Match
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
              {flight.destination}
            </h3>
            <div className="flex items-center gap-1 text-zinc-400 mt-1">
              <MapPin className="h-3 w-3" />
              <span className="text-xs font-medium uppercase tracking-widest">
                {flight.iataCode} Airport
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-2xl font-mono font-bold text-highlight tracking-tighter">
              {formatCurrency(flight.price, flight.currency)}
            </span>
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
              Round Trip
            </span>
          </div>
        </div>

        {/* Travel Details */}
        <div className="grid grid-cols-2 gap-4 py-3 border-y border-zinc-800/50">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase font-bold">Departure</span>
              <span className="text-xs font-mono text-zinc-300">{flight.departureDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end w-full">
              <span className="text-[9px] text-zinc-500 uppercase font-bold">Return</span>
              <span className="text-xs font-mono text-zinc-300">{flight.returnDate}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-zinc-800 hover:bg-primary text-white border-none group/btn transition-all duration-300">
          <Plane className="mr-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          View Flights
        </Button>
      </div>
    </motion.div>
  );
};

export default ResultCard;
