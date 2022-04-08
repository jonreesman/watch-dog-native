import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import useTicker from '../hooks/useTicker';
import VictoryChartWrapper from '../components/VictoryChartWrapper.js';

const TickerScreen = ({ navigation }) => {
    const [interval, setInterval] = useState('day');
    const [getTickerAPI, dataRetrieved, result] = useTicker(navigation.getParam('id'), "day");
    const id = navigation.getParam('id');

    useEffect(() => {
        getTickerAPI(navigation.getParam('id'),interval);
        console.log('EFFECT');
    }, []);

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
        return (
            <View style={styles.container}>
                <Text style={styles.headerStyle}>{result.ticker.name}</Text>
                <VictoryChartWrapper 
                title="Quote History"
                style={styles.chartStyle}
                interval={interval}
                priceData={checkDataTime(result.quote_history)} 
                sentimentData={checkDataTime(result.sentiment_history)}
                />
                <View style={styles.intervalButtons}>
                <TouchableOpacity 
                        activeOpacity={0.9}
                        style={styles.intervalButton}
                        onPress={() => {
                            setInterval("day");
                            getTickerAPI(id,interval);
                            }} >
                        <Text style={{color: 'white'}}>day</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={0.9}
                        style={styles.intervalButton}
                        onPress={() => {
                            setInterval("week");
                            getTickerAPI(id,interval);
                            }} >
                        <Text style={{color: 'white'}}>week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={0.9}
                        style={styles.intervalButton}
                        onPress={() => {
                            getTickerAPI(id,interval);
                            setInterval("month");
                            }} >
                        <Text style={{color: 'white'}}>month</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={0.9}
                        style={styles.intervalButton}
                        onPress={() => {
                            setInterval("2month");
                            getTickerAPI(id,interval);
                            }} >
                        <Text style={{color: 'white'}}>two month</Text>
                    </TouchableOpacity>
                </View>
                {/*<Chart 
                title="Sentiment History"
                style={styles.chartStyle}
                priceData={checkDataTime(result.sentiment_history)} 
                label=''
                interval={interval}
        />*/}
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
    },
    intervalButtons: {
        flexDirection: "row",
        marginHorizontal: 40,
        marginBottom: 10
    },
    intervalButton: {
        flex: 1,
        backgroundColor: 'blue',
        marginHorizontal: 5,
        alignItems: 'center',
        height: 20,
        borderRadius: 8,
        justifyContent: 'center',
    }

});

export default TickerScreen;