import React, { useState } from "react";
import "./ReviwAddPopup.scss";
import Popup from "../../Popup";
import Rating from "react-rating";
import ImageUploadForm from "../../input/ImageUpload";
import server from "../../../util/restful/Server";

function ReviewAddPopup({ product_id, isOpen, onClose }) {
    const [title, setTitle] = useState(null);
    const [overView, setOverView] = useState(null);
    const [rating, setRating] = useState(0);
    const [des, setDes] = useState(null);
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) {
            return;
        }
        const review = {
            title: title,
            overview: overView,
            rating: rating,
            description: des,
            images: image,
            productId: product_id,
        };
        console.log(review);
        try {
            const response = await server.post("/products/reviews", review);
            console.log(response.data);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    const validateInputs = () => {
        return !(title == null || overView == null || des == null || product_id == null);

    };

    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <div className="add-main">
                <div className="add-title bg-color"> Review</div>
                <div className="input-group mt-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text bg-color title" id="basic-addon1">Title</span>
                    </div>
                    <input type="text" className="form-control" placeholder="title" aria-label="title"
                           aria-describedby="basic-addon1" onChange={(v) => setTitle(v.target.value)}/>
                </div>
                <div className="input-group mt-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text bg-color title" id="basic-addon1">Overview</span>
                    </div>
                    <input type="text" className="form-control" placeholder="overview" aria-label="overview"
                           aria-describedby="basic-addon1" onChange={(v) => setOverView(v.target.value)}/>
                </div>

                <div className="mt-3 grid-view">
                    <div>
                        <span className="input-group-text bg-color" id="basic-addon1">Rating</span>
                    </div>
                    <div className="inner">
                        <Rating initialRating={rating} start="0" stop="5" step={1} fractions={2} onChange={(v) => setRating(v)}/>
                    </div>
                </div>

                <div className="mt-3 des-grid">
                    <div className="title bg-color">
                        <span className="input-group-text bg-color" >Description</span>
                    </div>
                    <textarea className="form-control input-field" placeholder="description" aria-label="description"
                           aria-describedby="basic-addon1" onChange={(v) => setDes(v.target.value)}/>
                </div>

                <div className="mt-3 image-view">
                    <div className="title">
                        <span className="input-group-text bg-color" >Image</span>
                    </div>
                    <div className="inner">
                        <ImageUploadForm onChange={(v) => setImage(v)}/>
                    </div>
                </div>
            </div>

            <div role="button" className="submit bg-color" onClick={handleSubmit}>SUBMIT</div>
        </Popup>
    );
}

export default ReviewAddPopup;