    const calculateTravelCost = (distance: number, mpg: number, fuelPrice: number) => {
        return distance / mpg * fuelPrice;
    }

    const formatCurrency = (amount: number, currency: string = 'USD', locale: string = 'en-US') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(amount);
    }

    export { calculateTravelCost, formatCurrency };