import * as React from 'react';
import { useState, useMemo } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/CardList.module.css'

import AdvancedFilters from '../components/AdvancedFilters'
import { DisciplineIcons } from '../components/disciplines.js'
import getAllCards from './api/getCards'
import { nameToText } from '../utils/stringHelpers'
import { getTypes } from '../utils/cardHelpers'
import { getCardImageUrl } from '../utils/imageHelpers'


export const getStaticProps = async () => {
    const allCards = await getAllCards()
    const libraryCards = allCards.filter((card) =>
        !(card.types.includes('Vampire') || card.types.includes('Imbued'))
    )
    return {
        props: {
            libraryCards
        }
    }
}

function Library({ libraryCards }) {
    const [filteredCards, setFilteredCards] = useState(libraryCards)
    const [viewMode, setViewMode] = useState('list')
    const [sortBy, setSortBy] = useState('name')
    const [sortOrder, setSortOrder] = useState('asc')
    const [compactMode, setCompactMode] = useState(false)
    const [filters, setFilters] = useState({
        searchText: '',
        searchInName: true,
        searchInText: true,
        useRegex: false,
        disciplines: [],
        disciplinesOr: false,
        types: [],
        traits: []
    })

    const applyFilters = (newFilters) => {
        let filtered = [...libraryCards]

        // Text search
        if (newFilters.searchText && newFilters.searchText.length >= 3) {
            const searchValue = newFilters.searchText.toLowerCase()
            filtered = filtered.filter(card => {
                const matchName = newFilters.searchInName && card.name.toLowerCase().includes(searchValue)
                const matchText = newFilters.searchInText && card.card_text.toLowerCase().includes(searchValue)
                
                if (newFilters.useRegex) {
                    try {
                        const regex = new RegExp(searchValue, 'i')
                        return (newFilters.searchInName && regex.test(card.name)) ||
                               (newFilters.searchInText && regex.test(card.card_text))
                    } catch (e) {
                        return matchName || matchText
                    }
                }
                return matchName || matchText
            })
        }

        // Disciplines filter
        if (newFilters.disciplines.length > 0) {
            filtered = filtered.filter(card => {
                if (!card.discipline) return false
                const cardDisciplines = Array.isArray(card.discipline) 
                    ? card.discipline 
                    : card.discipline.split(' ')
                
                if (newFilters.disciplinesOr) {
                    // OR: card must have at least one of the selected disciplines
                    return newFilters.disciplines.some(disc => {
                        // If uppercase (superior), match exactly uppercase
                        if (disc === disc.toUpperCase()) {
                            return cardDisciplines.includes(disc)
                        }
                        // If lowercase (inferior), match lowercase OR uppercase
                        return cardDisciplines.some(cd => cd.toLowerCase() === disc.toLowerCase())
                    })
                } else {
                    // AND: card must have all selected disciplines
                    return newFilters.disciplines.every(disc => {
                        // If uppercase (superior), match exactly uppercase
                        if (disc === disc.toUpperCase()) {
                            return cardDisciplines.includes(disc)
                        }
                        // If lowercase (inferior), match lowercase OR uppercase
                        return cardDisciplines.some(cd => cd.toLowerCase() === disc.toLowerCase())
                    })
                }
            })
        }

        // Types filter
        if (newFilters.types.length > 0) {
            filtered = filtered.filter(card => 
                card.types && newFilters.types.some(type => 
                    card.types.includes(type)
                )
            )
        }

        // Traits filter
        if (newFilters.traits.length > 0) {
            filtered = filtered.filter(card => 
                newFilters.traits.some(trait => {
                    const searchTrait = trait.toLowerCase()
                    return card.card_text.toLowerCase().includes(searchTrait)
                })
            )
        }

        setFilteredCards(filtered)
    }

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
        applyFilters(newFilters)
    }

    const handleReset = () => {
        const resetFilters = {
            searchText: '',
            searchInName: true,
            searchInText: true,
            useRegex: false,
            disciplines: [],
            disciplinesOr: false,
            types: [],
            traits: []
        }
        setFilters(resetFilters)
        setFilteredCards(libraryCards)
    }

    // Sort cards
    const sortedCards = useMemo(() => {
        const sorted = [...filteredCards].sort((a, b) => {
            let compareValue = 0
            
            switch (sortBy) {
                case 'name':
                    compareValue = a.name.localeCompare(b.name)
                    break
                case 'type':
                    const typeA = a.types ? a.types[0] : ''
                    const typeB = b.types ? b.types[0] : ''
                    compareValue = typeA.localeCompare(typeB)
                    break
                case 'cost':
                    const costA = parseInt(a.blood_cost || a.pool_cost || 0)
                    const costB = parseInt(b.blood_cost || b.pool_cost || 0)
                    compareValue = costA - costB
                    break
                default:
                    compareValue = 0
            }
            
            return sortOrder === 'asc' ? compareValue : -compareValue
        })
        return sorted
    }, [filteredCards, sortBy, sortOrder])

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('asc')
        }
    }

    const renderDisciplines = (discipline) => {
        if (!discipline) return null
        return <DisciplineIcons disciplines={discipline} />
    }

    const getCost = (card) => {
        if (card.blood_cost) return `${card.blood_cost} Blood`
        if (card.pool_cost) return `${card.pool_cost} Pool`
        return '-'
    }

    const renderListView = () => (
        <div className={`${styles.listView} ${compactMode ? styles.compact : ''}`}>
            {sortedCards.map(card => (
                <Link 
                    key={card.id}
                    href={'/card/' + nameToText(card.name)}
                    className={styles.cardItem}
                >
                    <div className={styles.cardImage}>
                        <Image
                            src={getCardImageUrl(card)}
                            fill
                            alt={card.name}
                            sizes="60px"
                            unoptimized
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.cardInfo}>
                        <div className={styles.cardName}>{card.name}</div>
                        <div className={styles.cardStats}>
                            {card.types && (
                                <div className={styles.clan}>{getTypes(card)}</div>
                            )}
                            <div className={styles.stat}>
                                <span className={styles.statLabel}>Cost</span>
                                <span className={styles.statValue}>{getCost(card)}</span>
                            </div>
                            {renderDisciplines(card.discipline)}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )

    const renderGridView = () => (
        <div className={styles.gridView}>
            {sortedCards.map(card => (
                <Link 
                    key={card.id}
                    href={'/card/' + nameToText(card.name)}
                    className={styles.cardGridItem}
                >
                    <div className={styles.cardGridImage}>
                        <Image
                            src={getCardImageUrl(card)}
                            fill
                            alt={card.name}
                            sizes="200px"
                            unoptimized
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.cardGridInfo}>
                        <div className={styles.cardGridName}>{card.name}</div>
                        <div className={styles.cardGridStats}>
                            <span>{getTypes(card)}</span>
                            <span>{getCost(card)}</span>
                        </div>
                        {renderDisciplines(card.discipline)}
                    </div>
                </Link>
            ))}
        </div>
    )

    const renderTableView = () => (
        <div className={styles.tableView}>
            <table className={styles.table}>
                <thead className={styles.tableHeader}>
                    <tr>
                        <th style={{ width: '60px' }}>Image</th>
                        <th onClick={() => handleSort('name')}>
                            Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('type')}>
                            Type {sortBy === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('cost')}>
                            Cost {sortBy === 'cost' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th>Disciplines</th>
                        <th>Clan</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCards.map(card => (
                        <tr 
                            key={card.id}
                            className={styles.tableRow}
                            onClick={() => window.location.href = '/card/' + nameToText(card.name)}
                        >
                            <td className={styles.tableCell}>
                                <div style={{ width: '40px', height: '56px', position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
                                    <Image
                                        src={getCardImageUrl(card)}
                                        fill
                                        alt={card.name}
                                        sizes="40px"
                                        unoptimized
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </td>
                            <td className={styles.tableCell}>{card.name}</td>
                            <td className={styles.tableCell}>{getTypes(card)}</td>
                            <td className={styles.tableCell}>{getCost(card)}</td>
                            <td className={styles.tableCell}>
                                {renderDisciplines(card.discipline)}
                            </td>
                            <td className={styles.tableCell}>{card.clan || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        Library Cards <span className={styles.count}>({sortedCards.length})</span>
                    </h1>
                    
                    <div className={styles.controls}>
                        <div className={styles.viewToggle}>
                            <button 
                                className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
                                onClick={() => setViewMode('list')}
                                title="List View"
                            >
                                ☰ List
                            </button>
                            <button 
                                className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                                onClick={() => setViewMode('grid')}
                                title="Grid View"
                            >
                                ⊞ Grid
                            </button>
                            <button 
                                className={`${styles.viewButton} ${viewMode === 'table' ? styles.active : ''}`}
                                onClick={() => setViewMode('table')}
                                title="Table View"
                            >
                                ≡ Table
                            </button>
                        </div>

                        <div className={styles.sortControl}>
                            <label>Sort:</label>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="name">Name</option>
                                <option value="type">Type</option>
                                <option value="cost">Cost</option>
                            </select>
                        </div>

                        <div className={styles.compactToggle}>
                            <input 
                                type="checkbox" 
                                id="compact"
                                checked={compactMode}
                                onChange={(e) => setCompactMode(e.target.checked)}
                            />
                            <label htmlFor="compact">Compact</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.pageLayout}>
                <div className={styles.mainContent}>
                    {sortedCards.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>🔍</div>
                            <h2>No cards found</h2>
                            <p>Try adjusting your filters or search terms</p>
                        </div>
                    ) : (
                        <>
                            {viewMode === 'list' && renderListView()}
                            {viewMode === 'grid' && renderGridView()}
                            {viewMode === 'table' && renderTableView()}
                        </>
                    )}
                </div>

                <aside className={styles.sidebar}>
                    <AdvancedFilters 
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onReset={handleReset}
                        type="library"
                    />
                </aside>
            </div>
        </div>
    )
}

export default Library
