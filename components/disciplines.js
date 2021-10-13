import IconButton from '@material-ui/core/IconButton';


const allDisciplines = new Map([

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
    ["jus", "%"],
    ["mal", "<"],
    ["mar", "&"],
    ["mel", "m"],
    ["myt", "x"],
    ["nec", "n"],
    ["obe", "b"],
    ["obf", "o"],
    ["obt", "$"],
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
    ["OBT", "£"],
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

function getDiscipline(disciplines) {
    if (!disciplines) {
        return undefined;
    }
    else {
        return (
            disciplines.map((eachDiscipline, index) => (
                <i key={index}>{allDisciplines.get(eachDiscipline)}</i>

            ))
        )
    }
}

function getDisciplineMenu() {
    const infDisciplines = [
        "abo", "ani", "aus", "cel", "chi",
        "dai", "dem", "dom", "for", "mal",
        "mel", "myt", "nec", "obe", "obf",
        "obt", "pot", "pre", "pro", "qui",
        "san", "ser", "spi", "str", "tem",
        "tha", "thn", "val", "vic", "vis"]
    const supDisciplines = infDisciplines.map(discipline => discipline.toUpperCase())

    return (
        <>
            <div className='disciplineCrypt'>
                {infDisciplines.map((discipline) => (
                    <IconButton>{allDisciplines.get(discipline)}</IconButton>
                ))}
            </div>
        </>
    )
}


function getDisciplineMenu1() {
    const allDisciplines = "abcdefghijklmnopqrstuvwxyz".split("");

    return (
        <div className='disciplineCrypt'>
            {allDisciplines.map((discipline) => (
                <IconButton>{discipline}</IconButton>
            ))}
        </div>
    )
}


module.exports = {
    allDisciplines,
    getDiscipline,
    getDisciplineMenu,
}