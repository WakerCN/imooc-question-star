/*
 * @Author       : 魏威
 * @Date         : 2024-03-06 16:45
 * @LastEditTime : 2024-03-26 15:16
 * @LastEditors  : Waker
 * @Description  :
 */
import { useAppSelector } from '@/hooks/redux';
import { Button, Flex, Typography } from 'antd';
import React from 'react';
import { EditorToolBar } from './EditorToolbar';
import styles from './index.module.scss';

interface Props {}

export const TopPane: React.FC<Props> = () => {
  const detail = useAppSelector((state) => state.question.present);
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
      <EditorToolBar />
      <Flex className={styles['right-opt']} justify={'end'} gap={10}>
        <Button>保存</Button>
        <Button type="primary">发布</Button>
      </Flex>
    </div>
  );
};
