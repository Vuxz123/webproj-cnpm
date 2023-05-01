import { Box, Button, Flex, Heading, IconButton, Spacer, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import MyNavbar from "../../component/nav/MyNavbar";
import {useEffect, useState} from "react";
import server from "../../util/restful/Server";
import {useAuth0} from "@auth0/auth0-react";

const CartView = () => {
    const {user, isLoading} = useAuth0();

    //{ cartItems, removeFromCart }
    const [cartItems, setCartItems] = useState(null);
    const [cart, setCart] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if(isLoading) return;
            const {sub} = user;
            const res = await server.get('/carts/user/' + sub);
            const data = res.data;
            console.log(res);
            setCart(data);
            setCartItems(data.products);
        }

        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, [user, isLoading]);

    const removeFromCart = (id) => {
        async function fetchData() {
            if(isLoading) return;
            const {sub} = user;
            const res = await server.get('/carts/delete/' + sub + '/' + id);
            const data = res.data;
            console.log(res);
            setCart(data);
            setCartItems(data.products);
        }

        fetchData();
    }

    const toast = useToast();

    const handleRemoveFromCart = (id) => {
        toast({
            title: 'Item removed',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
        removeFromCart(id);
    };

    if(cartItems == null)
        return (
            <div></div>
        );

    return (
        <div>
            <div>
                <MyNavbar/>
            </div>
            <Box maxW="800px" mx="auto" mt="8">
                <Heading mb="4">Cart</Heading>
                {(cartItems.length === 0) ? (
                    <Text>No items in cart</Text>
                ) : (
                    <Box>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Product</Th>
                                    <Th>Quantity</Th>
                                    <Th>Price</Th>
                                    <Th>Discount Percentage</Th>
                                    <Th>Discounted Price</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {cartItems.map((item) => (
                                    <Tr key={item.id}>
                                        <Td>
                                            <Text fontWeight="bold">{item.title}</Text>
                                        </Td>
                                        <Td>{item.quantity}</Td>
                                        <Td>{item.total}</Td>
                                        <Td>{item.discountPercentage}</Td>
                                        <Td>{item.discountedPrice}</Td>
                                        <Td>
                                            <IconButton
                                                icon={<FaTrash />}
                                                aria-label="Remove item"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveFromCart(item.id)}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                        <Flex mt="4">
                            <Spacer />
                            <Stack spacing="2">
                                <Flex>
                                    <Text fontWeight="bold">Total:</Text>
                                    <Spacer />
                                    <Text>${cart.total}</Text>
                                </Flex>
                                <Button colorScheme="blue">Checkout</Button>
                            </Stack>
                        </Flex>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default CartView;