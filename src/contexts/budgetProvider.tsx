import React, { createContext, useContext, useState, useMemo, type ReactElement } from 'react';

/**
 * Interface for Budget Context State
 */
interface BudgetContextType {
  // Inputs
  totalBudget: number;
  travelDistance: number;
  vehicleMPG: number;
  fuelPrice: number;
  estimatedTolls: number;
  trafficMultiplier: number;
  selectedCategories: string[];
  userLocation: { lat: number; lng: number } | null;

  // Setters
  setTotalBudget: (val: number) => void;
  setTravelDistance: (val: number) => void;
  setVehicleMPG: (val: number) => void;
  setFuelPrice: (val: number) => void;
  setEstimatedTolls: (val: number) => void;
  setTrafficMultiplier: (val: number) => void;
  setSelectedCategories: (categories: string[]) => void;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;

  // Derived Logic
  travelCost: number;
  netBudget: number;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  // State initialization
  const [totalBudget, setTotalBudget] = useState<number>(100);
  const [travelDistance, setTravelDistance] = useState<number>(0);
  const [vehicleMPG, setVehicleMPG] = useState<number>(25);
  const [fuelPrice, setFuelPrice] = useState<number>(3.50);
  const [estimatedTolls, setEstimatedTolls] = useState<number>(0);
  const [trafficMultiplier, setTrafficMultiplier] = useState<number>(1.0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  /**
   * The "Nuance Engine" Logic
   * Calculates the cost of getting there based on vehicle efficiency, 
   * fuel costs, tolls, and traffic friction.
   */
  const travelCost = useMemo(() => {
    if (vehicleMPG <= 0) return 0;
    
    // Base Fuel Cost: (Distance / MPG) * Price
    const baseFuelCost = (travelDistance / vehicleMPG) * fuelPrice;
    
    // Apply Traffic Friction (Traffic increases fuel consumption)
    const trafficAdjustedFuel = baseFuelCost * trafficMultiplier;
    
    return trafficAdjustedFuel + estimatedTolls;
  }, [travelDistance, vehicleMPG, fuelPrice, trafficMultiplier, estimatedTolls]);

  /**
   * The actual money remaining for activities
   */
  const netBudget = useMemo(() => {
    return Math.max(0, totalBudget - travelCost);
  }, [totalBudget, travelCost]);

  const value = {
    totalBudget,
    travelDistance,
    vehicleMPG,
    fuelPrice,
    estimatedTolls,
    trafficMultiplier,
    selectedCategories,
    userLocation,
    setTotalBudget,
    setTravelDistance,
    setVehicleMPG,
    setFuelPrice,
    setEstimatedTolls,
    setTrafficMultiplier,
    setSelectedCategories,
    setUserLocation,
    travelCost,
    netBudget,
  };

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
};

/**
 * Custom hook to consume the Budget Logic
 */
export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

