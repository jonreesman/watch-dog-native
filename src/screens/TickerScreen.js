import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import useTicker from '../hooks/useTicker';
import Chart from '../components/Chart.js';
import TweetEmbed from 'react-tweet-embed';

const TickerScreen = ({ navigation }) => {
    const [interval, setInterval] = useState('day');
    const [getTickerAPI, dataRetrieved, result] = useTicker(navigation.getParam('id'), 'day');
    const [graphData, setData] = useState([]);
    const id = navigation.getParam('id');

    useEffect(() => {
        getTickerAPI(navigation.getParam('id'),'day');
        console.log(result);
        console.log('EFFECT');
    }, []);

    const setChartTimeMin = ({quote_history}) => {
        let timeMin = new Date().getTime() / 1000;
        for (const quote in quote_history) {
            if (quote.TimeStamp < timeMin) {
                timeMin = quote.TimeStamp;
            }
        }
        return timeMin;
    }
    const setSentimentChartData = ({quote_history, sentiment_history}) => {
        let chartData = [];
        let index1 = 0;
        let index2 = 0;
        let current = 0;
        for (const quote in quote_history) {

        }
    }

    const checkDataTime = (chart) => {
        if (chart.length < 2) {
            return chart;
        }
        if (chart[0].TimeStamp > chart[1].TimeStamp) {
            return chart.reverse();
        }
        return chart;
    }

    if (dataRetrieved === false) {
        console.log('Test')
        return (
        <View>
            <Text>Awaiting Server...</Text>
        </View>
        )
    } else {
        console.log('========DEBUG==========');
        console.log(result.ticker);
        console.log(dataRetrieved);   
        return (
            <View style={styles.container}>
                <Text style={styles.headerStyle}>{result.ticker.name}</Text>
                <Chart 
                title="Price History"
                style={styles.chartStyle}
                priceData={checkDataTime(result.quote_history)} 
                label='$' 
                interval={interval}
                timeMin={setChartTimeMin(result)}
                />
                <Chart 
                title="Sentiment History"
                style={styles.chartStyle}
                priceData={checkDataTime(result.sentiment_history)} 
                label=''
                interval={interval}
                timeMin={setChartTimeMin(result)}
                />
                <FlatList 
                data={result.statement_history}
                keyExtractor={(result) => result.ID}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.tickerStyle}>
                            <Text style={{flex:3 }}>{item.Expression}</Text>
                            <Text style={{flex:1 }}>Sentiment: {item.Polarity}</Text>
                            <Text style={{flex:1 }}>Time: {(item) => {
                                return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit' }).format(parseFloat(item.TimeStamp)*1000)}
                                }
                                </Text>

                        </View>
                    );
                }}
                />

            </View>
        )
    }

};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerStyle: { 
        fontWeight: 'bold',
        color: '#FEFFFF',
        fontSize: 18,
    },
    chartStyle: { 
        marginTop: 5,
        marginBottom: 5,
    },
    tickerStyle: {
        backgroundColor: '#fb8c00',
        borderRadius: 16,
        marginTop: 2,
        alignItems: 'center',
    }
});

export default TickerScreen;