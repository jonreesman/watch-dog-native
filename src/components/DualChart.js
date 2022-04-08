import React, {useState} from 'react';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { View, StyleSheet } from 'react-native';

const DualChart = ({ priceData, sentimentData, interval}) => {
    const yAxesSvg = { fontSize: 8, fill: 'grey', };
    const xAxesSvg = { fontSize: 8, fill: 'grey', rotation: 45, originY: 60};

    const verticalContentInset = { top: 5, bottom: 5};
    const xAxisHeight = 30;

    const findXMax = (priceData, sentimentData) => {
        if (priceData[priceData.length-1].TimeStamp < sentimentData[sentimentData.length-1].TimeStamp) {
            console.log('Sentiment')
            return sentimentData[sentimentData.length-1].TimeStamp
        }
        return priceData[priceData.length-1].TimeStamp;
    }
    const xMax = findXMax(priceData, sentimentData);
    const xMin = (xMax - 86400)*1000;

    console.log(sentimentData);
    return (
        <View style={styles.container}>
            <YAxis
                data={priceData.map(item=>{
                    return(
                        item.CurrentPrice
                    )
                })}
                contentInset={verticalContentInset}
                svg={yAxesSvg}
                formatLabel={(value) => `$${value}`}
                style={{marginBottom: xAxisHeight}}
            />
            <View style={{ flex: 1, marginLeft: 10}}>
                <LineChart
                    style={{ flex: 1}}
                    data={priceData}
                    xAccessor={({item}) => 
                        item.TimeStamp
                    }
                    yAccessor={({item}) => 
                        item.CurrentPrice
                    }
                    svg={{ 
                        stroke: 'rgb(134, 65, 244)',
                        strokeWidth: 2,
                    }}
                    xMin={xMin}
                    xMax={xMax}
                    contentInset={verticalContentInset}
                >
                    <Grid />
                </LineChart>
                <LineChart
                    style={{ flex: 1, position: 'absolute'}}
                    data={sentimentData}
                    xAccessor={({item}) => 
                        item.TimeStamp
                    }
                    yAccessor={({item}) => 
                        item.CurrentPrice
                    }
                    svg={{ 
                        stroke: 'rgb(0, 255, 0)',
                        strokeWidth: 2,
                    }}
                    contentInset={verticalContentInset}
                    xMin={xMin}
                    xMax={xMax}
                    yMin={0}
                    yMax={1}
                >
                </LineChart>
                <XAxis 
                    style={{ marginHorizontal: -10, height: xAxisHeight }} 
                    data={priceData.map(item=> {
                        return(
                            item.TimeStamp
                        )
                    })}
                    xAccessor={({item})=>item}
                    formatLabel={item=>
                        new Date(item * 1000).toLocaleString("en-US", {hour: "numeric"})
                    }
                    contentInset={{ left:10, right: 10 }}
                    svg={xAxesSvg}
                    xMin={xMin}
                    xMax={xMax}
                />
            </View>
            <YAxis 
                data={sentimentData.map(item=>{
                    return(
                        item.CurrentPrice
                    )
                })}
                yMin={0}
                yMax={1}
                contentInset={{verticalContentInset}}
                svg={yAxesSvg}
                formatLabel={(value) => `${value}`}
                style={{marginBottom: xAxisHeight}}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: { 
        padding: 15,
        height: 300,
        flexDirection: 'row',
    },
    headerStyle: {
        backgroundColor: '#fb8c00',
        borderRadius: 16,
        height: 30,
    },
});

export default DualChart;