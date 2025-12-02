import { nameToText } from './stringHelpers';
import { allDisciplines, cardTypeIcons } from './constants';

/**
 * Generates a unique card identifier for Crypt cards
 * @param {Object} cryptCard - The crypt card object
 * @returns {string} - Formatted card name with group and advanced marker
 */
export function getCardName(cryptCard) {
    if (cryptCard.types.includes('Vampire') || cryptCard.types.includes('Imbued')) {
        // Group ANY
        if (cryptCard.group === 'ANY') {
            return nameToText(cryptCard._name) + cryptCard.group;
        }

        // All other Crypts
        let cardName = nameToText(cryptCard._name) + 'g' + cryptCard.group;
        // Add ADV marker
        if (cryptCard.adv) {
            cardName = cardName + 'adv';
        }
        return cardName;
    } else {
        // Library Cards
        return nameToText(cryptCard._name);
    }
}

/**
 * Renders discipline icons for a card
 * @param {Array<string>} disciplines - Array of discipline codes
 * @returns {JSX.Element[]|undefined} - Array of icon elements or undefined
 */
export function getDiscipline(disciplines) {
    if (!disciplines) {
        return undefined;
    }
    return disciplines.map((eachDiscipline, index) => (
        <i key={index}>{allDisciplines.get(eachDiscipline)}</i>
    ));
}

/**
 * Renders card type icons
 * @param {Object} card - The card object
 * @returns {JSX.Element[]|undefined} - Array of type icon elements or undefined
 */
export function getTypes(card) {
    if (!card.types) {
        return undefined;
    }
    return card.types.map((type) => (
        <i key={card._name + type}>{cardTypeIcons.get(type)}</i>
    ));
}
