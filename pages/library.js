import Link from 'next/link'
import styles from '../styles/Alamuthq.module.css'
import moch from '../moch/krcgCrypt.json'


export const getStaticProps = async () => {
    const res = await fetch('https://static.krcg.org/data/vtes.json');
    const krcg = await res.json();
    // const krcg = moch

    return {
        props: { library: krcg }
    }
}

function Library({ library }) {
    return (

        <div>
            <h1>All Libray Cards</h1>
            {library.map(libraryCard => (
                <Link href={'/card/' + nameToText(libraryCard._name)} key={libraryCard.id}>
                    <a className={styles.single}>
                        <h6> {libraryCard._name}</h6>
                    </a>
                </Link>
            ))}
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


export default Library

