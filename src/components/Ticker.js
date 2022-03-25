import React from 'react';
import { Text, View, StyleSheet } from 'react-native'

const Ticker = ({name, hourlySentiment, price}) => {
    return (
        <View style={style.container}>
            <Text style={style.tickerStyle}>{name}</Text>
            <Text>{price}</Text>
            <Text style={style.sentimentStyle}>Current Sentiment: {hourlySentiment}</Text>
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
        flex: 3,
    },
    sentimentStyle: {
        color: '#FEFFFF',
        fontSize: 14,
        flex: 2,
    }
});

export default Ticker;