{
  "merge": false,
  "todos": [
    {
      "id": "state-logic",
      "content": "Core: Budget & Calculation Engine (Context API)",
      "status": "completed"
    },
    {
      "id": "layout-shell",
      "content": "UI: AppShell (Layout Container & Responsive Grid)",
      "status": "in_progress"
    },
    {
      "id": "sidebar-inputs",
      "content": "Component: ControlSidebar (Container for Filter/Inputs)",
      "status": "pending"
    },
    {
      "id": "budget-slider",
      "content": "Module: BudgetController (Slider + Manual Entry)",
      "status": "pending"
    },
    {
      "id": "vehicle-module",
      "content": "Module: VehicleSettings (MPG & Fuel Price Inputs)",
      "status": "pending"
    },
    {
      "id": "map-core",
      "content": "Service: MapEngine (Google Maps Base + User Location)",
      "status": "pending"
    },
    {
      "id": "map-isochrone",
      "content": "Module: ReachableArea (Isochrone/Polygon Logic)",
      "status": "pending"
    },
    {
      "id": "activity-logic",
      "content": "Service: PlacesEngine (Filtered Google Places Fetching)",
      "status": "pending"
    },
    {
      "id": "activity-feed",
      "content": "Component: ActivityFeed (List/Grid of Results)",
      "status": "pending"
    },
    {
      "id": "activity-card",
      "content": "Module: ResultCard (Spot Details + TCOA Breakdown)",
      "status": "pending"
    },
    {
      "id": "ux-nuance",
      "content": "Polish: Traffic & Tolls Integration",
      "status": "pending"
    }
  ]
}


To get high-quality flight data that matches your "Constraint-First" vision, we need an API that supports Open-Ended Discovery (searching for "Anywhere" or "Inspiration").
As a Senior Architect, here is my recommendation for the "Data Stack":

1. The Flight Data Engine: Amadeus Self-Service API
Most flight APIs (like Delta or United) require you to pick a destination. Amadeus is different. It has a specific endpoint called "Flight Inspiration Search."

Why it’s perfect: You can send it a query like: "From Atlanta, within a budget of $500, show me any destination." It returns a list of cities and prices that fit that exact constraint.
The "Nuance": It provides the "true" price and is used by professional travel apps like Kayak and Skyscanner.
2. The Vibe Brain: OpenAI API (GPT-4o-mini)

Since the user selects "Beach" or "Mountain," we need a way to translate that "Vibe" into actual airport codes.
The Role of AI: Instead of us hard-coding a list of beaches, the AI acts as the Vibe Mapper.
The Logic: When the user clicks "Discover," we send a quick prompt to OpenAI: "The user wants a 'Beach' vibe in December from 'Atlanta'. Return a JSON list of the top 10 airport codes that fit this."
The Result: The AI returns ["MIA", "CUN", "PUJ", "HNL"...]. We then pass those codes to the Amadeus API to get the live prices.
3. State Management: TanStack Query (React Query)

Since we already have this in your package.json, we will use it to handle the "Searching..." state. It will:
Cache Results: If the user slides the budget back and forth, the map won't flicker—it will pull from memory.
Manage Loading: It automatically handles the isLoading state we just built into the context.
How the Data Flow will look (The Architect's Blueprint):
User Action: Clicks "Discover."

AI Step: OpenAI converts "Mountain" + "Atlanta" $\rightarrow$ ["DEN", "AVL", "SLC"].
Data Step: Amadeus fetches flights for those 3 codes from ATL for the selected dates.
Filter Step: Our app prunes any results that are higher than the Budget Slider.
Render Step: The map drops pins on Denver, Asheville, and Salt Lake City.