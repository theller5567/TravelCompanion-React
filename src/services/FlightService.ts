/**
 * FlightService.ts
 * Core logic for the Air Discovery Engine.
 * Handlers for destination discovery and price validation.
 */

import OpenAI from 'openai';

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

  private openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    baseURL: window.location.origin + '/v1', // This tells the SDK to use our Vite Proxy
    dangerouslyAllowBrowser: true
  });

  private accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): FlightService {
    if (!FlightService.instance) {
      FlightService.instance = new FlightService();
    }
    return FlightService.instance;
  }

  /**
   * Helper to map IATA codes to Human-friendly names.
   * In a production app, this would be a larger dictionary or an API call.
   */
  private getCityName(code: string): string {
    const cityMap: Record<string, string> = {
      'MIA': 'Miami, Florida',
      'CUN': 'Cancún, Mexico',
      'SJU': 'San Juan, Puerto Rico',
      'HNL': 'Honolulu, Hawaii',
      'OGG': 'Kahului, Maui',
      'LIH': 'Lihue, Kauai',
      'DEN': 'Denver, Colorado',
      'AVL': 'Asheville, NC',
      'SLC': 'Salt Lake City, UT',
      'NAS': 'Nassau, Bahamas',
      'MBJ': 'Montego Bay, Jamaica',
      'PUJ': 'Punta Cana, DR',
      'CDG': 'Paris, France',
      'AMS': 'Amsterdam, Netherlands',
      'BCN': 'Barcelona, Spain',
      'LHR': 'London, UK',
      'FCO': 'Rome, Italy',
    };
    return cityMap[code] || `Destination (${code})`;
  }

  /**
   * Helper to get a vibrant image based on the destination code.
   */
  private getDestinationImage(code: string): string {
    const images: Record<string, string> = {
      'SJU': 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?auto=format&fit=crop&w=800&q=80',
      'DEN': 'https://images.unsplash.com/photo-1548625361-195fe577b0be?auto=format&fit=crop&w=800&q=80',
      'CUN': 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=800&q=80',
      'MIA': 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=800&q=80',
      'HNL': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    };
    return images[code] || 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&w=800&q=80'; // Default airplane view
  }

  /**
   * Main Discovery Method (Production Version)
   * Merges AI intelligence with real-world pricing data.
   */
  public async discoverFlights(
    origin: string, 
    budget: number, 
    vibe: string, 
    month: string
  ): Promise<FlightResult[]> {
    console.log(`[FlightService] Real discovery initiated for ${vibe} from ${origin} within $${budget}`);

    try {
      // 1. Ask AI for vibe-matching destinations
      const { destinations: vibeCodes } = await this.getDestinationsForVibe(vibe, month);
      console.log(`[FlightService] AI suggested: ${vibeCodes}`);
      
      // 2. Ask Amadeus for affordable destinations from this origin
      const realFlights = await this.searchRealFlights(origin, budget);
      console.log(`[FlightService] Amadeus found ${realFlights.length} destinations within budget.`);

      // 3. Merge: Filter real flights to only include those suggested by AI
      const filtered = realFlights.filter((f: any) => vibeCodes.includes(f.destination));
      
      // Fallback: If no direct matches between AI and Amadeus, use the Amadeus ones but label them
      const resultsToMap = filtered.length > 0 ? filtered : realFlights.slice(0, 6);

      // 4. Map the results to our FlightResult interface
      return resultsToMap.map((f: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        destination: this.getCityName(f.destination),
        iataCode: f.destination,
        price: parseFloat(f.price.total),
        currency: 'USD',
        departureDate: f.departureDate || '2025-01-01',
        returnDate: f.returnDate || '2025-01-07',
        vibeMatch: vibeCodes.includes(f.destination) ? 0.95 : 0.75,
        imageUrl: this.getDestinationImage(f.destination)
      }));

    } catch (error) {
      console.error("[FlightService] Discovery Error:", error);
      // Fail gracefully to mock data if the API fails
      return this.discoverMockFlights(budget, vibe, month);
    }
  }

  /**
   * Mock implementation for UI development.
   */
  public async discoverMockFlights(
    budget: number, 
    vibe: string,
    month: string
  ): Promise<FlightResult[]> {
    console.log(`[FlightService] Serving Mock Data for ${vibe} in ${month}`);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResults: FlightResult[] = [
      {
        id: 'mock-1',
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
        id: 'mock-2',
        destination: 'Denver, Colorado',
        iataCode: 'DEN',
        price: 189.00,
        currency: 'USD',
        departureDate: '2025-03-10',
        returnDate: '2025-03-15',
        vibeMatch: 0.88,
        imageUrl: 'https://images.unsplash.com/photo-1548625361-195fe577b0be?auto=format&fit=crop&w=800&q=80'
      }
    ];

    return mockResults.filter(f => f.price <= budget);
  }

  /**
   * Real Amadeus Inspiration Search
   */
  public async searchRealFlights(origin: string, maxPrice: number) {
    const token = await this.getAccessToken();
    
    try {
      const response = await fetch(
        `/amadeus/v2/shopping/flight-destinations?origin=${origin}&maxPrice=${Math.round(maxPrice)}&oneWay=false`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const result = await response.json();
      return result.data || []; 
    } catch (error) {
      console.error("[FlightService] Amadeus Search Error:", error);
      return [];
    }
  }

  /**
   * Real OpenAI Vibe Mapping
   */
  public async getDestinationsForVibe(vibe: string, month: string){
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-5-instant",
        messages: [
          { 
            role: "system", 
            content: "You are a travel discovery expert. Return a JSON object with a key 'destinations' containing an array of 10 IATA codes matching the vibe and month. Example: {'destinations': ['MIA', 'CUN', 'SJU']}" 
          },
          { role: "user", content: `Vibe: ${vibe}, Month: ${month}` }
        ],
        response_format: { type: "json_object" }
      });
      
      const content = response.choices[0].message.content;
      const iataCodes = JSON.parse(content || '{}').destinations || [];
      return { destinations: iataCodes };
    } catch (error: any) {
      console.error("[FlightService] OpenAI Mapping Error:", error);
      return { destinations: ["MIA", "CUN", "SJU"] };
    }
  }

  /**
   * Amadeus OAuth2 Handshake
   */
  private async getAccessToken() {
    if (this.accessToken) return this.accessToken;
  
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', this.apiKey);
    params.append('client_secret', this.apiSecret);
  
    const response = await fetch('/amadeus/v1/security/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });
  
    const data = await response.json();
    this.accessToken = data.access_token;
    return this.accessToken;
  }
}

export const flightService = FlightService.getInstance();
