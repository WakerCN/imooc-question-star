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
  Typography,
  message
} from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { useRequest } from 'ahooks';
import { QuestionService } from '@/services/question';

export interface QuestionInfo {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  createAt: string;
  answerCount: number;
  isDeleted: boolean;
}

interface QuestionCardProps {
  info: QuestionInfo;
}

export const QuestionCard: React.FC<QuestionCardProps> = (props) => {
  const { info } = props;
  const { title, answerCount, createAt, isPublished, _id, isStar } = info;

  const naviagte = useNavigate();

  const [starState, setStarState] = useState<boolean>(isStar);

  const { run: changeStar, loading: starLoading } = useRequest(
    async () => {
      return await QuestionService.updateQuestion(_id, { isStar: !starState });
    },
    {
      manual: true,
      onSuccess: () => {
        setStarState((prev) => !prev);
        message.success(starState ? '取消收藏' : '收藏成功');
      }
    }
  );

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
            value={starState ? 1 : 0}
            onChange={changeStar}
            disabled={starLoading}
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
          <Button
            className={styles['opt-btn']}
            type="text"
            icon={<EditOutlined />}
            onClick={handleEdit}
          >
            编辑问卷
          </Button>
          <Button
            className={styles['opt-btn']}
            type="text"
            icon={<LineChartOutlined />}
            disabled
          >
            数据统计
          </Button>
          <Typography.Text>
            答卷：<span className={styles['answer-count']}>{answerCount}</span>
          </Typography.Text>
        </Space>
        <Space>
          <Tooltip title="收藏">
            <Button
              className={styles['opt-btn']}
              type="text"
              icon={<StarOutlined />}
              onClick={changeStar}
              loading={starLoading}
            >
              {starState ? '取消收藏' : '收藏'}
            </Button>
          </Tooltip>
          <Tooltip title="复制">
            <Button
              className={styles['opt-btn']}
              type="text"
              icon={<CopyOutlined />}
            >
              复制
            </Button>
          </Tooltip>
          <Tooltip title="删除">
            <Button
              className={styles['opt-btn']}
              type="text"
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Tooltip>
        </Space>
      </Flex>
    </div>
  );
};
