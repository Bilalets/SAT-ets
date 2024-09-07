import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';

const Pie: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [chartData, setChartData] = useState<{ value: number; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/Bestassessment');
        const apiData = response.data;

        // Process API data to extract categories and subject names
        const data = apiData.map((item: any) => ({
          value: item.totalOccurrences,
          name: `${item.catname} - ${item.subjectname}`,
        }));

        setChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current && chartData.length > 0) {
      const myChart = echarts.init(chartRef.current);

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
            name: 'Top 10 Attempted Assessment',
            type: 'pie',
            radius: ['30%', '60%'], // Adjust radius for better fit
            center: ['50%', '50%'], // Center the pie chart
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
            },
            data: chartData,
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [chartData]);

  return (
    <div className="bg-white w-[600px] h-auto p-5 border shadow-md rounded-lg">
      <h1 className='text-center font-bold text-2xl'>Top 10 Attempted Assessment</h1>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Pie;
