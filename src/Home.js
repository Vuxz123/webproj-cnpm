import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card, Image, ProgressBar} from 'react-bootstrap';
import './Home.css';
import buyIcon from './buy_icon.jpg'

let i = 0;

function Home() {
    const [products, setProducts] = useState([]);
    const [catas, setCatas] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const res = await fetch('https://dummyjson.com/products?limit=' + (i * 40 + 40));
            const data = await res.json();
            setProducts(data.products);
            const res2 = await fetch('https://dummyjson.com/products/categories');
            const data2 = await res2.json();
            setCatas(data2);
        }

        fetchData();
    }, []);

    const handleCategoryClick = async (category) => {
        const res = await fetch(`https://dummyjson.com/products/category/${category}`);
        const data = await res.json();
        setProducts(data.products);
        console.log('HelloWorld')
    }

    return (
        <div>
            <div className="navbar">
                <div className="navbar-brand">
                    <t>eCommerce</t>
                </div>
            </div>
            <div className="mainbody">
                <div className="catalog_nav">
                    {catas && catas.map((res, index) => (
                        <div className="catalog_item" key={index} onClick={() => handleCategoryClick(res)}>
                            <div className="catalog_item_text">
                                {res}
                            </div>
                        </div>
                    ))}
                </div>
                <div color="gray" className="padding">
                    <Container>
                        <Col>
                            <Row>
                                <h2 className="section-title">Sản phẩm nổi bật</h2>
                                <div className="product-list">
                                    {products && products.map((res, index) => (
                                        <Card key={index}>
                                            <div className="align">
                                                <Card.Img variant="top" src={res.images[0]}/>
                                            </div>
                                            <Card.Body id="my-element">
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
                                    ))}
                                </div>
                            </Row>
                        </Col>
                    </Container>
                </div>
            </div>
            <footer>
                <p>© 2023 Công ty TNHH eCommerce. Tất cả các quyền được bảo lưu.</p>
            </footer>
        </div>
    );
}

export default Home;