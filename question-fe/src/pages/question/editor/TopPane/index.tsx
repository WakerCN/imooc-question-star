import { CircleButton } from '@/components/CircleButton';
import { useAppSelector } from '@/hooks/redux';
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined
} from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import React from 'react';
import styles from './index.module.scss';

interface Props {}

export const TopPane: React.FC<Props> = () => {
  const detail = useAppSelector((state) => state.question);
  const { title } = detail;

  return (
    <div className={styles['top-pane']}>
      <div className={styles['title-area']}>
        <Typography.Title
          editable={{ autoSize: { maxRows: 1 } }}
          ellipsis={{ rows: 1 }}
          level={5}
          style={{ margin: '0 0 0 20px' }}
        >
          {title}
        </Typography.Title>
      </div>
      <Flex className={styles['tools-area']} justify={'center'} gap={10}>
        <CircleButton title="删除" icon={<DeleteOutlined />} />
        <CircleButton title="隐藏" icon={<EyeInvisibleOutlined />} />
        <CircleButton title="锁定" icon={<LockOutlined />} />
        <CircleButton title="撤销" icon={<UndoOutlined />} />
        <CircleButton title="重做" icon={<RedoOutlined />} />
      </Flex>
      <Flex className={styles['right-opt']} justify={'end'} gap={10}>
        <Button>保存</Button>
        <Button type="primary">发布</Button>
      </Flex>
    </div>
  );
};
