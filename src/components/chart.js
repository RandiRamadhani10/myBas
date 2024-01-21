import React, {useContext, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Colors} from '../utils';
import {ThemeContext} from '../../App';
const screen = Dimensions.get('window');
const Chart = ({data, width = 0, height = 0}) => {
  const {context, setContext} = useContext(ThemeContext);
  const [dataChart, setDataChart] = useState([]);
  const datas = [
    {
      data: [
        data.dw1,
        data.dw2,
        data.dw3,
        data.dw4,
        data.dw5,
        data.dw6,
        data.dw7,
        data.dw8,
        data.dw9,
        data.dw10,
        data.dw11,
        data.dw12,
      ],
      colors: ['red', 'blue', 'green', 'yellow'],
      strokeWidth: 4,
    },
  ];
  const monthData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ],
    datasets: datas,
  };
  const chartConfig = {
    backgroundGradientFrom: Colors.dark,
    backgroundGradientTo: Colors.dark,
    color: (opacity = 1) => `rgba(42, 165, 221, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    // optional
  };
  useEffect(() => {}, []);
  return (
    <>
      <LineChart
        data={monthData}
        width={width}
        height={height}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        bezier={true}
        xLabelsOffset={-10}
      />
    </>
  );
};

export default Chart;
