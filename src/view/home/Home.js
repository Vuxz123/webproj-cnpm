import React, {useEffect, useState} from 'react';
import {Container, Col} from 'react-bootstrap';
import './Home.css';
import server from "../../util/restful/Server";
import MyNavbar from "../../component/nav/MyNavbar";
import MyCard from "../../component/display/cart/MyCard";
import MyProduct from "../../component/display/product/MyProduct"

let i = 0;

function Home() {
    const [isPopup, setIsPopup] = useState(false);
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [catas, setCatas] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [i, setI] = useState(0);
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const res = await server.get('/products/con?limit=' + (i * 40 + 40));
            const data = res.data;
            setProducts(data);
            const res2 = await server.get('/products/categories');
            const data2 = res2.data;
            setCatas(data2);
            setLoading(false);
        }

        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, []);

    const handleCategoryClick = async (category) => {
        setLoading(true);
        const res = await server.get(`/products/con?category=${category}`);
        const data = res.data;
        setProducts(data);
        setLoading(false);
    }

    const handleProductClick = async (p) => {
        setProduct(p);
        setIsPopup(true);
    }

    return (
        <div>

            <div>
                <MyNavbar/>
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
                <div color="gray" className={loading ? "loading" : "padding"}>
                    <MyProduct isOpen={isPopup} onClose={() => setIsPopup(false)} product={product}/>
                    <div className="loading_screen">
                        <div className="loader"></div>
                    </div>
                    <Container>
                        <Col>
                            <h2 className="section-title">Sản phẩm nổi bật</h2>
                            <div className="product-list">
                                {products && products.map((res, index) => (
                                    <MyCard key={index} res={res} onClick={() => handleProductClick(res)}/>
                                ))}
                            </div>
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