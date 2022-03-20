import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Ticker from './Ticker';

const TickerList = ({ results, navigation }) => {
    console.log(results);
    return (
        <View style={styles.container}>
            <FlatList
                data={results}
                keyExtractor={(result) => result.Id}
                style={styles.flatListStyle}
                renderItem={({item}) => {
                    return (
                        <View> 
                            <TouchableOpacity onPress={() => navigation.navigate('TickerShow',{ id:item.Id})} >
                                <Ticker name={item.Name} hourlySentiment={item.HourlySentiment} price={item.Price} />
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: { 
        marginTop: 15,
        marginBottom: 5,
    },
    flatListStyle: { 
        marginBottom: 5,
        
    }
});

export default withNavigation(TickerList);