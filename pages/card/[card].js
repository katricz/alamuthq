import Link from 'next/link'
import getAllCards from '../api/getCards'
import { getCardName } from '../../utils/cardHelpers'
import { getAllCardImages } from '../../utils/imageHelpers'
import ImageCarousel from '../../components/ImageCarousel'


export const getStaticPaths = async () => {
    // Generate only a small subset of paths at build time
    // Other pages will be generated on-demand
    return {
        paths: [],
        fallback: 'blocking'
    }
}


export const getStaticProps = async (context) => {
    const cardName = context.params.card
    
    try {
        const krcg = await getAllCards()
        
        // Find the full card object by name
        const cardData = krcg.find(card => getCardName(card) === cardName)
        
        if (!cardData) {
            return {
                notFound: true
            }
        }
        
        return {
            props: { 
                cardName: cardName,
                cardData: cardData
            },
            revalidate: 3600 // Revalidate every hour
        }
    } catch (error) {
        console.error('Error fetching card data:', error)
        // Return notFound to avoid crashing the build
        return {
            notFound: true
        }
    }
}


function Card({ cardName, cardData }) {
    const images = cardData ? getAllCardImages(cardData) : [];

    return (
        <div style={{ minHeight: '100vh', padding: '1rem', background: '#ffffff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>
                    {cardData?._name || cardData?.name || cardName}
                </h1>
                
                <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
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

                {/* Main Content - Two Columns */}
                <div style={{ 
                    display: 'flex', 
                    gap: '2rem', 
                    alignItems: 'flex-start',
                    flexWrap: 'wrap'
                }}>
                    {/* Left Column - Image Carousel */}
                    <div style={{ 
                        flex: '0 0 400px',
                        minWidth: '300px'
                    }}>
                        {images.length > 0 ? (
                            <ImageCarousel images={images} cardName={cardName} />
                        ) : (
                            <p style={{ textAlign: 'center' }}>No images available for this card.</p>
                        )}
                    </div>

                    {/* Right Column - Card Information */}
                    {cardData && (
                        <div style={{ 
                            flex: '1',
                            minWidth: '400px',
                            padding: '1.5rem', 
                            background: '#f9f9f9', 
                            borderRadius: '12px',
                            textAlign: 'left',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            maxHeight: '85vh',
                            overflowY: 'auto'
                        }}>
                        <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                            Card Information
                        </h2>

                        {/* Basic Information */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ color: '#007bff', fontSize: '1.1rem' }}>Basic Info</h3>
                            {cardData._name && <p><strong>Name:</strong> {cardData._name}</p>}
                            {cardData.name && cardData.name !== cardData._name && <p><strong>Full Name:</strong> {cardData.name}</p>}
                            {cardData.printed_name && <p><strong>Printed Name:</strong> {cardData.printed_name}</p>}
                            {cardData.aka && <p><strong>Also Known As:</strong> {cardData.aka.join(', ')}</p>}
                            {cardData.name_variants && <p><strong>Name Variants:</strong> {cardData.name_variants.join(', ')}</p>}
                            {cardData.id && <p><strong>ID:</strong> {cardData.id}</p>}
                            {cardData.types && <p><strong>Type:</strong> {cardData.types.join(', ')}</p>}
                        </div>

                        {/* Vampire/Imbued Specific */}
                        {(cardData.types?.includes('Vampire') || cardData.types?.includes('Imbued')) && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ color: '#007bff', fontSize: '1.1rem' }}>Character Stats</h3>
                                {cardData.clans && <p><strong>Clan:</strong> {cardData.clans.join(', ')}</p>}
                                {cardData.capacity !== undefined && <p><strong>Capacity:</strong> {cardData.capacity}</p>}
                                {cardData.group && <p><strong>Group:</strong> {cardData.group}</p>}
                                {cardData.disciplines && <p><strong>Disciplines:</strong> {cardData.disciplines.join(', ').toUpperCase()}</p>}
                                {cardData.title && <p><strong>Title:</strong> {cardData.title}</p>}
                                {cardData.advancement && <p><strong>Advancement:</strong> {cardData.advancement}</p>}
                                {cardData.adv && <p><strong>Advanced:</strong> Yes</p>}
                                {cardData.has_advanced && <p><strong>Has Advanced Version:</strong> Yes</p>}
                                {cardData.is_evolution && <p><strong>Is Evolution:</strong> Yes</p>}
                            </div>
                        )}

                        {/* Card Text */}
                        {cardData.card_text && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ color: '#007bff', fontSize: '1.1rem' }}>Card Text</h3>
                                <p style={{ 
                                    background: 'white', 
                                    padding: '1rem', 
                                    borderRadius: '8px',
                                    borderLeft: '4px solid #007bff',
                                    fontStyle: 'italic'
                                }}>
                                    {cardData.card_text}
                                </p>
                            </div>
                        )}

                        {/* Sets and Availability */}
                        {cardData.sets && Object.keys(cardData.sets).length > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ color: '#007bff', fontSize: '1.1rem' }}>Sets & Availability</h3>
                                {cardData._set && <p><strong>Set Code:</strong> {cardData._set}</p>}
                                {cardData.ordered_sets && <p><strong>Ordered Sets:</strong> {cardData.ordered_sets.join(', ')}</p>}
                                <div style={{ marginTop: '0.5rem' }}>
                                    {Object.entries(cardData.sets).map(([setName, setInfo]) => (
                                        <div key={setName} style={{ 
                                            marginBottom: '0.5rem', 
                                            padding: '0.5rem',
                                            background: 'white',
                                            borderRadius: '4px'
                                        }}>
                                            <strong>{setName}:</strong>
                                            {Array.isArray(setInfo) && setInfo.map((info, idx) => (
                                                <span key={idx} style={{ marginLeft: '0.5rem', fontSize: '0.9rem', color: '#555' }}>
                                                    {info.release_date && `Released: ${info.release_date}`}
                                                    {info.rarity && ` | Rarity: ${info.rarity}`}
                                                    {info.frequency && ` | Freq: ${info.frequency}`}
                                                    {info.precon && ` | Precon: ${info.precon}`}
                                                    {info.copies && ` | Copies: ${info.copies}`}
                                                </span>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Production Info */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ color: '#007bff', fontSize: '1.1rem' }}>Production</h3>
                            {cardData.artists && <p><strong>Artist(s):</strong> {cardData.artists.join(', ')}</p>}
                            {cardData.legality && <p><strong>Legality Date:</strong> {cardData.legality}</p>}
                            {cardData.banned && <p><strong>Banned:</strong> Yes</p>}
                        </div>

                        {/* Rulings */}
                        {cardData.rulings && cardData.rulings.length > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ color: '#007bff', fontSize: '1.1rem' }}>Rulings</h3>
                                {cardData.rulings.map((ruling, idx) => (
                                    <div key={idx} style={{ 
                                        marginBottom: '1rem',
                                        padding: '1rem',
                                        background: '#fff3cd',
                                        borderRadius: '8px',
                                        borderLeft: '4px solid #ffc107'
                                    }}>
                                        <p style={{ marginBottom: '0.5rem' }}>{ruling.text}</p>
                                        {ruling.references && (
                                            <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                                {ruling.references.map((ref, refIdx) => (
                                                    <div key={refIdx}>
                                                        {ref.url ? (
                                                            <a href={ref.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                                                                {ref.text || ref.label}
                                                            </a>
                                                        ) : (
                                                            <span>{ref.text || ref.label}</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {ruling.group && <p style={{ fontSize: '0.85rem', fontStyle: 'italic', marginTop: '0.5rem' }}>Group: {ruling.group}</p>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Variants */}
                        {cardData.variants && Object.keys(cardData.variants).length > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ color: '#007bff', fontSize: '1.1rem' }}>Variants</h3>
                                <p>This card has variants:</p>
                                {Object.entries(cardData.variants).map(([variantType, variantId]) => (
                                    <p key={variantType} style={{ marginLeft: '1rem' }}>
                                        <strong>{variantType}:</strong> ID {variantId}
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* Additional Properties */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ color: '#007bff', fontSize: '1.1rem' }}>Additional Info</h3>
                            {cardData.draft && <p><strong>Draft Format:</strong> {cardData.draft}</p>}
                            {cardData.text_change && <p><strong>Has Text Change:</strong> Yes</p>}
                            {images.length > 1 && <p><strong>Available Versions:</strong> {images.length} scan(s)</p>}
                        </div>

                        {/* i18n Translations */}
                        {cardData._i18n && Object.keys(cardData._i18n).length > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ color: '#007bff', fontSize: '1.1rem' }}>Translations</h3>
                                {Object.entries(cardData._i18n).map(([lang, translation]) => (
                                    <div key={lang} style={{ 
                                        marginBottom: '0.5rem',
                                        padding: '0.5rem',
                                        background: 'white',
                                        borderRadius: '4px'
                                    }}>
                                        <strong>{lang.toUpperCase()}:</strong>
                                        {translation.name && <span style={{ marginLeft: '0.5rem' }}>{translation.name}</span>}
                                        {translation.card_text && <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginTop: '0.25rem' }}>{translation.card_text}</p>}
                                    </div>
                                ))}
                            </div>
                        )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card
