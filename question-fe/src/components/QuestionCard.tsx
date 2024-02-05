import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarOutlined
} from '@ant-design/icons';
import { Button, Divider, Flex, Space, Tag, Tooltip, Typography } from 'antd';
import React from 'react';
import styles from './index.module.scss';

export interface QuestionInfo {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  createAt: string;
  answerCount: number;
}

interface QuestionCardProps {
  info: QuestionInfo;
}

export const QuestionCard: React.FC<QuestionCardProps> = (props) => {
  const { info } = props;
  const { title, answerCount, createAt, isPublished } = info;

  return (
    <div className={styles['question-card']}>
      <Flex justify="space-between">
        <h3 className={styles['title']}>{title}</h3>
        <Space>
          <span>{createAt}</span>
          {isPublished ? (
            <Tag color="green">已发布</Tag>
          ) : (
            <Tag color="default">未发布</Tag>
          )}
        </Space>
      </Flex>
      <Divider className={styles['divider']} />
      <Flex justify="space-between">
        <Space>
          <Button type="text" icon={<EditOutlined />}>
            编辑问卷
          </Button>
          <Button type="text" icon={<LineChartOutlined />} disabled>
            数据统计
          </Button>
          <Typography.Text>
            答卷：<span className={styles['answer-count']}>{answerCount}</span>
          </Typography.Text>
        </Space>
        <Space>
          <Tooltip title="标星">
            <Button type="text" icon={<StarOutlined />} />
          </Tooltip>
          <Tooltip title="复制">
            <Button type="text" icon={<CopyOutlined />} />
          </Tooltip>
          <Tooltip title="删除">
            <Button type="text" icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      </Flex>
    </div>
  );
};
