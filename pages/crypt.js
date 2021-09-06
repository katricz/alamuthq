import React from 'react';
import { useState } from 'react';
import { FixedSizeList } from 'react-window';
import { List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Container } from '@material-ui/core';
//import krcgCrypt from '../moch/krcgCrypt';
import TextField from '@material-ui/core/TextField';
import Image from 'next/image'

import InfiniteScroll from 'react-infinite-scroll-component';
import ListItemSecondaryAction from '@mui/core'

const krcgCrypt = require('../moch/krcgCrypt.json')


export default function Crypt() {
    return (
        <div className="table-responsive">
            <Container>
                <TextField id="standard-search" label="Find the Evil One" type="search" />
                <List>
                    {CryptList()}
                </List>
            </Container>
        </div>
    );
}

function CryptList() {
    return (
        <div>
            {krcgCrypt.map((cryptCard) => (
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
                        secondary={cryptCard.disciplines.map((getDiscipline) => (
                            <i>{disciplineIcon(getDiscipline)}</i>
                            ))}
                            />
                            {cryptCard.clans.map((getClan) => (
                                    <Image
                                        alt={getClan}
                                        width='20px'
                                        height='20px'
                                        src={'/icon/' + nameToText(getClan) + '.png'} />
                            ))}
                </ListItem>
            ))
            }
        </div>
    )
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
