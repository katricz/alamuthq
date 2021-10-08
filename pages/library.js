import { React, useState } from "react";
import Link from 'next/link'
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Container, TextField } from "@material-ui/core"
import styles from '../styles/Alamuthq.module.css'
import moch from '../moch/krcgCrypt.json'


export const getStaticProps = async () => {
    const res = await fetch('https://static.krcg.org/data/vtes.json');
    const krcg = await res.json()
    // const krcg = moch

    const libraryCards = krcg.filter((card) =>
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

    const handleChange = (e) => {
        if (e.target.value.length < 3) {
            setFilteredCards(libraryCards)
        } else {
            const searchValue = e.target.value
            const filtered = libraryCards.filter(libraryCards =>
                libraryCards._name.toLowerCase().includes(searchValue) ||
                libraryCards.card_text.toLowerCase().includes(searchValue)
            )
            setFilteredCards(filtered);
        }
    }

    return (

        <div>
            <Container>
                <h1>All Library Cards</h1>
                <TextField
                    id="standard-search"
                    label="Choose 3+ Letters"
                    type="search"
                    onChange={handleChange}

                />
                <List>
                    {filteredCards.map(libraryCard => (
                        <Link href={'/card/' + nameToText(libraryCard._name)} key={"Link" + libraryCard.id}>
                            <ListItem button key={"ListItem" + libraryCard.id} component={"a"}>
                                <ListItemAvatar>
                                    <Avatar src={'/img/card/'.concat(nameToText(libraryCard._name)).concat(".jpg")} />
                                </ListItemAvatar>
                                <ListItemText
                                    key={"ListItemText" + libraryCard.id}
                                    primary={libraryCard._name}
                                    secondary={getDisciplines(libraryCard)}
                                />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Container>
        </div>
    )

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


function getDisciplines(card) {
    if (card.disciplines) {
        return card.disciplines.map((getDiscipline) => (
            <i>{disciplineIcon(getDiscipline)}</i>
        ));
    }
}


function disciplineIcon(discipline) {
    switch (discipline) {
        //Inferior
        case "abo":
            return "w";
        case "ani":
            return "i";
        case "aus":
            return "a";
        case "cel":
            return "c";
        case "chi":
            return "k";
        case "dai":
            return "y";
        case "def":
            return "@";
        case "dem":
            return "e";
        case "dom":
            return "d";
        case "flight":
            return "^";
        case "for":
            return "f";
        case "inn":
            return "#";
        case "jus":
            return "%";
        case "mal":
            return "^";
        case "mar":
            return "&";
        case "mel":
            return "m";
        case "myt":
            return "x";
        case "nec":
            return "n";
        case "obe":
            return "b";
        case "obf":
            return "o";
        case "obt":
            return "$";
        case "pot":
            return "p";
        case "pre":
            return "r";
        case "pro":
            return "j";
        case "qui":
            return "q";
        case "red":
            return "*";
        case "san":
            return "g";
        case "ser":
            return "s";
        case "spi":
            return "z";
        case "str":
            return "<";
        case "tem":
            return "(";
        case "tha":
            return "t";
        case "thn":
            return "h";
        case "val":
            return "l";
        case "ven":
            return "^";
        case "vic":
            return "v";
        case "vin":
            return ")";
        case "vis":
            return "u";

        //superior
        case "ABO":
            return "W";
        case "ANI":
            return "I";
        case "AUS":
            return "A";
        case "CEL":
            return "C";
        case "CHI":
            return "K";
        case "DAI":
            return "Y";
        case "DEM":
            return "E";
        case "DOM":
            return "D";
        case "FOR":
            return "F";
        case "MEL":
            return "M";
        case "MYT":
            return "X";
        case "NEC":
            return "N";
        case "OBE":
            return "B";
        case "OBF":
            return "O";
        case "POT":
            return "P";
        case "PRE":
            return "R";
        case "PRO":
            return "J";
        case "QUI":
            return "Q";
        case "SAN":
            return "G";
        case "SER":
            return "S";
        case "SPI":
            return "Z";
        case "THA":
            return "T";
        case "THN":
            return "H";
        case "VAL":
            return "L";
        case "VIC":
            return "V";
        case "VIS":
            return "U";

        default:
            return "^";
    }
}

export default Library

