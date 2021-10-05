import Link from 'next/link'
import Image from 'next/image'
import moch from '../../moch/krcgCrypt.json'

export const getStaticPaths = async () => {
    const res = await fetch('https://static.krcg.org/data/vtes.json');
    const krcg = await res.json();
    // const krcg = moch

    //Get Name
    const krcgName = krcg.map(function (card, index) {
        const cardName = nameToText(card._name)
        return cardName
    })

    const paths = krcgName.map(card => {
        return {
            params: { card: card }
        }
    })
    return {
        paths,
        fallback: false
    }

}

export const getStaticProps = async (context) => {
    // const res = await fetch('https://static.krcg.org/card/' + context.card);
    // const krcg = await res.json();
    const krcg = context.params.card
    return {
        props: { card: krcg }
    }
}


function Card(params) {
    return (
        <>
            <div>
                <Link href='/library'>
                    <a> Back </a>
                </Link>
            </div>
            <div>
                <Image
                    src={'/img/card/' + params.card + '.jpg'}
                    layout="intrinsic"
                    width='358px'
                    height='500px'
                    quality='100'
                />
            </div>
        </>
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


export default Card

