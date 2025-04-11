import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const RealTimeChart = ({ trajectoryData, currentPosition }) => {
  const screenWidth = Dimensions.get('window').width;

  const formatChartData = () => {
    if (!trajectoryData || trajectoryData.length === 0) {
      return {
        labels: ['0'],
        datasets: [
          {
            data: [0],
            color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
            strokeWidth: 2
          }
        ]
      };
    }

    return {
      labels: trajectoryData.map((_, i) => i.toString()),
      datasets: [
        {
          data: trajectoryData.map(point => point.y),
          color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
          strokeWidth: 2
        },
        {
          data: Array(trajectoryData.length - 1).fill(null).concat([currentPosition.y]),
          color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
          strokeWidth: 4
        },
        {
          data: Array(trajectoryData.length).fill(0),
          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
          strokeWidth: 2,
          withDots: false
        }
      ]
    };
  };

  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={formatChartData()}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="Y:"
        xAxisLabel="Punto:"
        yAxisSuffix=" cm"
        chartConfig={{
          backgroundColor: '#121212',
          backgroundGradientFrom: '#1E1E1E',
          backgroundGradientTo: '#2D2D2D',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#000'
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
};

const styles = {
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  }
};

export default RealTimeChart;