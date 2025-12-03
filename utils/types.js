/**
 * @fileoverview JSDoc Type Definitions for VTES Card Application
 * This file provides TypeScript-like type checking through JSDoc comments
 */

/**
 * @typedef {Object} Discipline
 * @property {string} code - Three-letter discipline code (e.g., 'abo', 'ani')
 * @property {string} icon - Icon character representation
 * @property {string} name - Full discipline name
 */

/**
 * @typedef {Object} CryptCard
 * @property {number} id - Unique card identifier
 * @property {string} _name - Card name (with underscore for internal use)
 * @property {string} name - Display name
 * @property {string[]} types - Card types (e.g., ['Vampire'], ['Imbued'])
 * @property {number|string} group - Group number or 'ANY'
 * @property {number} capacity - Blood capacity
 * @property {string[]} disciplines - Array of discipline codes
 * @property {string} card_text - Card text description
 * @property {string} url - Card URL slug
 * @property {boolean} [adv] - Whether card is advanced
 * @property {string[]} [clans] - Associated clans
 */

/**
 * @typedef {Object} LibraryCard
 * @property {number} id - Unique card identifier
 * @property {string} name - Card name
 * @property {string[]} types - Card types (e.g., ['Action'], ['Master'])
 * @property {string} card_text - Card text description
 * @property {string} url - Card URL slug
 * @property {number} [blood_cost] - Blood cost if applicable
 * @property {number} [pool_cost] - Pool cost if applicable
 * @property {string[]} [disciplines] - Required disciplines
 * @property {string[]} [clans] - Clan requirements
 */

/**
 * @typedef {CryptCard | LibraryCard} Card
 */

/**
 * @typedef {Object} FilterOptions
 * @property {string} searchText - Text search filter
 * @property {string[]} disciplines - Discipline filters
 * @property {string[]} clans - Clan filters
 * @property {string[]} types - Card type filters
 * @property {number} minCapacity - Minimum capacity
 * @property {number} maxCapacity - Maximum capacity
 */

/**
 * @typedef {Object} AppState
 * @property {Card[]} allCards - All available cards
 * @property {CryptCard[]} cryptCards - Filtered crypt cards
 * @property {LibraryCard[]} libraryCards - Filtered library cards
 * @property {FilterOptions} filters - Active filters
 * @property {boolean} loading - Loading state
 */

/**
 * @typedef {Object} DeckCard
 * @property {Card} card - The card object
 * @property {number} quantity - Number of copies in deck
 */

/**
 * @typedef {Object} Deck
 * @property {string} id - Unique deck identifier
 * @property {string} name - Deck name
 * @property {string} description - Deck description
 * @property {DeckCard[]} crypt - Crypt cards in deck
 * @property {DeckCard[]} library - Library cards in deck
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} Inventory
 * @property {Map<number, number>} cardQuantities - Map of card ID to quantity owned
 */

export {};
