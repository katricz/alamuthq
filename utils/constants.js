/**
 * All disciplines map with their corresponding icon codes
 * Includes both inferior (lowercase) and superior (uppercase) versions
 */
export const allDisciplines = new Map([
    // Inferior Disciplines
    ["abo", "w"],
    ["ani", "i"],
    ["aus", "a"],
    ["cel", "c"],
    ["chi", "k"],
    ["dai", "y"],
    ["def", "@"],
    ["dem", "e"],
    ["dom", "d"],
    ["flight", "^"],
    ["for", "f"],
    ["inn", "#"],
    ["jud", "("],
    ["jus", "%"],
    ["mal", "<"],
    ["mar", "&"],
    ["mel", "m"],
    ["myt", "x"],
    ["nec", "n"],
    ["obe", "b"],
    ["obf", "o"],
    ["obl", "$"],
    ["obt", "ø"],
    ["pot", "p"],
    ["pre", "r"],
    ["pro", "j"],
    ["qui", "q"],
    ["red", "*"],
    ["san", "g"],
    ["ser", "s"],
    ["spi", "z"],
    ["str", "+"],
    ["tem", "?"],
    ["tha", "t"],
    ["thn", "h"],
    ["val", "l"],
    ["ven", "^"],
    ["vic", "v"],
    ["vin", ")"],
    ["vis", "u"],

    // Superior Disciplines
    ["ABO", "W"],
    ["ANI", "I"],
    ["AUS", "A"],
    ["CEL", "C"],
    ["CHI", "K"],
    ["DAI", "Y"],
    ["DEM", "E"],
    ["DOM", "D"],
    ["FOR", "F"],
    ["MAL", ">"],
    ["MEL", "M"],
    ["MYT", "X"],
    ["NEC", "N"],
    ["OBE", "B"],
    ["OBF", "O"],
    ["OBL", "£"],
    ["OBT", "Ø"],
    ["POT", "P"],
    ["PRE", "R"],
    ["PRO", "J"],
    ["QUI", "Q"],
    ["SAN", "G"],
    ["SER", "S"],
    ["SPI", "Z"],
    ["STR", "="],
    ["TEM", "!"],
    ["THA", "T"],
    ["THN", "H"],
    ["VAL", "L"],
    ["VIC", "V"],
    ["VIS", "U"],
]);

/**
 * List of inferior disciplines (lowercase codes)
 */
export const infDisciplines = [
    "abo", "ani", "aus", "cel", "chi",
    "dai", "dem", "dom", "for", "mal",
    "mel", "myt", "nec", "obe", "obf",
    "obt", "pot", "pre", "pro", "qui",
    "san", "ser", "spi", "str", "tem",
    "tha", "thn", "val", "vic", "vis"
];

/**
 * List of superior disciplines (uppercase codes)
 */
export const supDisciplines = infDisciplines.map(discipline => discipline.toUpperCase());

/**
 * All card type icons
 */
export const cardTypeIcons = new Map([
    ["Action", "0"],
    ["Action Modifier", "1"],
    ["Ally", "3"],
    ["Combat", "4"],
    ["Conviction", "^"],
    ["Crypt", "^"],
    ["Equipment", "5"],
    ["Event", "["],
    ["Imbued", "^"],
    ["Library", "^"],
    ["Master", "9"],
    ["Political Action", "2"],
    ["Power", "§"],
    ["Reaction", "7"],
    ["Retainer", "8"],
    ["Vampire", "^"],
]);

/**
 * Modal style configuration for MUI modals
 */
export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
