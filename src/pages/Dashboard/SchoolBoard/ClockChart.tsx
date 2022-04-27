import type { GaugeSeriesOption } from 'echarts/charts';
import type { TooltipComponentOption } from 'echarts/components';
import GaugeChart from 'echarts-for-react';

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GaugeSeriesOption
>;

export default (props: { value: string }) => {
  const option: EChartsOption = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        name: '校园打卡完成指数',
        type: 'gauge',
        color: '#91cc75',
        progress: {
          show: true,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}',
        },
        data: [
          {
            value: props.value,
            name: '%',
          },
        ],
      },
    ],
  };

  return <GaugeChart option={option} />;
};
