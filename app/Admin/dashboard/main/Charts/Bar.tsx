import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Bar: React.FC = () => {
  // Create a reference to the DOM element that will contain the chart
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Ensure that the chart DOM element is available
    if (chartRef.current) {
      // Initialize the ECharts instance based on the ref DOM element
      const myChart = echarts.init(chartRef.current);

      // Configuration options for the ECharts chart
      const dataAxis = [
        'CSS', 'MDCAT', 'ECAT', 'FIA', 'Wapda', 'Railway', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'
      ];
      const data = [
        220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220
      ];
      const yMax = 500;
      const dataShadow = Array(data.length).fill(yMax);

      const option: echarts.EChartsOption = {
        title: {
          text: '',
      
        },
        xAxis: {
          data: dataAxis,
          axisLabel: { inside: true, color: '#fff' },
          axisTick: { show: false },
          axisLine: { show: false },
          z: 10,
        },
        yAxis: {
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: '#999' },
        },
        dataZoom: [{ type: 'inside' }],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' },
                ]),
              },
            },
            data: data,
          },
        ],
      };

      // Apply the configuration option to the chart instance
      myChart.setOption(option);

      // Handle click events to zoom in on data points
      const zoomSize = 6;
      myChart.on('click', function (params) {
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
        });
      });

      // Cleanup function to dispose of the chart instance on component unmount
      return () => {
        myChart.dispose();
      };
    }
  }, []); // Dependency array is empty to ensure effect runs only once

  return (
    <div className=' bg-white w-[625px]  ml-4 border shadow-md  rounded-lg '>
   <div className='text-center font-bold text-2xl mt-3'>Question Bank</div>
      <div id="main" ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Bar;
