import { ROUTE_PATH } from '@/routers';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarOutlined
} from '@ant-design/icons';
import {
  Button,
  Divider,
  Flex,
  Rate,
  Space,
  Tag,
  Tooltip,
  Typography
} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { title, answerCount, createAt, isPublished, _id, isStar } = info;

  const naviagte = useNavigate();

  const handleEdit = () => {
    naviagte(`/question/edit/${info._id}`);
  };

  const handleTitleClick = () => {
    if (isPublished) {
      naviagte(`${ROUTE_PATH.ANALYSIS}${_id}`);
    } else {
      naviagte(`${ROUTE_PATH.EDIT}${_id}`);
    }
  };

  return (
    <div className={styles['question-card']}>
      <Flex justify="space-between">
        <div className={styles['title-wrap']}>
          <Rate
            tooltips={['收藏']}
            className={styles['star']}
            count={1}
            value={isStar ? 1 : 0}
          />
          <span className={styles['title']} onClick={handleTitleClick}>
            {title}
          </span>
        </div>
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
          <Button type="text" icon={<EditOutlined />} onClick={handleEdit}>
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
