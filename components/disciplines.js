import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { allDisciplines, infDisciplines } from '../utils/constants';

/**
 * Renders discipline icons for a card
 * @param {Object} props
 * @param {string[]} props.disciplines - Array of discipline codes
 * @param {string} [props.className] - Optional CSS class
 * @returns {JSX.Element|null}
 */
function DisciplineIcons({ disciplines, className = '' }) {
    if (!disciplines || disciplines.length === 0) {
        return null;
    }

    return (
        <span className={className}>
            {disciplines.map((discipline, index) => (
                <i key={`${discipline}-${index}`}>
                    {allDisciplines.get(discipline)}
                </i>
            ))}
        </span>
    );
}

DisciplineIcons.propTypes = {
    disciplines: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
};

/**
 * Renders a menu of clickable discipline buttons
 * @param {Object} props
 * @param {(discipline: string) => void} props.onDisciplineClick - Callback when discipline is clicked
 * @param {boolean} [props.showSuperior] - Whether to show superior disciplines
 * @param {string} [props.className] - Optional CSS class
 * @returns {JSX.Element}
 */
function DisciplineMenu({ onDisciplineClick, showSuperior = false, className = 'disciplineCrypt' }) {
    const disciplines = showSuperior 
        ? infDisciplines.map(d => d.toUpperCase())
        : infDisciplines;

    return (
        <div className={className}>
            {disciplines.map((discipline) => (
                <IconButton
                    key={discipline}
                    onClick={() => onDisciplineClick(discipline)}
                    aria-label={`Filter by ${discipline}`}
                    size="small"
                >
                    <i>{allDisciplines.get(discipline)}</i>
                </IconButton>
            ))}
        </div>
    );
}

DisciplineMenu.propTypes = {
    onDisciplineClick: PropTypes.func.isRequired,
    showSuperior: PropTypes.bool,
    className: PropTypes.string,
};

/**
 * Renders both inferior and superior discipline menus
 * @param {Object} props
 * @param {(discipline: string) => void} props.onDisciplineClick - Callback when discipline is clicked
 * @returns {JSX.Element}
 */
function DisciplineMenuFull({ onDisciplineClick }) {
    return (
        <>
            <h4>Inferior Disciplines</h4>
            <DisciplineMenu onDisciplineClick={onDisciplineClick} />
            <h4>Superior Disciplines</h4>
            <DisciplineMenu onDisciplineClick={onDisciplineClick} showSuperior />
        </>
    );
}

DisciplineMenuFull.propTypes = {
    onDisciplineClick: PropTypes.func.isRequired,
};

// Legacy export for backward compatibility
const getDiscipline = (disciplines) => {
    if (!disciplines) return undefined;
    return disciplines.map((discipline, index) => (
        <i key={index}>{allDisciplines.get(discipline)}</i>
    ));
};

export {
    DisciplineIcons,
    DisciplineMenu,
    DisciplineMenuFull,
    getDiscipline,
};

export default {
    DisciplineIcons,
    DisciplineMenu,
    DisciplineMenuFull,
    getDiscipline,
    allDisciplines,
};
