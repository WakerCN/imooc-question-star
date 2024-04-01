/*
 * @Author       : 魏威
 * @Date         : 2024-03-28 16:52
 * @LastEditTime : 2024-03-29 15:49
 * @LastEditors  : Waker
 * @Description  :
 */
import { message } from '@/components/AntdStatic';
import { ROUTE_PATH } from '@/routers';
import { CopyFilled, QrcodeOutlined } from '@ant-design/icons';
import { Button, Flex, Input, InputRef, Popover, QRCode, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.scss';

interface Props {}

export const AnalysisHeader: React.FC<Props> = () => {
  const params = useParams();
  const { id } = params;

  const inputRef = useRef<InputRef>(null);

  const navigate = useNavigate();

  const [url] = useState(`localhost:5173${ROUTE_PATH.EDIT}${id}`);

  const handleCopy = () => {
    inputRef.current?.select();
    navigator.clipboard.writeText(url);
    message.success('复制成功');
  };

  const handleToEdit = () => {
    navigate(`${ROUTE_PATH.EDIT}${id}`);
  };

  return (
    <Flex align="center" className={styles['analysis-header']}>
      <Flex align="center" justify="center" gap={10} flex={1}>
        <Input
          className={styles['url']}
          ref={inputRef}
          value={url}
          disabled={true}
        />
        <Tooltip title={'复制链接'}>
          <Button
            className={styles['copy']}
            onClick={handleCopy}
            icon={<CopyFilled />}
          />
        </Tooltip>
        <Popover placement={'bottom'} content={<QRCode value={url} />}>
          <Button className={styles['qr-code']} icon={<QrcodeOutlined />} />
        </Popover>
      </Flex>
      <Button type="primary" onClick={handleToEdit}>
        编辑问卷
      </Button>
    </Flex>
  );
};
