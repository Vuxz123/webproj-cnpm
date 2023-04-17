import React, {useEffect, useState} from "react";
import Popup from "../../Popup";
import ImageSlider from "../../ImageSlider"
import './MyProduct.scss'
import server from "../../../util/restful/Server";
import ReviewCard from "../review/ReviewCard"
import ReviewAddPopup from "../review/ReviewAddPopup";

function MyProduct({ product, isOpen, onClose}) {
    const [reviews, setReviews] = useState(null);
    const [isReview, setIsReview] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const res = await server.get('/products/reviews/' + product.id);
            const data = res.data;
            setReviews(data);
        }

        fetchData();
    })

    const reviewGen = () => {
        if(reviews == null){
            return null;
        }
        return (
            <div className="flex-column">
                {reviews.map((review, index) => {
                    return ( <ReviewCard review={review}/> );
                })}
            </div>
        );
    };

    if(product == null) return null;
    const recommended = (product.rating > 4);
    const discount = (product.discountPercentage !== 0);
    const real_price = (parseFloat(product.price) - parseFloat(product.price) * parseFloat(product.discountPercentage)/100).toFixed(2);
    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <div className="myproduct_main">
                <ImageSlider images={product.images} />
                <div className="padding">
                    <div className="myproduct_body">
                        <div className="myproduct_title addition">
                            <div className="title">{product.title}</div>
                            <div className={recommended ? "recommend" : "hidden"}>RECOMMENDED</div>
                        </div>
                        <div className="b addition">
                            <div className="price">Price: </div>
                            <div className={discount ? "ori" : "hidden"}>{product.price}$</div>
                            <div className="price flo"> {real_price}$</div>
                            <div className={discount ? "discount" : "hidden"}>-{product.discountPercentage}%</div>
                        </div>
                        <div className="b">
                            <div className="brand">Brand: {product.brand}</div>
                        </div>
                        <div className="b">
                            <div className="description">Discription: {product.description}</div>
                        </div>
                        <div className="b review-grid">
                            <div className="review-box">
                                {reviewGen()}
                            </div>
                            <div className="review-add">
                                <ReviewAddPopup product_id={product.id} isOpen={isReview} onClose={() => setIsReview(false)}/>
                                <button className="but" onClick={() => setIsReview(true)}>Add Review</button>
                                <text className="left"> {reviews.length} Reviews </text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
}

export default MyProduct;