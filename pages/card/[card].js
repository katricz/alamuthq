import Link from 'next/link'
import Image from 'next/image'
import getAllCards from '../api/getCards'
import { nameToText } from '../../utils/stringHelpers'
import { getCardName } from '../../utils/cardHelpers'
import { getCardImageByName } from '../../utils/imageHelpers'


export const getStaticPaths = async () => {
    const krcg = await getAllCards()

    const krcgName = krcg.map(function (card) {
        return getCardName(card)
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
                    Back Crypt
                </Link>
            </div>
            <div>
                <Link href='/library'>
                    Back Library
                </Link>
            </div>
            <div>
                <Image
                    src={getCardImageByName(params.card)}
                    width={358}
                    height={500}
                    quality={75}
                    alt={params.card}
                    unoptimized
                />
            </div>
        </>
    )
}

export default Card
