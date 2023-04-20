import React from 'react';
import server from '../../util/restful/Server';
import {Image} from "react-bootstrap";

class ImageUploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            image: null
        }
    }

    handleFileChange = (event) => {
        this.setState({files: event.target.files});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < this.state.files.length; i++) {
            formData.append('images', this.state.files[i]);
        }
        server.post('/image', formData)
            .then(response => {
                console.log(response.data);
                this.setState({image: response.data[0]});
            })
            .catch(error => {
                console.log(error);
            });
        this.props.onChange(this.state.image);
    }

    render() {
        return (
            <div className="iu_main">
                <form className="iu_body" onSubmit={this.handleSubmit}>
                    <input className="iu_input" type="file" multiple onChange={this.handleFileChange} />
                    <button className="iu_button" type="submit">Upload Image</button>
                </form>
                <Image className="iu_image" src={this.state.image == null ? null : "http://localhost:8080/image/" + this.state.image}/>
            </div>
        );
    }
}

export default ImageUploadForm;
