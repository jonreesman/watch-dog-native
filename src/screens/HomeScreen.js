import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation';
import TickerList from '../components/TickerList';
import useTickers from '../hooks/useTickers';

const HomeScreen = ({ navigation }) => {
    const [getTickersAPI, results] = useTickers();
    
    return (
        <View style={styles.container}>
            <TickerList results={results} refreshTickers={() => getTickersAPI()} />
        </View>
    );
};

HomeScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: ()=> 
        <TouchableOpacity onPress={() => navigation.navigate('AddTick')}>
            <Feather name="plus" style={{ marginRight: 15 }} size={30} />
        </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    container: { 
        flex: 1,
    }
});

export default HomeScreen;