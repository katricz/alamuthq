import { React, useState } from "react";
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


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

const infDisciplines = [
    "abo", "ani", "aus", "cel", "chi",
    "dai", "dem", "dom", "for", "mal",
    "mel", "myt", "nec", "obe", "obf",
    "obt", "pot", "pre", "pro", "qui",
    "san", "ser", "spi", "str", "tem",
    "tha", "thn", "val", "vic", "vis"]
const supDisciplines = infDisciplines.map(discipline => discipline.toUpperCase())

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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

function DisciplineFilter() {
    let icon = infDisciplines
    const [whichIcon, setWhichIcon] = useState(icon)

    function changeDiscipline(toChange) {
        console.log("icon = " + icon)
        icon = icon.map((check) => {
            if (check == toChange) {
                // console.log(check + " / " + toChange + " = true ")
                return check.toUpperCase()
            } else {
                // console.log(check + " / " + toChange + " = false ")
                return check
            }
        })
        console.log("sai da funcção e toChange = " + toChange)
        console.log("icon = " + icon)
        setWhichIcon(icon);
        return icon
    }


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Choose carefully!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {/* <select id="disciplines" onChange="getData(this.value)">
                                    <option disabled="disabled" selected="selected">Disciplines</option>
                                    <option value="0">a</option>
                                </select> */}
                        {icon.getDisciplineMenu()}
                        <div className='disciplineCrypt' >
                            {console.log("entrei montando menu icon = " + icon)}
                            {icon.map((discipline) => (
                                <IconButton
                                    onClick={() => { changeDiscipline(discipline) }}
                                // onClick={changeDiscipline(discipline)}

                                >
                                    {allDisciplines.get(discipline)}
                                </IconButton>
                            ))}
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

function filterDiscipline(check) {
    switch (check) {
        case check.toUpperCase(): console.log("check U = " + check.toUpperCase()); break;
        case check.toLowerCase(): console.log("check L = " + check.toLowerCase()); break;
        default: console.log("check default = " + check)
    }
}



module.exports = {
    allDisciplines,
    getDiscipline,
}

export default DisciplineFilter