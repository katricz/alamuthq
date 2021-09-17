import React from 'react';
import { useState } from 'react';
import { FixedSizeList } from 'react-window';
import { List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Container } from '@material-ui/core';
// import krcgCrypt from '../moch/krcgCrypt.json';
import TextField from '@material-ui/core/TextField';
import Image from 'next/image'

import InfiniteScroll from 'react-infinite-scroll-component';
import ListItemSecondaryAction from '@mui/core'


export async function getStaticProps() {
    const allCards = require('../moch/krcgCryptFull.json')

    return {

        props: {
            allCards: JSON.parse(JSON.stringify(allCards)),
        },
    };
}

// const krcgCrypt = require('../moch/krcgCrypt.json')


export default function Crypt({ allCards }) {
    let cryptCards = allCards

    return (
        <div className="table-responsive">
            <Container>
                <TextField id="standard-search" label="Find the Evil One" type="search" />
                <List>
                    {cryptCards.map((cryptCard) => (
                        <ListItem
                            button
                            key={cryptCard.id}
                            component={"a"}
                        >
                            <ListItemAvatar>
                                <Avatar src={cryptCard.url} />
                            </ListItemAvatar>

                            <ListItemText
                                primary={cryptCard._name}
                                secondary={getDisciplines(cryptCard)}
                            />
                           
                        </ListItem>
                    ))
                    }
                </List>
            </Container>
        </div>
    );
}


function getDisciplines(card) {
    if (card.disciplines) {
        return (
            card.disciplines.map((getDiscipline) => (
                <i>{disciplineIcon(getDiscipline)}</i>
            ))
        )
    }
}


function disciplineIcon(discipline) {
    switch (discipline) {
        //Inferior
        case 'abo': return 'w';
        case 'ani': return 'i';
        case 'aus': return 'a';
        case 'cel': return 'c';
        case 'chi': return 'k';
        case 'dai': return 'y';
        case 'def': return '@';
        case 'dem': return 'e';
        case 'dom': return 'd';
        case 'flight': return '^';
        case 'for': return 'f';
        case 'inn': return '#';
        case 'jus': return '%';
        case 'mal': return '^';
        case 'mar': return '&';
        case 'mel': return 'm';
        case 'myt': return 'x';
        case 'nec': return 'n';
        case 'obe': return 'b';
        case 'obf': return 'o';
        case 'obt': return '$';
        case 'pot': return 'p';
        case 'pre': return 'r';
        case 'pro': return 'j';
        case 'qui': return 'q';
        case 'red': return '*';
        case 'san': return 'g';
        case 'ser': return 's';
        case 'spi': return 'z';
        case 'str': return '<';
        case 'tem': return '(';
        case 'tha': return 't';
        case 'thn': return 'h';
        case 'val': return 'l';
        case 'ven': return '^';
        case 'vic': return ')';
        case 'vin': return 'v';
        case 'vis': return 'u';

        //superior
        case 'ABO': return 'W';
        case 'ANI': return 'I';
        case 'AUS': return 'A';
        case 'CEL': return 'C';
        case 'CHI': return 'K';
        case 'DAI': return 'Y';
        case 'DEM': return 'E';
        case 'DOM': return 'D';
        case 'FOR': return 'F';
        case 'MEL': return 'M';
        case 'MYT': return 'X';
        case 'NEC': return 'N';
        case 'OBE': return 'B';
        case 'OBF': return 'O';
        case 'POT': return 'P';
        case 'PRE': return 'R';
        case 'PRO': return 'J';
        case 'QUI': return 'Q';
        case 'SAN': return 'G';
        case 'SER': return 'S';
        case 'SPI': return 'Z';
        case 'THA': return 'T';
        case 'THN': return 'H';
        case 'VAL': return 'L';
        case 'VIN': return 'V';
        case 'VIS': return 'U';

        default:
            return '^';
    };
}

function nameToText(text) {
    if (!text) {
        return undefined
    }
    text = text.toLowerCase()
    if (text.startsWith("the ")) {
        text = text.substr(4, text.length) + "the"
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
        .replace(/ü|ú/g, "u")
    return text
}

/*  estudar com MongoDB e renderizando no server

import { connectToDatabase } from "../util/mongodb";

export default function Top({ movies }) {
    return (
        <div>
            <h1>Top 1000 Movies of All Time</h1>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {movies.map((movie) => (
                    <li>
                        <h2>{movie.title}</h2>
                        <h3>{movie.metacritic}</h3>
                        <p>{movie.plot}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getStaticProps() {
    const { db } = await connectToDatabase();

    const cryptCards = await db
        .collection("movies")
        .find({})
        .sort({ metacritic: -1 })
        .limit(cryptCards.length)
        .toArray();

    return {
        props: {
            cryptCards: JSON.parse(JSON.stringify(movies)),
        },
    };
}
*/