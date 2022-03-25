import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import watchdog from '../api/watchdog';
import createTicker from '../hooks/createTicker';

const AddTickerScreen = ({ navigation}) => {
    const [ticker, setTicker] = useState('SPY');
    const [createTickerAPI, response, errorMessage] = createTicker();

    
    const onSubmit = (ticker) => {
        createTickerAPI(ticker);
    };

    return (
        <View style={styles.container}>
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <TextInput 
                autoCapitalize='none'
                autoCorreact={false}
                style={styles.textInputStyle}
                placeholder=""
                value={ticker}
                onChangeText={setTicker}
                textAlign="center"
            />
            <TouchableOpacity onPress={() => {
                createTickerAPI(ticker);
                if (!errorMessage) {
                    navigation.navigate('Home');
                }
            }}
            style={styles.buttonStyle}
            > 
            <Text style={{color: 'white'}}>Add</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: { 
        marginTop: 15,
        marginBottom: 5,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonStyle: {
        marginTop: 20,
        alignItems: 'center',
        height: 30,
        flexDirection: 'column',
        marginRight: 15,
        marginLeft: 15,
        backgroundColor: '#161143',
        justifyContent: 'center',
        borderRadius: 10,
    },
    textInputStyle: {
        marginRight: 30,
        marginLeft: 30,
        backgroundColor: 'white',
        borderRadius: 5,
        height: 30,
        justifyContent: 'center',
    }
});

export default withNavigation(AddTickerScreen);