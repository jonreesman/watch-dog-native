import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import TickerList from '../components/TickerList';
import useTickers from '../hooks/useTickers';

const HomeScreen = () => {
    const [getTickersAPI, results] = useTickers();
    
    return (
        <View>
            <TickerList results={results} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        marginTop: 5,
        marginBottom: 5,
    }
});

export default HomeScreen;