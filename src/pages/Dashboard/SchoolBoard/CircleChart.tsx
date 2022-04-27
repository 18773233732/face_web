import type { PieSeriesOption } from 'echarts/charts';
import PieChart from 'echarts-for-react';

type EChartsOption = echarts.ComposeOption<PieSeriesOption>;

export default (props: { data: any[] }) => {
  const option: EChartsOption = {
    title: {
      text: '疫情温度人数监测',
      subtext: '今日报表',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '疫情温度人数监测',
        type: 'pie',
        radius: '50%',
        data: props.data,
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
  return <PieChart option={option} />;
};
