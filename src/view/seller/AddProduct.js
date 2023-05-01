import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
    Textarea,
} from '@chakra-ui/react';
import MyNavbar from "../../component/nav/MyNavbar";
import ImageUploadForm from "../../component/input/ImageUpload";
import server from "../../util/restful/Server";
import {useAuth0} from "@auth0/auth0-react";

const cata = [
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
    'automotive',
    'motorcycle',
    'lighting'
];

function AddProduct() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [rating, setRating] = useState(0);
    const [stock, setStock] = useState(0);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState(0);

    const {user} = useAuth0();

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('discountPercentage', discountPercentage);
        formData.append('rating', rating);
        formData.append('stock', stock);
        formData.append('brand', brand);
        formData.append('category', category);
        formData.append('thumbnail', thumbnail);
        for (const image of images) {
            formData.append('images', image);
        }
        formData.append('price', price);

        async function run() {
            const res = await server.post("/products", formData);
            console.log(res);
            const res2 = await server.get("/seller/" + user.sub);
            console.log(res2);
            res2.data.products.push(res.data);
            const res3 = await server.put("/seller/update/" + user.sub, res2.data);
            console.log(res3);
        }

        run();
    }

    return (
        <div>
            <div>
                <MyNavbar/>
            </div>
            <Box maxW="sm" mx="auto" mt={8} p={6} borderWidth={1} borderRadius={8} boxShadow="lg">
                <Text fontSize="2xl" mb={4}>Add Product</Text>
                <form onSubmit={handleSubmit}>
                    <FormControl mb={4}>
                        <FormLabel>Title</FormLabel>
                        <Input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea value={description} onChange={(event) => setDescription(event.target.value)}/>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Discount Percentage</FormLabel>
                        <Input type="number" value={discountPercentage}
                               onChange={(event) => setDiscountPercentage(event.target.value)}/>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Rating</FormLabel>
                        <Input type="number" value={rating} onChange={(event) => setRating(event.target.value)}/>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Stock</FormLabel>
                        <Input type="number" value={stock} onChange={(event) => setStock(event.target.value)}/>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Brand</FormLabel>
                        <Input type="text" value={brand} onChange={(event) => setBrand(event.target.value)}/>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Category</FormLabel>
                        <Select value={category} onChange={(event) => setCategory(event.target.value)}>
                            {cata.map((s) => {
                                return (
                                    <option value={s}>{s}</option>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Thumbnail</FormLabel>
                        <ImageUploadForm onChange={(v) => {
                            setThumbnail(v);
                        }}/>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Images</FormLabel>
                        <ImageUploadForm onChange={(v) => {
                            const a = images;
                            a.push(v);
                            setImages(a);
                        }}/>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Price</FormLabel>
                        <Input type="number" value={price} onChange={(event) => setPrice(event.target.value)}/>
                    </FormControl>
                    <Button type="submit" colorScheme="blue">Add Product</Button>
                </form>
            </Box>
        </div>
    );
}

export default AddProduct;
