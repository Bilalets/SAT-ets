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
      name: 'Student Attendance',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: true,
        position: 'outside', // Position labels outside of the pie chart
        formatter: '{b}: {c}%', // Show name and value in label
      },
      emphasis: {
        label: {
          show: false,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: true, // Show lines for labels
        length: 20, // Adjust the length of label lines
        smooth: 0.2, // Smoothness of the label lines
      },
      data: [
        { value: 90, name: 'Branch A' },
        { value: 70, name: 'Branch B' },
        { value: 80, name: 'Branch C' },
        { value: 90, name: 'Branch D' },
        { value: 30, name: 'Branch E' },
      ],
    },
  ],
};
const StudentAttendance = () => {
  return (
    <div className="w-full">
      <p className="text-xl">Student Attendance</p>
      <ReactECharts option={options} notMerge={true} lazyUpdate={true} />
    </div>
  );
};

export default StudentAttendance;
