import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { withNavigation } from 'react-navigation';
import { SwipeListView } from 'react-native-swipe-list-view';
import Ticker from './Ticker';
import deactivateTicker from '../hooks/deactivateTicker';

const TickerList = ({ results, navigation, refreshTickers}) => {
    const [listData, setListData] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [deactivateTickerAPI, response, errorMessage] = deactivateTicker();

    console.log(results);

    const onRefresh = () => {
        console.log("refresh!")
        refreshTickers();
        setRefreshing(false);
    };

    const onDelete = (Id) => {
        deactivateTickerAPI(Id);
        onRefresh();
    }

    const hiddenItemWithAction = ({ Id }) => {
        return(
            <View style={styles.rowBack}>
                <TouchableOpacity style={[styles.backRightButton, styles.backRightButtonRight]}
                    onPress={() => onDelete(Id) }
                >
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SwipeListView
                data={results}
                keyExtractor={(result) => result.Id}
                style={styles.flatListStyle}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(refreshTickers)} />
                }
                renderItem={({item}) => {
                    return (
                        <View> 
                            <TouchableOpacity 
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('TickerShow',{ id:item.Id})} >
                                <Ticker name={item.Name} hourlySentiment={item.HourlySentiment} price={item.Quote} />
                            </TouchableOpacity>
                        </View>
                    );
                }}
                renderHiddenItem={({item}) => hiddenItemWithAction(item, deactivateTickerAPI)}
                leftOpenValue={75}
                rightOpenValue={-75}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: { 
        flex: 1,
    },
    flatListStyle: { 
        
    },
    rowBack: { 
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15,
    },
    backRightButton: { 
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        marginTop: 5,
    },
    backRightButtonRight: { 
        backgroundColor: 'red',
        borderRadius: 5,
        right: 0,
    }
});

export default withNavigation(TickerList);