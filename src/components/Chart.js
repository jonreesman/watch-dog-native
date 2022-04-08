import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const Chart = ({ priceData, title, label, interval, timeMin}) => {
    function* xLabels(interval, recentTime) {

    }
    const setMin = (title) => {
        if (title === 'Sentiment History') {
            return true;
        }
        return false;
    }
    return (
        <View style={styles.container}>
            <Text>{title}</Text>
            <LineChart
            data={{
                labels: 
                    priceData.map((item)=> {
                    let date = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit' }).format(parseFloat(item.TimeStamp)*1000);
                    return(
                        date
                    )
                }),
                datasets: [
                    { 
                        data: priceData.map(item=>{
                            return(
                                item.CurrentPrice
                            )
                        }),
                    }
                ]
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel={label}
            yAxisSuffix=''
            yAxisInterval={1}
            chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                },

            }}
            fromZero={setMin(title)}
            bezier
            style={{ borderRadius: 16}}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: { 
        marginTop: 5,
        alignItems: "center",
    },
    headerStyle: {
        backgroundColor: '#fb8c00',
        borderRadius: 16,
        height: 30,
    },
    flatListStyle: { 
        marginBottom: 5,
        
    }
});

export default Chart;