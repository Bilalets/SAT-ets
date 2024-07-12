'use client';
import ReactECharts from 'echarts-for-react';

export const options = {
  legend: {
    top: '5%',
    left: 'center',
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  series: [
    {
      name: 'Performance',
      type: 'pie',
      radius: ['80%', '60%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
        formatter: '{d}%',
        fontSize: 30,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: true,
      },
      data: [
        {
          value: 78,

          itemStyle: { borderRadius: [6, 6, 0, 0] },
        }, // Make 70 side corner rounded
        {
          value: 22,
          itemStyle: { color: 'rgba(180, 180, 180, 0.5)' },
          borderRadius: [6, 6, 0, 0],
        }, // Make 30 side light gray
      ],
    },
  ],
};
const Overview = () => {
  return (
    <div>
      <p className="text-xl">Result Overview</p>
      <ReactECharts option={options} notMerge={true} lazyUpdate={true} />
    </div>
  );
};

export default Overview;
