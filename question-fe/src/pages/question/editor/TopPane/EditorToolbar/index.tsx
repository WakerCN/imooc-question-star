import { CircleButton } from '@/components/CircleButton';
import { useGetQuestionDetail } from '@/hooks/question';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import {
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  SnippetsOutlined,
  UndoOutlined,
  UnlockOutlined
} from '@ant-design/icons';
import { Divider, Flex } from 'antd';
import React from 'react';
import { ActionCreators } from 'redux-undo';
import styles from './index.module.scss';

interface Props {}

export const EditorToolBar: React.FC<Props> = () => {
  const { future, past, selectedId, selectComponent, copiedWidget } =
    useGetQuestionDetail();
  const dispatch = useAppDispatch();
  const {
    deleteWidget,
    toggleWidgetVisiable,
    toggleWidgetLock,
    copyWidget,
    pasteWidget
  } = questionSlice.actions;

  const handleDelete = () => {
    dispatch(deleteWidget(selectedId as string));
  };

  const handleHide = () => {
    dispatch(
      toggleWidgetVisiable({ id: selectedId as string, isHidden: true })
    );
  };

  const handleLock = () => {
    dispatch(toggleWidgetLock({ id: selectedId as string }));
  };

  const handleCopy = () => {
    dispatch(copyWidget());
  };

  const handlePaste = () => {
    dispatch(pasteWidget());
  };

  const handleUndo = () => {
    dispatch(ActionCreators.undo());
  };

  const handleRedo = () => {
    dispatch(ActionCreators.redo());
  };

  return (
    <Flex
      className={styles['tools-area']}
      justify={'center'}
      align={'center'}
      gap={10}
    >
      <CircleButton
        title="删除"
        icon={<DeleteOutlined />}
        disabled={!selectedId}
        onClick={handleDelete}
      />
      <CircleButton
        title="隐藏"
        icon={<EyeInvisibleOutlined />}
        disabled={!selectedId}
        onClick={handleHide}
      />
      <CircleButton
        title={selectComponent?.isLocked ? '解锁' : '锁定'}
        type={selectComponent?.isLocked ? 'primary' : 'default'}
        icon={selectComponent?.isLocked ? <LockOutlined /> : <UnlockOutlined />}
        disabled={!selectedId}
        onClick={handleLock}
      />
      <Divider className={styles['divider']} type="vertical" />
      <CircleButton
        title="复制"
        icon={<CopyOutlined />}
        disabled={!selectedId}
        onClick={handleCopy}
      />
      <CircleButton
        title="粘贴"
        icon={<SnippetsOutlined />}
        disabled={!copiedWidget}
        onClick={handlePaste}
      />
      <Divider className={styles['divider']} type="vertical" />
      <CircleButton
        title="撤销"
        icon={<UndoOutlined />}
        onClick={handleUndo}
        disabled={past.length === 0}
      />
      <CircleButton
        title="重做"
        icon={<RedoOutlined />}
        onClick={handleRedo}
        disabled={future.length === 0}
      />
    </Flex>
  );
};
