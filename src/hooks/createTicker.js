import { useState } from 'react';
import watchdog from '../api/watchdog';

export default () => {
    const [response, setResponse] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const createTickerAPI = async (name) => {
        try {
            const resp = await watchdog.post(`/tickers/`, { name: name });
            setResponse(resp)
            setErrorMessage('')
        } catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong')
        }
    };

    return [createTickerAPI, response, errorMessage];
};