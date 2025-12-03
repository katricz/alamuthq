import * as React from 'react';
import { useState, useMemo } from "react";
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/CardList.module.css'

import AdvancedFilters from '../components/AdvancedFilters'
import { DisciplineIcons } from '../components/disciplines.js'
import getAllCards from './api/getCards'
import { getCardName } from '../utils/cardHelpers'
import { getCardImageUrl } from '../utils/imageHelpers'

export const getStaticProps = async () => {
    const allCards = await getAllCards()
    const cryptCards = allCards.filter((card) =>
        (card.types.includes('Vampire') || card.types.includes('Imbued'))
    )
    return {
        props: {
            cryptCards
        }
    }
}

function Crypt({ cryptCards }) {
    const [filteredCards, setFilteredCards] = useState(cryptCards)
    const [viewMode, setViewMode] = useState('list') // 'list', 'grid', 'table'
    const [sortBy, setSortBy] = useState('name') // 'name', 'capacity', 'clan', 'group'
    const [sortOrder, setSortOrder] = useState('asc')
    const [compactMode, setCompactMode] = useState(false)
    const [filters, setFilters] = useState({
        searchText: '',
        searchInName: true,
        searchInText: true,
        useRegex: false,
        disciplines: [],
        disciplinesOr: false,
        capacityOperator: '>=',
        capacityValue: '',
        clans: [],
        sects: [],
        titles: [],
        groups: [],
        traits: []
    })

    const applyFilters = (newFilters) => {
        let filtered = [...cryptCards]

        // Text search
        if (newFilters.searchText && newFilters.searchText.length >= 3) {
            const searchValue = newFilters.searchText.toLowerCase()
            filtered = filtered.filter(card => {
                const matchName = newFilters.searchInName && card._name.toLowerCase().includes(searchValue)
                const matchText = newFilters.searchInText && card.card_text.toLowerCase().includes(searchValue)
                
                if (newFilters.useRegex) {
                    try {
                        const regex = new RegExp(searchValue, 'i')
                        return (newFilters.searchInName && regex.test(card._name)) ||
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
                if (!card.disciplines) return false
                const cardDisciplines = Array.isArray(card.disciplines) 
                    ? card.disciplines 
                    : card.disciplines.split(' ')
                
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

        // Capacity filter
        if (newFilters.capacityValue) {
            const value = parseInt(newFilters.capacityValue)
            filtered = filtered.filter(card => {
                const capacity = parseInt(card.capacity)
                if (isNaN(capacity)) return false
                
                switch (newFilters.capacityOperator) {
                    case '<=': return capacity <= value
                    case '>=': return capacity >= value
                    case '=': return capacity === value
                    default: return true
                }
            })
        }

        // Clans filter
        if (newFilters.clans.length > 0) {
            filtered = filtered.filter(card => 
                card.clans && newFilters.clans.some(clan => 
                    card.clans.toLowerCase().includes(clan.toLowerCase())
                )
            )
        }

        // Sects filter
        if (newFilters.sects.length > 0) {
            filtered = filtered.filter(card => 
                card.sect && newFilters.sects.some(sect => 
                    card.sect.toLowerCase().includes(sect.toLowerCase())
                )
            )
        }

        // Titles filter
        if (newFilters.titles.length > 0) {
            filtered = filtered.filter(card => 
                card.title && newFilters.titles.some(title => 
                    card.title.toLowerCase().includes(title.toLowerCase())
                )
            )
        }

        // Groups filter
        if (newFilters.groups.length > 0) {
            filtered = filtered.filter(card => 
                card.group && newFilters.groups.includes(card.group)
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
            capacityOperator: '>=',
            capacityValue: '',
            clans: [],
            sects: [],
            titles: [],
            groups: [],
            traits: []
        }
        setFilters(resetFilters)
        setFilteredCards(cryptCards)
    }

    // Sort cards
    const sortedCards = useMemo(() => {
        const sorted = [...filteredCards].sort((a, b) => {
            let compareValue = 0
            
            switch (sortBy) {
                case 'name':
                    compareValue = a._name.localeCompare(b._name)
                    break
                case 'capacity':
                    compareValue = (parseInt(a.capacity) || 0) - (parseInt(b.capacity) || 0)
                    break
                case 'clan':
                    compareValue = (a.clans || '').localeCompare(b.clans || '')
                    break
                case 'group':
                    compareValue = (a.group || 0) - (b.group || 0)
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

    const renderDisciplines = (disciplines) => {
        if (!disciplines) return null
        return <DisciplineIcons disciplines={disciplines} />
    }

    const renderListView = () => (
        <div className={`${styles.listView} ${compactMode ? styles.compact : ''}`}>
            {sortedCards.map(card => (
                <Link 
                    key={card.id}
                    href={'/card/' + getCardName(card)}
                    className={styles.cardItem}
                >
                    <div className={styles.cardImage}>
                        <Image
                            src={getCardImageUrl(card)}
                            fill
                            alt={card._name}
                            sizes="60px"
                            unoptimized
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.cardInfo}>
                        <div className={styles.cardName}>{card._name}</div>
                        <div className={styles.cardStats}>
                            <div className={styles.stat}>
                                <span className={styles.statLabel}>Capacity</span>
                                <span className={styles.statValue}>{card.capacity || '-'}</span>
                            </div>
                            {card.clans && (
                                <div className={styles.clan}>{card.clans}</div>
                            )}
                            {card.group && (
                                <div className={styles.stat}>
                                    <span className={styles.statLabel}>Group</span>
                                    <span className={styles.statValue}>{card.group}</span>
                                </div>
                            )}
                            {renderDisciplines(card.disciplines)}
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
                    href={'/card/' + getCardName(card)}
                    className={styles.cardGridItem}
                >
                    <div className={styles.cardGridImage}>
                        <Image
                            src={getCardImageUrl(card)}
                            fill
                            alt={card._name}
                            sizes="200px"
                            unoptimized
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.cardGridInfo}>
                        <div className={styles.cardGridName}>{card._name}</div>
                        <div className={styles.cardGridStats}>
                            <span><strong>{card.capacity || '-'}</strong> Cap</span>
                            <span>G{card.group || '?'}</span>
                        </div>
                        {renderDisciplines(card.disciplines)}
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
                        <th onClick={() => handleSort('capacity')}>
                            Capacity {sortBy === 'capacity' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('clan')}>
                            Clan {sortBy === 'clan' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => handleSort('group')}>
                            Group {sortBy === 'group' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th>Disciplines</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCards.map(card => (
                        <tr 
                            key={card.id}
                            className={styles.tableRow}
                            onClick={() => window.location.href = '/card/' + getCardName(card)}
                        >
                            <td className={styles.tableCell}>
                                <div style={{ width: '40px', height: '56px', position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
                                    <Image
                                        src={getCardImageUrl(card)}
                                        fill
                                        alt={card._name}
                                        sizes="40px"
                                        unoptimized
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </td>
                            <td className={styles.tableCell}>{card._name}</td>
                            <td className={styles.tableCell}>{card.capacity || '-'}</td>
                            <td className={styles.tableCell}>{card.clans || '-'}</td>
                            <td className={styles.tableCell}>{card.group || '-'}</td>
                            <td className={styles.tableCell}>
                                {renderDisciplines(card.disciplines)}
                            </td>
                            <td className={styles.tableCell}>{card.title || '-'}</td>
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
                        Crypt Cards <span className={styles.count}>({sortedCards.length})</span>
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
                                <option value="capacity">Capacity</option>
                                <option value="clan">Clan</option>
                                <option value="group">Group</option>
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
                        type="crypt"
                    />
                </aside>
            </div>
        </div>
    )
}
export default Crypt
