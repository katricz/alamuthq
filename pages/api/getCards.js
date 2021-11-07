import * as fs from 'fs';
import path from 'path'

// Check if .krcgCards.json is empty and get all KRCG cards
// Save it on file to use as Cache


async function fetchCardsData() {
    console.log('Fetching all KRCG Cards...')
    const res = await fetch('https://static.krcg.org/data/vtes.json');
    const krcgCards = await res.json()
    return krcgCards
}

const KRCG_CARDS_CACHE_PATH = path.resolve('.krcgCards.json')

export default async function getAllCards() {
    let cachedData

    try {
        cachedData = JSON.parse(
            fs.readFileSync(KRCG_CARDS_CACHE_PATH, 'utf8')
        )
    } catch (error) {
        console.log('krcgCards cache not initialized')
    }

    if (!cachedData) {
        const data = await fetchCardsData()

        try {
            fs.writeFileSync(
                path.join(KRCG_CARDS_CACHE_PATH),
                JSON.stringify(data),
                'utf8'
            )
            console.log('Wrote to KRCG CARDS cache')
        } catch (error) {
            console.log('ERROR WRITING KRCG CARDS CACHE TO FILE')
            console.log(error)
        }
        cachedData = data
    }
    return cachedData
}
