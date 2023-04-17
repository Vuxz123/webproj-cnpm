import React from "react";
import Popup from "../Popup";
import ImageSlider from "../ImageSlider"
import './MyProduct.scss'

function MyProduct({ product, isOpen, onClose}) {
    console.log(product);
    if(product == null) return null;
    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <div className="myproduct_main">
                <ImageSlider images={product.images} />
            </div>
        </Popup>
    );
}

export default MyProduct;