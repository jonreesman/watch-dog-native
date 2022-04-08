import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.50.96:3100/api',
});