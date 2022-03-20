import { useEffect, useState } from 'react';
import watchdog from '../api/watchdog';

export default () => {
    const [results, setResults] = useState([]);

    const getTickerAPI = async (id, interval) => {
        try {
            console.log(`/tickers/${id}/time/${interval}`)
            const response = await watchdog.get(`/tickers/${id}/time/${interval}`, {});
            console.log(response)
            setResults(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getTickerAPI()
    }, [])
    return [getTickerAPI, results]
};