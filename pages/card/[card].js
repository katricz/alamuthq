import Link from 'next/link'
import getAllCards from '../api/getCards'
import { getCardName } from '../../utils/cardHelpers'
import { getAllCardImages } from '../../utils/imageHelpers'
import ImageCarousel from '../../components/ImageCarousel'


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
    const cardName = context.params.card
    const krcg = await getAllCards()
    
    // Find the full card object by name
    const cardData = krcg.find(card => getCardName(card) === cardName)
    
    return {
        props: { 
            cardName: cardName,
            cardData: cardData || null
        }
    }
}


function Card({ cardName, cardData }) {
    const images = cardData ? getAllCardImages(cardData) : [];

    return (
        <>
            <div style={{ padding: '1rem', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '1rem' }}>
                    {cardData?._name || cardData?.name || cardName}
                </h1>
                
                <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link href='/crypt' style={{ 
                        padding: '0.5rem 1rem', 
                        background: '#007bff', 
                        color: 'white', 
                        textDecoration: 'none', 
                        borderRadius: '4px' 
                    }}>
                        ← Back to Crypt
                    </Link>
                    <Link href='/library' style={{ 
                        padding: '0.5rem 1rem', 
                        background: '#007bff', 
                        color: 'white', 
                        textDecoration: 'none', 
                        borderRadius: '4px' 
                    }}>
                        ← Back to Library
                    </Link>
                </div>

                {/* Image Carousel */}
                {images.length > 0 ? (
                    <ImageCarousel images={images} cardName={cardName} />
                ) : (
                    <p>No images available for this card.</p>
                )}

                {/* Card Information */}
                {cardData && (
                    <div style={{ 
                        marginTop: '2rem', 
                        padding: '1rem', 
                        background: '#f5f5f5', 
                        borderRadius: '8px',
                        maxWidth: '600px',
                        margin: '2rem auto',
                        textAlign: 'left'
                    }}>
                        <h2>Card Details</h2>
                        {cardData.types && <p><strong>Type:</strong> {cardData.types.join(', ')}</p>}
                        {cardData.clans && <p><strong>Clan:</strong> {cardData.clans.join(', ')}</p>}
                        {cardData.capacity !== undefined && <p><strong>Capacity:</strong> {cardData.capacity}</p>}
                        {cardData.disciplines && <p><strong>Disciplines:</strong> {cardData.disciplines.join(', ')}</p>}
                        {cardData.card_text && <p><strong>Text:</strong> {cardData.card_text}</p>}
                        {cardData.artists && <p><strong>Artist:</strong> {cardData.artists.join(', ')}</p>}
                        
                        {images.length > 1 && (
                            <p><strong>Available Sets:</strong> {images.length} version(s)</p>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default Card
