/*
 * @Author       : 魏威
 * @Date         : 2024-05-27 16:10
 * @LastEditTime : 2024-05-27 16:54
 * @LastEditors  : starone
 * @Description  : 问卷分布饼图
 */

import { ChartMock } from '@/mocks/analysis-chart';
import { PieConfig } from '@ant-design/charts';
import { Pie } from '@ant-design/plots';

import React from 'react';

interface Props {
  id: string;
}

export const DistributionPieChart: React.FC<Props> = (props) => {
  const { id } = props;

  const pieData = id === 'qid-gender' ? ChartMock.gender : [];

  const config: PieConfig = {
    data: pieData,
    legend: {
      color: {
        title: false,
        position: 'top',
        rowPadding: 5
      }
    },
    innerRadius: 0.6,
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold'
      }
    },
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 10
    },
    tooltip: {
      title: 'type',
      items: [
        {
          name: '答卷数量',
          channel: 'value',
          field: 'value'
        }
      ]
    }
  };

  return <Pie {...config} />;
};
