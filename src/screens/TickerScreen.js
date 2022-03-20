import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import useTicker from '../hooks/useTicker';
import watchdog from '../api/watchdog'

const TickerScreen = ({ navigation }) => {
    const [interval, setInterval] = useState('1d');
    const id = navigation.getParam('id')

    const getResult = async (id) => {
        const response = await watchdog.get(`/tickers/${id}/time/${interval}`);
    };

    console.log(response);
    return (
        <View>
            <Text>Test</Text>
        </View>
    )
};

const styles = StyleSheet.create({

});

export default TickerScreen;