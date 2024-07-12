'use client';
import React from 'react';
import ReactECharts from 'echarts-for-react';
export const options = {
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    data: [
      'Branch A',
      'Branch B',
      'Branch C',
      'Branch D',
      'Branch E',
      'Branch F',
      'Branch G',
      'Branch H',
    ],
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 100,
    boundaryGap: false,
  },
  series: [
    {
      data: [40, 95, 80, 60, 80, 50, 30, 10],
      type: 'line',
      showBackground: true,

      areaStyle: {},
    },
  ],
};
const StaffChart = () => {
  return (
    <div>
      <p className="text-xl">Staff </p>
      <ReactECharts option={options} notMerge={true} lazyUpdate={true} />
      <div className="flex justify-center items-center"></div>
    </div>
  );
};

export default StaffChart;
