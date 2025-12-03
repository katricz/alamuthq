import * as React from 'react';
import { useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

// Icones do awesomefont
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import icon from '../components/disciplines.js'
import getAllCards from './api/getCards'
import { nameToText } from '../utils/stringHelpers'
import { getCardName } from '../utils/cardHelpers'
import { allDisciplines, infDisciplines, modalStyle } from '../utils/constants'
import { getCardImageUrl } from '../utils/imageHelpers'

export const getStaticProps = async () => {
    const allCards = await getAllCards()
    const cryptCards = allCards.filter((card) =>
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
            const filtered = cryptCards.filter(cryptCard =>
                cryptCard._name.toLowerCase().includes(searchValue) ||
                cryptCard.card_text.toLowerCase().includes(searchValue) ||
                cryptCard.url.toLowerCase().includes(searchValue)
            )
            setFilteredCards(filtered);
        }
    }

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
                        label="Choose The Evil One with 3+ Letters"
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
                            <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Choose carefully!
                                </Typography>

                                <Disciplines cryptCards={cryptCards} setFilteredCards={setFilteredCards} />
                            </Box>
                        </Modal>
                    </>

                </div>
                <List>
                    {filteredCards.map(cryptCard => (
                        <ListItem 
                            key={"ListItem" + cryptCard.id}
                            component={Link} 
                            href={'/card/' + getCardName(cryptCard)} 
                            sx={{ cursor: 'pointer' }}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <Image
                                        src={getCardImageUrl(cryptCard)}
                                        fill
                                        alt={cryptCard._name}
                                        sizes="40px"
                                        unoptimized
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                key={"ListItemText" + cryptCard.id}
                                primary={cryptCard._name}
                                secondary={icon.getDiscipline(cryptCard.disciplines)}
                            />
                        </ListItem>
                    ))}
                </List>
            </Container>
        </div>
    )

}


function Disciplines({ cryptCards, setFilteredCards }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = (discipline) => {
        if (discipline.toLowerCase()) {
            const filtered = cryptCards.filter(cryptCard =>
                cryptCard.disciplines && cryptCard.disciplines.includes(discipline)
            )
            setFilteredCards(filtered);
        }
    }
    const allIcons = infDisciplines
    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Disciplines</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...modalStyle, width: 315 }}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className='disciplineCrypt' >
                            {allIcons.map((discipline) => (
                                <IconButton
                                    key={discipline}
                                    onClick={() => handleClick(discipline)}
                                >
                                    {allDisciplines.get(discipline)}
                                </IconButton>
                            ))}
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default Crypt
