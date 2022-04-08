import { useEffect, useState } from 'react';
import watchdog from '../api/watchdog';

export default () => {
    const [results, setResults] = useState([]);
    const [dataRetrieved, setDataRetrieved] = useState(false);

    const getTickerAPI = async (id, interval) => {
        try {
            console.log(`/tickers/${id}/time/${interval}`)
            const response = await watchdog.get(`/tickers/${id}/time/${interval}`, {});
            setResults(response.data)
            setDataRetrieved(true);
        } catch (err) {
            setDataRetrieved(false);
            console.log("wtf ", id);
            console.log(err);
        }
    }
    return [getTickerAPI, dataRetrieved, results]
};