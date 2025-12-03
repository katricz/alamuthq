import { useState, useEffect } from 'react';
import Image from 'next/image';
import { handleImageError } from '../utils/imageHelpers';
import styles from '../styles/ImageCarousel.module.css';

/**
 * ImageCarousel Component
 * Displays a carousel of card images with automatic rotation
 * @param {Array} images - Array of {url, setName, isMain} objects
 * @param {string} cardName - Card name for alt text
 */
export default function ImageCarousel({ images, cardName }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return null;
    }

    const currentImage = images[currentIndex];

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className={styles.carouselContainer}>
            {/* Main Image Display */}
            <div className={styles.imageWrapper}>
                <Image
                    src={currentImage.url}
                    width={358}
                    height={500}
                    quality={75}
                    alt={`${cardName} - ${currentImage.setName}`}
                    className={styles.cardImage}
                    onError={handleImageError}
                    unoptimized
                />
                
                {/* Set Name Badge */}
                <div className={styles.setBadge}>
                    {currentImage.setName}
                    {currentImage.isMain && ' (Main)'}
                </div>

                {/* Navigation Arrows (only show if multiple images) */}
                {images.length > 1 && (
                    <>
                        <button 
                            className={`${styles.navButton} ${styles.navButtonPrev}`}
                            onClick={goToPrevious}
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                        <button 
                            className={`${styles.navButton} ${styles.navButtonNext}`}
                            onClick={goToNext}
                            aria-label="Next image"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnail Navigation (only show if multiple images) */}
            {images.length > 1 && (
                <div className={styles.thumbnailContainer}>
                    {images.map((image, index) => (
                        <button
                            key={`${image.setName}-${index}`}
                            className={`${styles.thumbnail} ${index === currentIndex ? styles.thumbnailActive : ''}`}
                            onClick={() => goToImage(index)}
                            aria-label={`View ${image.setName}`}
                        >
                            <Image
                                src={image.url}
                                width={60}
                                height={84}
                                quality={50}
                                alt={`${cardName} - ${image.setName}`}
                                onError={handleImageError}
                                unoptimized
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
                <div className={styles.counter}>
                    {currentIndex + 1} / {images.length}
                </div>
            )}
        </div>
    );
}
