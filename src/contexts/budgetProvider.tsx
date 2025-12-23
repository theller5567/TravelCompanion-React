import React, { createContext, useContext, useState, type ReactElement } from 'react';

/**
 * Interface for the new Flight-Discovery Context
 */
export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface BudgetContextType {
  // Primary Constraints
  totalBudget: number;
  departureLocation: string;
  dateRange: DateRange;
  tripVibe: string;
  numberOfPeople: number;
  // Results & Selection
  selectedCategories: string[];
  userLocation: { lat: number; lng: number } | null;
  isLoading: boolean;

  // Setters
  setTotalBudget: (val: number) => void;
  setDepartureLocation: (val: string) => void;
  setDateRange: (range: DateRange) => void;
  setTripVibe: (vibe: string) => void;
  setNumberOfPeople: (people: number) => void;
  setSelectedCategories: (categories: string[]) => void;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  setIsLoading: (val: boolean) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  // Initialization with sensible defaults for a Travel App
  const [totalBudget, setTotalBudget] = useState<number>(500);
  const [departureLocation, setDepartureLocation] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [tripVibe, setTripVibe] = useState<string>("beach");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);

  const value = {
    totalBudget,
    departureLocation,
    dateRange,
    tripVibe,
    selectedCategories,
    userLocation,
    isLoading,
    numberOfPeople,
    setTotalBudget,
    setDepartureLocation,
    setDateRange,
    setTripVibe,
    setSelectedCategories,
    setUserLocation,
    setIsLoading,
    setNumberOfPeople,
  };

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
