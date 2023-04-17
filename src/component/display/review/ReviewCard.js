import React from "react";
import './ReviewCard.scss';

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
        <div className="review-body">
            <div className="rate">rate</div>
            <div>
                {review.images.map((image, index) => {

                })}
            </div>
        </div>
    );

}

export default ReviewCard;