'use client';
import React from 'react';
import ReactECharts from 'echarts-for-react';
export const options = {
  tooltip: {
    // Configure tooltip
    trigger: 'axis', // Show tooltip on hover over bars
    formatter: '{b}: {c}%', // Display series name (label) and data value in the tooltip
    axisPointer: {
      type: 'shadow', // Show tooltip shadow
    },
  },
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
  },
  series: [
    {
      data: [40, 95, 80, 60, 80, 50, 30, 10],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
      barWidth: 25,
      itemStyle: {
        color: 'rgba(0, 0, 0, 1)', // each bar color Dark gray
        barBorderRadius: [5, 5, 0, 0], // Top-left and top-right corners rounded
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%',
        },
      },
    },
  ],
};
const Barchart = () => {
  return (
    <div>
      <p className="text-xl">Branches Performance</p>
      <ReactECharts option={options} notMerge={true} lazyUpdate={true} />
      <div className="flex justify-center items-center"></div>
    </div>
  );
};

export default Barchart;
