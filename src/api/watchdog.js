import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.86.43:3100/api',
});