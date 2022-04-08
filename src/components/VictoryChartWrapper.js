import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "victory-native";

const VictoryChartWrapper = ({ priceData, sentimentData}) => {
    
    const setMin = (title) => {
        if (title === 'Sentiment History') {
            return true;
        }
        return false;
    }
    const priceDataMaxima = Math.max(...priceData.map((i)=>i.CurrentPrice));
    const sentimentDataMaxima = Math.max(...sentimentData.map((i)=>i.CurrentPrice));
    const xOffsets = [50, 350];

    const minTime = Math.min(...priceData.map((i)=>i.TimeStamp));
    const maxTime = () => {
        const sentimentMaxTime = Math.max(...sentimentData.map((i)=>i.TimeStamp));
        const priceDataMaxTime = Math.max(...priceData.map((i)=>i.TimeStamp));
        if (sentimentMaxTime > priceDataMaxTime) {
            console.log("maxTime: ", new Date(sentimentMaxTime * 1000).toLocaleString("en-US", {day: "numeric", hour: "numeric"}))
            return sentimentMaxTime;
        }
        console.log("maxTime: ", new Date(priceDataMaxTime * 1000).toLocaleString("en-US", {day: "numeric",hour: "numeric"}))

        return priceDataMaxTime;
    }
    const fillPrice = () => {
        const lastTime = priceData[priceData.length - 1].TimeStamp;
        const lastPrice = priceData[priceData.length - 1].CurrentPrice;  
        const max = maxTime();
        for (let i = lastTime; i < max; i+=3600) {
            priceData.push({CurrentPrice: lastPrice, TimeStamp: i});
        }
        return priceData
    }

    const anchors = ["end", "end", "start"];
    console.log(priceDataMaxima, sentimentDataMaxima, minTime, maxTime());

    return (
        <View >
            <VictoryChart
                theme={VictoryTheme.material}
                width={400}
                height={300}
                domain={{ y: [0, 1.1], x: [minTime, maxTime()]}}
                
            >
                <VictoryAxis 
                    tickFormat={t => new Date(t * 1000).toLocaleString("en-US", {hour: "numeric"})}
                />
                <VictoryAxis dependentAxis
                    style={{ 
                       axis: {stroke: "red"}
                    }}
                    offsetX={xOffsets[0]}
                    tickValues={[0.8, 0.9, 1, 1.1]}
                    tickFormat={(t)=> (t*priceDataMaxima).toFixed(2)}
                />
                <VictoryAxis dependentAxis
                    style={{ 
                       axis: {stroke: "blue"}
                    }}
                    offsetX={xOffsets[1]}
                    tickValues={[0.1,0.2, 0.5, 0.6]}
                    tickFormat={(t)=> (t * sentimentDataMaxima).toFixed(3)}
                />
                <VictoryLine 
                    data={fillPrice()}
                    style={{
                        data: {
                            stroke: "red",
                        }
                    }}
                    y={(datum)=> datum.CurrentPrice / priceDataMaxima}
                    x={(datum)=> datum.TimeStamp}
                />
                <VictoryLine 
                    data={sentimentData}
                    interpolation="natural"
                    style={{
                        data: {
                            stroke: "blue",
                        }
                    }}
                    y={(datum)=> datum.CurrentPrice / sentimentDataMaxima}
                    x={(datum)=> datum.TimeStamp}
                    
                />
            </VictoryChart>
        </View>
    )
};

const styles = StyleSheet.create({
    container: { 
        marginTop: 5,
        flex: 1,
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

export default VictoryChartWrapper;