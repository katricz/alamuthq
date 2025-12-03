import React, { useState } from 'react';
import styles from '../styles/AdvancedFilters.module.css';
import { allDisciplines } from '../utils/constants';

/**
 * Advanced Filters Component
 * Comprehensive filtering system for VTES cards (Crypt and Library)
 */
export default function AdvancedFilters({ 
    filters, 
    onFilterChange, 
    onReset,
    type = 'crypt' // 'crypt' or 'library'
}) {
    // Filters are always open in VDB style
    const showFilters = true;

    // Disciplines list
    const disciplines = [
        'abo', 'ani', 'aus', 'tha', 'cel', 'chi', 'dai', 'dem', 'dom',
        'for', 'mel', 'myt', 'nec', 'obe', 'obf', 'obl', 'obt', 'pot',
        'pre', 'pro', 'qui', 'san', 'ser', 'spi', 'tem', 'thn', 'val',
        'vic', 'vis', 'def', 'inn', 'jud', 'mar', 'red', 'vin', 'ven'
    ];

    // Clans list (simplified - expand as needed)
    const clans = [
        'Abomination', 'Ahrimane', 'Akunanse', 'Assamite', 'Banu Haqim',
        'Baali', 'Blood Brother', 'Brujah', 'Brujah antitribu', 'Caitiff',
        'Daughter of Cacophony', 'Followers of Set', 'Ministry', 'Gangrel',
        'Gangrel antitribu', 'Gargoyle', 'Giovanni', 'Hecata', 'Guruhi',
        'Harbinger of Skulls', 'Ishtarri', 'Kiasyd', 'Lasombra', 'Malkavian',
        'Malkavian antitribu', 'Nagaraja', 'Nosferatu', 'Nosferatu antitribu',
        'Osebo', 'Pander', 'Ravnos', 'Salubri', 'Salubri antitribu', 'Samedi',
        'Toreador', 'Toreador antitribu', 'Tremere', 'Tremere antitribu',
        'True Brujah', 'Tzimisce', 'Ventrue', 'Ventrue antitribu'
    ];

    // Sects
    const sects = ['Camarilla', 'Sabbat', 'Independent', 'Anarch', 'Laibon'];

    // Titles
    const titles = [
        'Primogen', 'Prince', 'Justicar', 'Inner Circle', 'Baron',
        '1 vote', '2 votes', 'Bishop', 'Archbishop', 'Priscus',
        'Cardinal', 'Regent', 'Magaji'
    ];

    // Groups
    const groups = ['1', '2', '3', '4', '5', '6', '7', 'ANY'];

    // Library types
    const libraryTypes = [
        'Action', 'Action Modifier', 'Ally', 'Combat', 'Equipment',
        'Event', 'Master', 'Political Action', 'Reaction', 'Retainer'
    ];

    // Traits
    const cryptTraits = [
        '+1 intercept', '+1 stealth', '+1 bleed', '+2 bleed',
        '+1 strength', '+2 strength', 'Dodge', 'Maneuver',
        'Additional Strike', 'Aggravated', 'Prevent', 'Press',
        'Enter combat', 'Unlock', 'Black Hand', 'Seraph',
        'Infernal', 'Red List', 'Flight', 'Hand Size',
        'Advancement', 'Banned'
    ];

    const libraryTraits = [
        '+Intercept / -Stealth', '+Stealth / -Intercept', '+Bleed',
        '+Votes / Title', '+Strength', 'Block Denial', 'Dodge',
        'Maneuver', 'Additional Strike', 'Aggravated', 'Prevent',
        'Press', 'Combat Ends', 'Multi-Type', 'Multi-Discipline',
        'Enter Combat', 'Create Vampire', 'Blood to Uncontrolled',
        'Bounce Bleed', 'Reduce Bleed', 'Wake / Unlock', 'Black Hand',
        'Seraph', 'Infernal', 'Burn Option', 'Banned'
    ];

    const handleCheckboxChange = (filterName, value) => {
        const currentValues = filters[filterName] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        onFilterChange({ ...filters, [filterName]: newValues });
    };

    const handleRangeChange = (filterName, value) => {
        onFilterChange({ ...filters, [filterName]: value });
    };

    const handleBooleanChange = (filterName, value) => {
        onFilterChange({ ...filters, [filterName]: value });
    };

    const handleTextChange = (filterName, value) => {
        onFilterChange({ ...filters, [filterName]: value });
    };

    return (
        <div className={styles.filtersContainer}>
            <div className={styles.filtersHeader}>
                <h2>Filters</h2>
            </div>
            {/* Filters Panel - Always visible */}
            <div className={styles.filtersPanel}>
                    {/* Search Options */}
                    <div className={styles.filterSection}>
                        <h3>Search</h3>
                        <input
                            type="text"
                            placeholder="Card Name / Text / RegEx"
                            value={filters.searchText || ''}
                            onChange={(e) => handleTextChange('searchText', e.target.value)}
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.searchInName || false}
                                onChange={(e) => handleBooleanChange('searchInName', e.target.checked)}
                            />
                            Only in Name
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.searchInText || false}
                                onChange={(e) => handleBooleanChange('searchInText', e.target.checked)}
                            />
                            Only in Text
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.useRegex || false}
                                onChange={(e) => handleBooleanChange('useRegex', e.target.checked)}
                            />
                            Regex
                        </label>
                    </div>

                    {/* Disciplines */}
                    <div className={styles.filterSection}>
                        <h3>Discipline</h3>
                        <div className={styles.filterHint}>Click to cycle: none → inferior → superior</div>
                        <span className={styles.disciplineGrid}>
                            {disciplines.map(disc => {
                                const lowerIcon = allDisciplines.get(disc);
                                const upperIcon = allDisciplines.get(disc.toUpperCase());
                                const current = filters.disciplines || [];
                                const hasLower = current.includes(disc);
                                const hasUpper = current.includes(disc.toUpperCase());
                                
                                let state = 'none'; // none, inferior, superior
                                if (hasUpper) state = 'superior';
                                else if (hasLower) state = 'inferior';
                                
                                const handleClick = () => {
                                    let updated = current.filter(d => d.toLowerCase() !== disc);
                                    
                                    if (state === 'none') {
                                        updated.push(disc); // Add inferior
                                    } else if (state === 'inferior') {
                                        updated.push(disc.toUpperCase()); // Add superior
                                    }
                                    // If superior, remove (back to none)
                                    
                                    onFilterChange({ ...filters, disciplines: updated });
                                };
                                
                                const iconClass = state !== 'none' ? 'disc-active' : 'disc-inactive';
                                return (
                                    <i
                                        key={disc}
                                        className={iconClass}
                                        onClick={handleClick}
                                        title={`${disc.charAt(0).toUpperCase() + disc.slice(1)} (${state})`}
                                    >
                                        {state === 'superior' ? upperIcon : lowerIcon}
                                    </i>
                                );
                            })}
                        </span>
                        <label style={{ marginTop: '0.5rem' }}>
                            <input
                                type="checkbox"
                                checked={filters.disciplinesOr || false}
                                onChange={(e) => handleBooleanChange('disciplinesOr', e.target.checked)}
                            />
                            / +OR DIS
                        </label>
                    </div>

                    {/* Capacity (Crypt only) */}
                    {type === 'crypt' && (
                        <div className={styles.filterSection}>
                            <h3>Capacity</h3>
                            <select
                                value={filters.capacityOperator || '>='}
                                onChange={(e) => handleRangeChange('capacityOperator', e.target.value)}
                            >
                                <option value="<=">&lt;=</option>
                                <option value=">=">≥</option>
                                <option value="=">=</option>
                            </select>
                            <input
                                type="number"
                                min="1"
                                max="11"
                                value={filters.capacityValue || ''}
                                placeholder="ANY"
                                onChange={(e) => handleRangeChange('capacityValue', e.target.value)}
                            />
                        </div>
                    )}

                    {/* Clan/Path */}
                    <div className={styles.filterSection}>
                        <h3>Clan / Path</h3>
                        <select
                            className={styles.multiSelect}
                            multiple
                            size="5"
                            value={filters.clans || []}
                            onChange={(e) => {
                                const selected = Array.from(e.target.selectedOptions, option => option.value);
                                onFilterChange({ ...filters, clans: selected });
                            }}
                        >
                            <option value="">ANY</option>
                            {clans.map(clan => (
                                <option key={clan} value={clan}>
                                    {clan}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sect */}
                    <div className={styles.filterSection}>
                        <h3>Sect</h3>
                        <select
                            className={styles.singleSelect}
                            value={filters.sects?.[0] || ''}
                            onChange={(e) => {
                                onFilterChange({ ...filters, sects: e.target.value ? [e.target.value] : [] });
                            }}
                        >
                            <option value="">ANY</option>
                            {sects.map(sect => (
                                <option key={sect} value={sect}>
                                    {sect}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Titles (Crypt only) */}
                    {type === 'crypt' && (
                        <div className={styles.filterSection}>
                            <h3>Title</h3>
                            <select
                                className={styles.multiSelect}
                                multiple
                                size="5"
                                value={filters.titles || []}
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                                    onFilterChange({ ...filters, titles: selected });
                                }}
                            >
                                <option value="">ANY</option>
                                {titles.map(title => (
                                    <option key={title} value={title}>
                                        {title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Group (Crypt only) */}
                    {type === 'crypt' && (
                        <div className={styles.filterSection}>
                            <h3>Group</h3>
                            <div className={styles.groupButtons}>
                                {groups.map(group => (
                                    <button
                                        key={group}
                                        className={`${styles.groupButton} ${(filters.groups || []).includes(group) ? styles.active : ''}`}
                                        onClick={() => handleCheckboxChange('groups', group)}
                                    >
                                        {group}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Library Type */}
                    {type === 'library' && (
                        <div className={styles.filterSection}>
                            <h3>Type</h3>
                            <select
                                className={styles.multiSelect}
                                multiple
                                size="5"
                                value={filters.types || []}
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                                    onFilterChange({ ...filters, types: selected });
                                }}
                            >
                                <option value="">ANY</option>
                                {libraryTypes.map(libType => (
                                    <option key={libType} value={libType}>
                                        {libType}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Traits */}
                    <div className={styles.filterSection}>
                        <h3>Traits</h3>
                        <select
                            className={styles.multiSelect}
                            multiple
                            size="6"
                            value={filters.traits || []}
                            onChange={(e) => {
                                const selected = Array.from(e.target.selectedOptions, option => option.value);
                                onFilterChange({ ...filters, traits: selected });
                            }}
                        >
                            {(type === 'crypt' ? cryptTraits : libraryTraits).map(trait => (
                                <option key={trait} value={trait}>
                                    {trait}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Reset Button */}
                    <div className={styles.filterSection}>
                        <button className={styles.resetButton} onClick={onReset}>
                            Reset All Filters
                        </button>
                    </div>
            </div>
        </div>
    );
}
