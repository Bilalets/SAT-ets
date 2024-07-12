'use client';
import ReactECharts from 'echarts-for-react';

export const options = {
  tooltip: {
    trigger: 'item',
    formatter: '{c}%',
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 1,
      },
      data: [
        { value: 90, name: 'Branch A' },
        { value: 99, name: 'Branch B' },
        { value: 100, name: 'Branch C' },
        { value: 80, name: 'Branch D' },
        { value: 70, name: 'Branch E' },
      ],
      label: {
        show: true,
        position: 'outside', // Position labels outside of the pie chart
        formatter: '{b}: {c}%',
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};
const StaffAttendance = () => {
  return (
    <div className="w-full h-full">
      <p className="text-xl">Staff Attendance</p>
      <ReactECharts option={options} notMerge={true} lazyUpdate={true} />
    </div>
  );
};

export default StaffAttendance;
