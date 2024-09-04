import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Pie: React.FC = () => {
  // Create a ref to attach to the div element that will contain the chart
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Make sure the ref has a current value before initializing the chart
    if (chartRef.current) {
      // Initialize the ECharts instance using the ref's current DOM element
      const myChart = echarts.init(chartRef.current);

      // Define the chart option
      const option: echarts.EChartsOption = {
        legend: {
          top: 'bottom',
          left: 'center', // Center the legend horizontally
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: ['30%', '60%'], // Adjust radius for better fit
            center: ['50%', '50%'], // Center the pie chart
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: 'LDC' },
              { value: 38, name: 'UDC' },
              { value: 32, name: 'Assisstant' },
              { value: 30, name: 'Steno' },
              { value: 28, name: 'Biology' },
              { value: 26, name: 'MPT' },
              { value: 22, name: 'Sub-Inspector' },
              { value: 18, name: 'Director' },
              { value: 18, name: 'Physics' },
              { value: 19, name: 'English' },
              
            ],
          },
        ],
      };

      // Set the chart option
      myChart.setOption(option);

      // Cleanup function to dispose of the chart instance on component unmount
      return () => {
        myChart.dispose();
      };
    }
  }, []); // Dependency array is empty to ensure effect runs only once

  return (
    <div className="bg-white w-[600px] h-auto p-5 border shadow-md rounded-lg">
    <h1 className='text-center font-bold text-2xl '>Top 10 Attempted Assessment </h1>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Pie;
