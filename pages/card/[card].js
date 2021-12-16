import Link from 'next/link'
import Image from 'next/image'
import getAllCards from '../api/getCards'
import moch from '../../moch/krcgCrypt.json'


export const getStaticPaths = async () => {
    const krcg = await getAllCards()
    //   const krcg = moch

    //Get CardName, add g# to crypt cards
    const krcgName = krcg.map(function (card, index) {

        //Crypt Card
        if (card.types.includes('Vampire') || card.types.includes('Imbued')) {

            // Group ANY
            if (card.group === 'ANY') {
                const cardName = nameToText(card._name) + card.group
                // console.log(cardName)
                return cardName
            }

            // All other Crypts
            let cardName = nameToText(card._name) + 'g' + card.group
            // add ADV 
            if (card.adv) { cardName = cardName + 'adv' }
            return cardName

            //Library Cards
        } else {
            const cardName = nameToText(card._name)
            return cardName
        }
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
    const card = context.params.card
    return {
        props: { card: card }
    }
}


function Card(params) {
    return (
        <>
            <div>
                <Link href='/crypt'>
                    <a> Back Crypt </a>
                </Link>
            </div>
            <div>
                <Link href='/library'>
                    <a> Back Library </a>
                </Link>
            </div>
            <div>
                <Image
                    src={'/img/card/' + params.card + '.jpg'}
                    layout="intrinsic"
                    width='358px'
                    height='500px'
                    quality='75'
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
        .replace(/á|ã|å|ä/g, "a")
        .replace(/í|î/g, "i")
        .replace(/ñ/g, "n")
        .replace(/ü|ú/g, "u");
    return text;
}


export default Card

