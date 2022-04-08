import React from 'react';
import { Text, View, StyleSheet } from 'react-native'

const Ticker = ({name, hourlySentiment, price}) => {
    return (
        <View style={style.container}>
            <Text style={style.tickerStyle}>{name}</Text>
            <Text style={style.priceStyle}>${price}</Text>
            <Text style={style.sentimentStyle}>Current Sentiment: {"\n"}{"\n"} {hourlySentiment}</Text>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        backgroundColor: '#3B55D0',
        borderRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        height: 120,
        marginTop: 5,
        flexDirection: 'row',
    },
    tickerStyle: {
        fontWeight: 'bold',
        color: '#FEFFFF',
        fontSize: 18,
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    sentimentStyle: {
        color: '#FEFFFF',
        fontSize: 14,
        flex: 4,
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    priceStyle: {
        color: '#FEFFFF',
        fontSize: 14,
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 20,
    }
});

export default Ticker;