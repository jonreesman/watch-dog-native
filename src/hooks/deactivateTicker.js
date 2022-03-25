import { useState } from 'react';
import watchdog from '../api/watchdog';

export default () => {
    const [response, setResponse] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const deactivateTickerAPI = async (id) => {
        try {
            console.log(id)
            const resp = await watchdog.delete(`/tickers/${id}`, {});
            setResponse(resp)
            setErrorMessage('')
        } catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong')
        }
    }

    return [deactivateTickerAPI, response, errorMessage];
};