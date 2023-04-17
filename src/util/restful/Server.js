import axios from 'axios';

import config from '../config/config';

const server = axios.create({
    baseURL: config.apiUrl,
});


export default server;