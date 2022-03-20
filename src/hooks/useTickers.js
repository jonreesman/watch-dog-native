import { useEffect, useState } from 'react';
import watchdog from '../api/watchdog';

export default () => {
    const [results, setResults] = useState([]);

    const getTickersAPI = async () => {
        try {
            console.log('SCANNING')
            const response = await watchdog.get('/tickers', {});
            console.log(response)
            setResults(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getTickersAPI()
    }, [])
    return [getTickersAPI, results]
};