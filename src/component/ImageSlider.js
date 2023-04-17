import React, { useState } from 'react';
import {Image} from "react-bootstrap";
import "./ImageSlider.scss"

function ImageSlider({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const previousImage = () => {
        const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(newIndex);
    };

    const nextImage = () => {
        const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
        setCurrentImageIndex(newIndex);
    };

    return (
        <div className="image-slider">
            <div className="slider-images">
                {images.map((image, index) => (
                    <Image key={index} className="slider-image" src={image} style={{ display: index === currentImageIndex ? 'block' : 'none' }}/>
                ))}
            </div>
            <div className="slider-controls">
                <div className="button_c" onClick={previousImage} id="prev">Previous</div>
                <div className="button_c" onClick={nextImage} id="next">Next</div>
            </div>
        </div>
    );
}

export default ImageSlider;