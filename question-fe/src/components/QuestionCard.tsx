import { message, modal } from '@/components/AntdStatic';
import { ROUTE_PATH } from '@/routers';
import { QuestionService } from '@/services/question';
import { AntdTools } from '@/utils/antd';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  Button,
  Col,
  Divider,
  Flex,
  Rate,
  Space,
  Tag,
  Tooltip,
  Typography
} from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

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

  const { runAsync: changeStar, loading: starLoading } = useRequest(
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

  // ========== 复制 start ========== //
  const handleDuplicate = () => {
    const modalInstance = modal.confirm({
      title: '复制问卷',
      content: (
        <Typography.Text>
          确定要复制 “{<Typography.Text>{title}</Typography.Text>}” 问卷吗？
        </Typography.Text>
      ),
      onOk: async () => {
        AntdTools.modalUploadLoading(modalInstance, true);
        const { id } = await duplicateQuesion();
        AntdTools.modalUploadLoading(modalInstance, false);
        naviagte(`${ROUTE_PATH.EDIT}${id}`);
      }
    });
  };

  const { runAsync: duplicateQuesion } = useRequest(
    async () => await QuestionService.duplicateQuestion(_id),
    {
      manual: true,
      onSuccess: () => {
        message.success('复制成功');
      }
    }
  );
  // =========== 复制 end =========== //

  // ========== 删除 start ========== //
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { runAsync: deleteQuestion } = useRequest(
    async () => QuestionService.updateQuestion(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功');
        setIsDeleted(true);
      }
    }
  );

  const handleDelete = () => {
    const modalInstance = modal.confirm({
      title: '删除问卷',
      content: (
        <Typography.Text>
          确定要删除 “{<Typography.Text>{title}</Typography.Text>}” 问卷吗？
        </Typography.Text>
      ),
      onOk: async () => {
        AntdTools.modalUploadLoading(modalInstance, true);
        await deleteQuestion();
        AntdTools.modalUploadLoading(modalInstance, false);
      }
    });
  };

  // =========== 删除 end =========== //
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

  if (isDeleted) {
    return null;
  }

  return (
    <Col span={24}>
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
              disabled={!isPublished}
            >
              数据统计
            </Button>
            <Typography.Text>
              答卷：
              <span className={styles['answer-count']}>{answerCount}</span>
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
                onClick={handleDuplicate}
              >
                复制
              </Button>
            </Tooltip>
            <Tooltip title="删除">
              <Button
                className={styles['opt-btn']}
                type="text"
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              >
                删除
              </Button>
            </Tooltip>
          </Space>
        </Flex>
      </div>
    </Col>
  );
};
