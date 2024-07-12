'use client';
import ReactECharts from 'echarts-for-react';

export const options = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: '5%',
    left: 'center',
    // doesn't perfectly work with our tricks, disable it
    selectedMode: true,
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '70%'],
      // adjust the start angle
      startAngle: 180,
      label: {
        show: true,
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
        {
          // make an record to fill the bottom 50%
          value: 1048 + 735 + 580 + 484 + 300,
          itemStyle: {
            // stop the chart from rendering this piece
            color: 'none',
            decal: {
              symbol: 'none',
            },
          },
          label: {
            show: false,
          },
        },
      ],
    },
  ],
};
const Studentchart = () => {
  return (
    <div className="w-full">
      <p className="text-xl">Student Strength</p>
      <ReactECharts option={options} notMerge={true} lazyUpdate={true} />
    </div>
  );
};
export default Studentchart;
