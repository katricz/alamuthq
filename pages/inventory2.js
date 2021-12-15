import React from "react";
import Link from 'next/link'
import Image from 'next/image'
import { useLocalObservable, useObserver } from "mobx-react";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Container, TextField } from "@material-ui/core"
import getAllCards from './api/getCards'

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

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
    const store = useLocalObservable(() => ({
        cards: ["abc"],
        addCard: card => {
            store.cards.push(card);
        },
        get cardsCount() {
            return store.cards.length;
        }
    }));

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

const CardsHeader = () => {
    const store = React.useContext(StoreContext);
    return useObserver(() => <h1>{store.cardsCount} Cards!</h1>);
};

const CardsList = () => {
    const store = React.useContext(StoreContext);

    return useObserver(() => (
        < ul >
            {
                store.cards.map(card => (
                    <li key={card}>{card}</li>
                ))
            }
        </ul >
    ));
};

const CardsForm = () => {
    const store = React.useContext(StoreContext);
    const [card, setCard] = React.useState("");

    return (
        <form
            onSubmit={e => {
                store.addCard(card);
                setCard("");
                e.preventDefault();
            }}
        >
            <input
                type="text"
                value={card}
                onChange={e => {
                    setCard(e.target.value);
                }}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default function Inventory2({ libraryCards }) {

    const store = React.useContext(StoreContext);

    const handleChange = (e) => {
        return null
    }

    return (
        < div >
            {console.log(store)}
            <Container>
                <h1>All Library Cards</h1>
                <StoreProvider>
                    <div>
                        <CardsHeader />
                        <CardsList />
                        <CardsForm />
                    </div>
                </StoreProvider>
                <TextField
                    id="standard-search"
                    label="Choose 3+ Letters"
                    type="search"
                    onChange={handleChange}

                />
                <List>
                    {libraryCards.map(libraryCard => (
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
        </div >
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
