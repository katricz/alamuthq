import * as React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SvgIcon from '@mui/material/SvgIcon';
import styles from '../styles/Alamuthq.module.css'
import getAllCards from './api/getCards'
import { nameToText } from '../utils/stringHelpers'
import { getTypes } from '../utils/cardHelpers'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';


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
            const filtered = libraryCards.filter(libraryCard =>
                libraryCard.name.toLowerCase().includes(searchValue) ||
                libraryCard.card_text.toLowerCase().includes(searchValue) ||
                libraryCard.url.toLowerCase().includes(searchValue)
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
                        <ListItem 
                            key={"ListItem" + libraryCard.id}
                            component={Link}
                            href={'/card/' + nameToText(libraryCard.name)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <Image
                                        src={'/img/card/'.concat(nameToText(libraryCard.name)).concat(".jpg")}
                                        fill
                                        alt={libraryCard.name}
                                        sizes="40px"
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                key={"ListItemText" + libraryCard.id}
                                primary={libraryCard.name}
                                secondary={getTypes(libraryCard)}
                            />
                        </ListItem>
                    ))}
                </List>
            </Container>
        </div>
    )

}

export default Library
