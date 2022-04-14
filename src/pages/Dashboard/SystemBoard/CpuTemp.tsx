import { useCallback, useEffect, useState } from 'react';
import type { GaugeSeriesOption } from 'echarts/charts';
import GaugeChart from 'echarts-for-react';
import { getDeviceInfo } from '@/services/ant-design-pro/api';

const CpuTemp = (props: { valueType: string; color: string }) => {
  type EChartsOption = echarts.ComposeOption<GaugeSeriesOption>;
  const [value, setValue] = useState<number>(20);
  const getCPUTemp = useCallback(async () => {
    const data = await getDeviceInfo();
    const deviceInfo = data?.data?.deviceInfo;
    setValue(deviceInfo[props.valueType] || 0);
  }, [props.valueType]);
  useEffect(() => {
    getCPUTemp();
  }, [getCPUTemp]);
  useEffect(() => {
    const timer = setInterval(async function () {
      const data = await getDeviceInfo();
      const deviceInfo = data?.data?.deviceInfo;
      setValue(deviceInfo[props.valueType] || 0);
    }, 1500);
    return () => {
      clearInterval(timer);
    };
  });
  const getOptions = (valueCPU: number): EChartsOption => {
    return {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 100,
          splitNumber: 10,
          itemStyle: {
            color: props.color,
          },
          progress: {
            show: true,
            width: 30,
          },

          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 30,
            },
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -20,
            color: '#999',
            fontSize: 20,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontWeight: 'bolder',
            formatter: `{value} ${props.valueType == 'cpuTemp' ? '°C' : '%'}`,
            color: 'auto',
          },
          data: [
            {
              value: valueCPU,
            },
          ],
        },
      ],
    };
  };
  return <GaugeChart option={getOptions(value)} />;
};

export default CpuTemp;
