import * as React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Container, TextField, SvgIcon } from "@material-ui/core"
import styles from '../styles/Alamuthq.module.css'
import getAllCards from './api/getCards'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Checkbox from '@mui/material/Checkbox';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/styles';


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

    const [filteredCards, setFilteredCards] = React.useState(libraryCards)

    const handleChange = (e) => {
        if (e.target.value.length < 3) {
            setFilteredCards(libraryCards)
        } else {
            const searchValue = e.target.value
            const filtered = libraryCards.filter(libraryCards =>
                libraryCards.name.toLowerCase().includes(searchValue) ||
                libraryCards.card_text.toLowerCase().includes(searchValue) ||
                libraryCards.url.toLowerCase().includes(searchValue) // Apenas pra filtrar ç ö etc, tenho q achar solução melhor
            )
            setFilteredCards(filtered);
        }
    }

    return (

        <div>
            <Container>
                <h1>All Library Cards</h1>
                {/* <DisciplinesGroup /> */}
                <TextField
                    id="standard-search"
                    label="Choose 3+ Letters"
                    type="search"
                    onChange={handleChange}

                />
                <List>
                    {filteredCards.map(libraryCard => (
                        <Link href={'/card/' + nameToText(libraryCard.name)} key={"Link" + libraryCard.id}>
                            <ListItem button key={"ListItem" + libraryCard.id} component={"a"}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Image
                                            src={'/img/card/'.concat(nameToText(libraryCard.name)).concat(".jpg")}
                                            layout='fill'
                                        />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    key={"ListItemText" + libraryCard.id}
                                    primary={libraryCard.name}
                                    secondary={getTypes(libraryCard)}
                                />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Container>
        </div>
    )

}
function DisciplinesGroup() {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div>

            <Checkbox
                {...label}
                icon={<Image src='/img/svg/disc/inf/aus.svg' layout='fill' />}
            />
            <Checkbox
                {...label}
                icon={<BookmarkBorderIcon />}
                checkedIcon={<BookmarkIcon />}
            />
        </div>
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


function getTypes(card) {
    if (card.types) {
        return card.types.map((type) => (
            <i key={card._name + type}>{allIcons.get(type)}</i>
        ));
    }
}


const allIcons = new Map([
    //Inferior Discipline
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

    // Superior Discipline
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

    //Card Types
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


export default Library

