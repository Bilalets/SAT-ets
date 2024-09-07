import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';

const Bar: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [chartData, setChartData] = useState<{ dataAxis: string[], data: number[] }>({ dataAxis: [], data: [] });

  // Fetch data and process it
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/Subjectquesnumber'); // Replace with your API endpoint
      const apiData = response.data;

      // Process the data to get the required format for the chart
      const dataAxis: string[] = [];
      const data: number[] = [];

      apiData.forEach((category: any) => {
        category.subcategories.forEach((subcategory: any) => {
          subcategory.subjects.forEach((subject: any) => {
            dataAxis.push(`${category.categoryName} - ${subcategory.subcategoryName} - ${subject.subjectName}`);
            data.push(subject.questionCount);
          });
        });
      });

      setChartData({ dataAxis, data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current && chartData.dataAxis.length) {
      const myChart = echarts.init(chartRef.current);

      const option: echarts.EChartsOption = {
        title: {
         
        },
        xAxis: {
          data: chartData.dataAxis,
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
            data: chartData.data,
          },
        ],
      };

      myChart.setOption(option);

      const zoomSize = 6;
      myChart.on('click', function (params) {
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: chartData.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: chartData.dataAxis[Math.min(params.dataIndex + zoomSize / 2, chartData.data.length - 1)],
        });
      });

      return () => {
        myChart.dispose();
      };
    }
  }, [chartData]);

  return (
    <div className='bg-white w-[625px] ml-4 border shadow-md rounded-lg'>
      <div className='text-center font-bold text-2xl mt-3'>Question Bank</div>
      <div id="main" ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Bar;
