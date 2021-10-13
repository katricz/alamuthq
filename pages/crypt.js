import { React, useState } from "react";
import Link from 'next/link'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Container,
    TextField
} from "@material-ui/core"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Icones do awesomefont
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import icon from '../components/disciplines.js'
import styles from '../styles/Alamuthq.module.css'
import moch from '../moch/krcgCrypt.json'


export const getStaticProps = async () => {
    const res = await fetch('https://static.krcg.org/data/vtes.json');
    const krcg = await res.json()
    // const krcg = moch

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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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

    const vtesFilter = (e) => {
        console.log(e.target.value)
    }
    const disp = 'b'
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
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleOpen}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
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
                            </Typography>
                        </Box>
                    </Modal>
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




export default Crypt

