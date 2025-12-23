/**
 * FlightService.ts
 * Core logic for the Air Discovery Engine.
 * Handlers for destination discovery and price validation.
 */

export interface FlightResult {
  id: string;
  destination: string;
  iataCode: string;
  price: number;
  currency: string;
  departureDate: string;
  returnDate: string;
  vibeMatch: number; // 0-1 score of how well it fits the 'Beach' or 'Mountain' vibe
  imageUrl: string;
}

class FlightService {
  private static instance: FlightService;
  
  // Amadeus Config (Prefixed for Vite)
  private apiKey = import.meta.env.VITE_AMADEUS_API_KEY;
  private apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET;

  private constructor() {}

  public static getInstance(): FlightService {
    if (!FlightService.instance) {
      FlightService.instance = new FlightService();
    }
    return FlightService.instance;
  }

  /**
   * Mock implementation for UI development.
   * Simulates a delayed API response with diverse results.
   */
  public async discoverMockFlights(
    budget: number, 
    vibe: string
  ): Promise<FlightResult[]> {
    console.log(`[FlightService] Mock discovery initiated for ${vibe} within $${budget}`);
    
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResults: FlightResult[] = [
      {
        id: '1',
        destination: 'San Juan, Puerto Rico',
        iataCode: 'SJU',
        price: 245.50,
        currency: 'USD',
        departureDate: '2025-02-14',
        returnDate: '2025-02-18',
        vibeMatch: 0.95,
        imageUrl: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '2',
        destination: 'Denver, Colorado',
        iataCode: 'DEN',
        price: 189.00,
        currency: 'USD',
        departureDate: '2025-03-10',
        returnDate: '2025-03-15',
        vibeMatch: 0.88,
        imageUrl: 'https://images.unsplash.com/photo-1548625361-195fe577b0be?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '3',
        destination: 'Cancun, Mexico',
        iataCode: 'CUN',
        price: 320.00,
        currency: 'USD',
        departureDate: '2025-04-05',
        returnDate: '2025-04-12',
        vibeMatch: 0.98,
        imageUrl: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=800&q=80'
      }
    ];

    // Filter by budget for realism
    return mockResults.filter(f => f.price <= budget);
  }

  /**
   * TODO: Real Amadeus Integration
   * We will implement the OAuth2 flow and Flight Inspiration Search here.
   */
  public async searchRealFlights() {
    // Placeholder for future API logic
    if (!this.apiKey || !this.apiSecret) {
       console.error("Missing Amadeus API credentials");
       return [];
    }
  }
}

export const flightService = FlightService.getInstance();
