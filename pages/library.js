import Link from 'next/link'
import styles from '../styles/Alamuthq.module.css'
import moch from '../moch/krcgCrypt.json'


export const getStaticProps = async () => {
    const res = await fetch('https://static.krcg.org/data/vtes.json');
    const krcg = await res.json()
    // const krcg = moch

    // const libraryCards = krcg.map(function (card, index) {
    //     if (!(card.types.includes('Vampire') || card.types.includes('Imbued'))) {
    //         console.log(card)
    //         return card
    //     }
    // })

    const libraryCards = krcg.filter((card) =>
        !(card.types.includes('Vampire') || card.types.includes('Imbued'))
    )
    const library = Object.assign({}, libraryCards)
    // console.log(library)

    return {
        props: {
            libraryCards
        }
    }
}



function Library({ libraryCards }) {
    // console.log(libraryCards)
    return (

        <div>
            <h1>All Library Cards</h1>
            {libraryCards.map(libraryCard => (
                <Link href={'/card/' + nameToText(libraryCard._name)} key={libraryCard.id}>
                    <a className={styles.single}>
                        <h6> {libraryCard._name}</h6>
                    </a>
                </Link>
            ))}
        </div>
    )
}

function libraryFilter(allCards) {
    const allLibrary = allCards.map(function (card, index) {
        if (!(card.types.includes('Vampire') || card.types.includes('Imbued'))) {
            return card
        }
    })
    return allLibrary
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


export default Library

