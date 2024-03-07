import { Button, Space, Typography } from 'antd';
import React from 'react';
import styles from './index.module.scss';
import { useAppSelector } from '@/hooks/redux';
import { CircleButton } from '@/components/CircleButton';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined
} from '@ant-design/icons';

interface Props {}

export const TopPane: React.FC<Props> = () => {
  const detail = useAppSelector((state) => state.question);
  const { title } = detail;

  return (
    <div className={styles['top-pane']}>
      <Typography.Title editable level={5} style={{ margin: '0 0 0 20px' }}>
        {title}
      </Typography.Title>
      <Space>
        <CircleButton title="删除" icon={<DeleteOutlined />} />
        <CircleButton title="隐藏" icon={<EyeInvisibleOutlined />} />
        <CircleButton title="锁定" icon={<LockOutlined />} />
        <CircleButton title="撤销" icon={<UndoOutlined />} />
        <CircleButton title="重做" icon={<RedoOutlined />} />
      </Space>
      <Space className={styles['right-opt']}>
        <Button>保存</Button>
        <Button type="primary">发布</Button>
      </Space>
    </div>
  );
};
