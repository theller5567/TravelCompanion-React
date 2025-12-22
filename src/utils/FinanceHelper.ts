    const calculateTravelCost = (distance: number, mpg: number, fuelPrice: number) => {
        return distance / mpg * fuelPrice;
    }

    export default calculateTravelCost;