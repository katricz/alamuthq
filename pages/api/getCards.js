// In-memory cache for cards data
let cardsCache = null;

/**
 * Fetches card data from KRCG API
 * @returns {Promise<Array>} Array of card objects
 */
async function fetchCardsData() {
    const res = await fetch('https://static.krcg.org/data/vtes.json');
    const krcgCards = await res.json();
    return krcgCards;
}

/**
 * Gets all VTES cards with in-memory caching
 * @returns {Promise<Array>} Array of all cards
 */
export default async function getAllCards() {
    // Return cached data if available
    if (cardsCache) {
        return cardsCache;
    }

    // Fetch fresh data
    const data = await fetchCardsData();
    
    // Store in memory cache
    cardsCache = data;
    
    return cardsCache;
}
