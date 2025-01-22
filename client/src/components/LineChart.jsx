import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { ColorContext } from '../scenes/global/ColorContext';
import { useContext } from 'react';
export default function Lchart({
  xAxisData,
  series1Data,
  series2Data,
  series1Label = 'Planned',
  series2Label = 'Actual',

}) {
  const {color} = useContext(ColorContext)
  return (
    <LineChart
      xAxis={[{ data: xAxisData, scaleType: 'point' }]}
      series={[
        {
          data: series1Data,
          label: series1Label,
        },
        {
          data: series2Data,
          label: series2Label,
        },
      ]}
      colors={[color, '#303030']}
      margin={{ left: 80 }}
      grid={{ vertical: true, horizontal: true }}
      height={350}
    />
  );
}
