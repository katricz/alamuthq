import * as React from 'react';
import { useState } from "react";
import Link from 'next/link'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Container,
    TextField
} from "@material-ui/core"

// Icones do awesomefont
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import icon from '../components/disciplines.js'
import moch from '../moch/krcgCrypt.json'


export const getStaticProps = async () => {
    // const res = await fetch('https://static.krcg.org/data/vtes.json');
    // const krcg = await res.json()
    const krcg = moch

    const cryptCards = krcg.filter((card) =>
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

    const handleChange = (e) => {
        if (e.target.value.length < 3) {
            setFilteredCards(cryptCards)
        } else {
            const searchValue = nameToText(e.target.value)
            const filtered = cryptCards.filter(cryptCards =>
                cryptCards._name.toLowerCase().includes(searchValue) ||
                cryptCards.card_text.toLowerCase().includes(searchValue) ||
                cryptCards.url.toLowerCase().includes(searchValue) // Apenas pra filtrar ç ö etc, tenho q achar solução melhor
            )
            setFilteredCards(filtered);
        }
    }

    const allIcons = infDisciplines
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Container>
                <h1>All Crypt Cards</h1>
                <div>
                    <TextField
                        id="standard-search"
                        label="Choose 3+ Letters"
                        type="search"
                        onChange={handleChange}

                    />
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleOpen}
                            edge="start"
                        >
                            <FilterAltIcon color="action" />
                        </IconButton>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Choose carefully!
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div className='disciplineCrypt' >
                                        {allIcons.map((discipline) => (
                                            <IconButton
                                                key={discipline}
                                                onClick={() => { changeDiscipline(allIcons, discipline) }}

                                            >
                                                {allDisciplines.get(discipline)}
                                            </IconButton>
                                        ))}
                                    </div>
                                </Typography>
                                <ChildModal />
                            </Box>
                        </Modal>
                    </>

                </div>
                <List>
                    {filteredCards.map(cryptCard => (
                        <Link href={'/card/' + nameToText(cryptCard._name)} key={"Link" + cryptCard.id}>
                            <ListItem button component={"a"}>
                                <ListItemAvatar>
                                    <Avatar src={'/img/card/'.concat(nameToText(cryptCard._name)).concat(".jpg")} />
                                </ListItemAvatar>
                                <ListItemText
                                    key={"ListItemText" + cryptCard.id}
                                    primary={cryptCard._name}
                                    secondary={icon.getDiscipline(cryptCard.disciplines)}
                                />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Container>
        </div>
    )

}


function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>

            <Button onClick={handleOpen}>Open Child Modal</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Box>

            </Modal>
        </React.Fragment>
    );
}

function nameToText(text) {
    if (!text) {
        return undefined;
    }
    text = text.toLowerCase();
    if (text.startsWith("the ")) {
        text = text.substr(4, text.length) + "the";
    }
    text = text
        .replace(/™/g, "tm")
        .replace(/\s|,|\.|-|—|'|’|:|\(|\)|"|\/| |!/g, "")
        .replace(/ö|ó|ø/g, "o")
        .replace(/é|ë|è/g, "e")
        .replace(/œ/g, "oe")
        .replace(/ç/g, "c")
        .replace(/á|ã|å/g, "a")
        .replace(/í|î/g, "i")
        .replace(/ñ/g, "n")
        .replace(/ü|ú/g, "u");
    return text;
}

const style = {
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

const infDisciplines = [
    "abo", "ani", "aus", "cel", "chi",
    "dai", "dem", "dom", "for", "mal",
    "mel", "myt", "nec", "obe", "obf",
    "obt", "pot", "pre", "pro", "qui",
    "san", "ser", "spi", "str", "tem",
    "tha", "thn", "val", "vic", "vis"]

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



export default Crypt

