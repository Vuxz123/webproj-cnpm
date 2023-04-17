import React from "react";
import {Card, Image, ProgressBar} from "react-bootstrap";
import buyIcon from "../../buy_icon.jpg";
import "./MyCart.css"

class MyCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            res: props.res
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.res !== prevProps.res) {
            this.setState({res: this.props.res});
        }
    }

    render() {
        const res = this.state.res;
        return (
            <Card onClick={this.props.onClick}>
                <div className="align">
                    <Card.Img variant="top" src={res.thumbnail}/>
                </div>
                <Card.Body>
                    <Card.Title>{res.title}</Card.Title>
                    <ProgressBar now={50}/>
                    <Card.Text>
                        Giá: ${res.price}
                    </Card.Text>
                </Card.Body>
                <div className="card-buttom">
                    <Image className="card-buttom-image" src={buyIcon}/>
                </div>
            </Card>
        );
    }
}

export default MyCard;