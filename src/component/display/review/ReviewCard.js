import React from "react";
import './ReviewCard.scss';
import {Image} from "react-bootstrap";

function getRatingDescription(rating) {
    if (rating < 1) {
        return "Không thích";
    } else if (rating < 2) {
        return "Tạm được";
    } else if (rating < 3) {
        return "Bình thường";
    } else if (rating < 4) {
        return "Tốt";
    } else if (rating < 4.5) {
        return "Rất tốt";
    } else {
        return "Xuất sắc";
    }
}

function ReviewCard({review}) {

    const rate = getRatingDescription(review.rating);

    return (
        <div className="review-main">
            <div className="review-title">
                <div className="text"><strong>{review.title}</strong></div>
                <div className="rate">{rate}</div>
            </div>
            <div className="review-body">
                <div className="overview">{review.overview}</div>
                <div className="des">
                    <div className="content">{review.description}</div>
                </div>
                <div className="image-box">
                    <Image src={review.image} className="image"/>
                </div>
            </div>
        </div>
    );

}

export default ReviewCard;