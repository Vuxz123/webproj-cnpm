import React, {useEffect, useState} from "react";
import { Box, Text, Flex, Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import MyNavbar from "../../component/nav/MyNavbar";
import server from "../../util/restful/Server";
import {useAuth0} from "@auth0/auth0-react";

function SellingStatisticView() {
    const [seller, setSeller] = useState(null);

    const {user} = useAuth0();

    useEffect(() => {
        async function fetchData() {
            const res = await server.get("/seller/" + user.sub);
            console.log(res);
            setSeller(res.data);
        }

        fetchData();
    }, []);

    const total = seller;

    return (
        <div>
            <div>
                <MyNavbar/>
            </div>
            <Box p={4}>
                <Text fontSize="xl" mb={4}>Selling Statistics</Text>
                <Flex justifyContent="space-between">
                    <Stat>
                        <StatLabel>Total Sales</StatLabel>
                        <StatNumber>1,234</StatNumber>
                        <StatHelpText>+20% from last week</StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>Total Revenue</StatLabel>
                        <StatNumber>$12,345</StatNumber>
                        <StatHelpText>-10% from last week</StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>Average Order Value</StatLabel>
                        <StatNumber>$50</StatNumber>
                        <StatHelpText>+5% from last week</StatHelpText>
                    </Stat>
                </Flex>
            </Box>
        </div>
    );
}

export default SellingStatisticView;