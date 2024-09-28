export const calculatePriceWithDiscount = (price) => {

    const discounts = [5];

    // Select a random discount from the array
    const randomDiscount = discounts[Math.floor(Math.random() * discounts.length)];

    // Calculate the original price before the discount
    const originalPrice = price / (1 - randomDiscount / 100);

    // Return the original price, discounted price, and the discount percentage
    return {
        originalPrice: originalPrice.toFixed(2),
        discountedPrice: price.toFixed(2),
        discountPercent: randomDiscount,
    };
};
