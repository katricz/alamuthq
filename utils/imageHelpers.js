/**
 * KRCG Image utilities
 * Functions to get card images from KRCG static server
 */

/**
 * Base URL for KRCG static images
 */
const KRCG_IMAGE_BASE = 'https://static.krcg.org/card';

/**
 * Gets the image URL for a card from KRCG
 * @param {Object} card - Card object from KRCG API
 * @returns {string} Full URL to card image
 */
export function getCardImageUrl(card) {
    if (!card || !card.url) {
        return null;
    }
    
    // KRCG API returns the full URL in the 'url' property
    return card.url;
}

/**
 * Gets card image URL by card name (from params)
 * Searches for card in KRCG data and returns its URL
 * @param {string} cardName - Card name or URL slug (from URL params)
 * @returns {string} Full URL to card image (this function should ideally receive the full card object)
 */
export function getCardImageByName(cardName) {
    if (!cardName) {
        return null;
    }
    
    // This is a fallback - ideally the full card object should be passed
    // For now, construct a basic URL (may not always work)
    return `${KRCG_IMAGE_BASE}/${cardName}.jpg`;
}

/**
 * Gets all available images for a card (main + scans from different sets)
 * @param {Object} card - Card object from KRCG API
 * @returns {Array} Array of objects with {url, setName}
 */
export function getAllCardImages(card) {
    if (!card) {
        return [];
    }

    const images = [];
    
    // Add main image
    if (card.url) {
        images.push({
            url: card.url,
            setName: 'Default',
            isMain: true
        });
    }
    
    // Add scans from different sets
    if (card.scans && typeof card.scans === 'object') {
        Object.entries(card.scans).forEach(([setName, url]) => {
            images.push({
                url: url,
                setName: setName,
                isMain: false
            });
        });
    }
    
    return images;
}

/**
 * Handles image error by hiding the image
 * @param {Event} event - Image error event
 */
export function handleImageError(event) {
    event.target.style.display = 'none';
    event.target.onerror = null; // Prevent infinite loop
    console.error('Failed to load image:', event.target.src);
}
