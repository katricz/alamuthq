import React, { createContext, useContext, useState, useEffect } from 'react';
import getAllCards from '../pages/api/getCards';

/**
 * @typedef {import('./types').Card} Card
 * @typedef {import('./types').CryptCard} CryptCard
 * @typedef {import('./types').LibraryCard} LibraryCard
 * @typedef {import('./types').FilterOptions} FilterOptions
 */

/**
 * @typedef {Object} CardsContextValue
 * @property {Card[]} allCards - All available cards
 * @property {CryptCard[]} cryptCards - All crypt cards
 * @property {LibraryCard[]} libraryCards - All library cards
 * @property {Card[]} filteredCards - Currently filtered cards
 * @property {FilterOptions} filters - Active filters
 * @property {boolean} loading - Loading state
 * @property {Error|null} error - Error state
 * @property {(filters: Partial<FilterOptions>) => void} setFilters - Update filters
 * @property {(searchText: string) => void} searchCards - Search cards by text
 * @property {() => void} clearFilters - Clear all filters
 */

const CardsContext = createContext(/** @type {CardsContextValue|null} */ (null));

/**
 * Provider component for cards data and filtering
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function CardsProvider({ children }) {
    const [allCards, setAllCards] = useState([]);
    const [cryptCards, setCryptCards] = useState([]);
    const [libraryCards, setLibraryCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFiltersState] = useState({
        searchText: '',
        disciplines: [],
        clans: [],
        types: [],
        minCapacity: 0,
        maxCapacity: 11,
    });

    // Load cards on mount
    useEffect(() => {
        async function loadCards() {
            try {
                setLoading(true);
                const cards = await getAllCards();
                setAllCards(cards);

                const crypt = cards.filter((card) =>
                    card.types.includes('Vampire') || card.types.includes('Imbued')
                );
                const library = cards.filter((card) =>
                    !(card.types.includes('Vampire') || card.types.includes('Imbued'))
                );

                setCryptCards(crypt);
                setLibraryCards(library);
                setFilteredCards(cards);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadCards();
    }, []);

    // Apply filters
    useEffect(() => {
        let filtered = [...allCards];

        if (filters.searchText && filters.searchText.length >= 3) {
            const searchLower = filters.searchText.toLowerCase();
            filtered = filtered.filter((card) =>
                card._name?.toLowerCase().includes(searchLower) ||
                card.name?.toLowerCase().includes(searchLower) ||
                card.card_text?.toLowerCase().includes(searchLower)
            );
        }

        if (filters.disciplines.length > 0) {
            filtered = filtered.filter((card) =>
                card.disciplines?.some((disc) => filters.disciplines.includes(disc))
            );
        }

        if (filters.clans.length > 0) {
            filtered = filtered.filter((card) =>
                card.clans?.some((clan) => filters.clans.includes(clan))
            );
        }

        if (filters.types.length > 0) {
            filtered = filtered.filter((card) =>
                card.types?.some((type) => filters.types.includes(type))
            );
        }

        setFilteredCards(filtered);
    }, [filters, allCards]);

    /**
     * Update filters
     * @param {Partial<FilterOptions>} newFilters
     */
    const setFilters = (newFilters) => {
        setFiltersState((prev) => ({ ...prev, ...newFilters }));
    };

    /**
     * Search cards by text
     * @param {string} searchText
     */
    const searchCards = (searchText) => {
        setFilters({ searchText });
    };

    /**
     * Clear all filters
     */
    const clearFilters = () => {
        setFiltersState({
            searchText: '',
            disciplines: [],
            clans: [],
            types: [],
            minCapacity: 0,
            maxCapacity: 11,
        });
    };

    const value = {
        allCards,
        cryptCards,
        libraryCards,
        filteredCards,
        filters,
        loading,
        error,
        setFilters,
        searchCards,
        clearFilters,
    };

    return (
        <CardsContext.Provider value={value}>
            {children}
        </CardsContext.Provider>
    );
}

/**
 * Hook to use cards context
 * @returns {CardsContextValue}
 * @throws {Error} If used outside CardsProvider
 */
export function useCards() {
    const context = useContext(CardsContext);
    if (!context) {
        throw new Error('useCards must be used within a CardsProvider');
    }
    return context;
}

export default CardsContext;
