import ReactECharts from 'echarts-for-react';

export const options = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Branch A',
      type: 'line',
      stack: 'Total',
      data: [90, 80, 70, 60, 50, 40, 30, 20, 10, 100, 95],
    },
    {
      name: 'Branch B',
      type: 'line',
      stack: 'Total',
      data: [90, 80, 70, 60, 50, 40, 30, 20, 10, 100, 95],
    },
    {
      name: 'Branch C',
      type: 'line',
      stack: 'Total',
      data: [90, 80, 70, 60, 50, 40, 30, 20, 10, 100, 95],
    },
    {
      name: 'Branch D',
      type: 'line',
      stack: 'Total',
      data: [90, 80, 70, 60, 50, 40, 30, 20, 10, 100, 95],
    },
    {
      name: 'Branch E',
      type: 'line',
      stack: 'Total',
      data: [90, 80, 70, 60, 50, 40, 30, 20, 10, 100, 95],
    },
  ],
};
const Annual = () => {
  return (
    <div>
      <p className="text-xl">Branches Performance</p>
      <ReactECharts option={options} notMerge={true} lazyUpdate={true} />
      <div className="flex justify-center items-center"></div>
    </div>
  );
};

export default Annual;
