import { themeConfig } from '@/assets/themes';
import { CircleButton } from '@/components/CircleButton';
import { HBIcon } from '@/components/HBIcon';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import { WidgetInfo, getBaseTypeIconKey } from '@/widgets';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined
} from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Flex, Input, InputProps, InputRef, List, Space } from 'antd';
import cs from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useGetQuestionDetail } from '@/hooks/question';

interface LayerItemProps {
  info: WidgetInfo;
}

export const LayerItem: React.FC<LayerItemProps> = (props) => {
  const { info } = props;
  const { fe_id, baseType, title, isHidden, isLocked } = info;

  const {
    toggleWidgetLock,
    toggleWidgetVisiable,
    modifyWidgetTitle,
    setSelectedId
  } = questionSlice.actions;
  const { selectedId } = useGetQuestionDetail();
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<InputRef>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
    isDragging
  } = useSortable({
    id: `layer-${fe_id}`,
    data: { id: fe_id, type: 'layer', info },
    animateLayoutChanges: () => false
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleHide = () => {
    dispatch(toggleWidgetVisiable({ id: fe_id, isHidden: !isHidden }));
  };

  const handleLock = () => {
    dispatch(toggleWidgetLock({ id: fe_id }));
  };

  const handleTextClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus({ cursor: 'end' });
    }
  });

  const handleTitleChange: InputProps['onChange'] = (e) => {
    const newTitle = e.target.value.trim();
    setNewTitle(newTitle);
  };

  const onBlur = () => {
    setIsEditing(false);
    if (newTitle) {
      dispatch(modifyWidgetTitle({ id: fe_id, title: newTitle }));
    }
  };

  const handleTitleClick = () => {
    dispatch(setSelectedId(fe_id));
  };

  return (
    <List.Item
      className={cs(styles['layer-item'], { ['active']: selectedId === fe_id })}
      style={style}
      ref={setNodeRef}
      {...attributes}
    >
      <Flex style={{ width: '100%' }} justify="space-between" align="center">
        <Flex align="center" gap={4}>
          <div
            className={cs(styles['drag-handle'], { ['dragging']: isDragging })}
            ref={setActivatorNodeRef}
            {...listeners}
          >
            <HBIcon iconKey={'drag-handle'} size={16} />
          </div>
          <HBIcon iconKey={getBaseTypeIconKey(baseType)} size={16} />
          <div
            style={{ display: 'inline-block', width: '170px' }}
            onClick={handleTitleClick}
            onDoubleClick={handleTextClick}
          >
            {isEditing ? (
              <Input
                ref={inputRef}
                size="small"
                value={newTitle}
                onChange={handleTitleChange}
                onBlur={onBlur}
              />
            ) : (
              <span style={{ display: isEditing ? 'none' : 'inline-block' }}>
                {title}
              </span>
            )}
          </div>
        </Flex>
        <Space style={{ marginLeft: 10 }}>
          <CircleButton
            title={isHidden ? '显示' : '隐藏'}
            icon={
              isHidden ? (
                <EyeInvisibleOutlined />
              ) : (
                <EyeOutlined
                  style={{ color: themeConfig.token!.colorPrimary }}
                />
              )
            }
            onClick={handleHide}
            size={'small'}
          />
          <CircleButton
            title={isLocked ? '解锁' : '锁定'}
            type={isLocked ? 'primary' : 'default'}
            size={'small'}
            icon={isLocked ? <LockOutlined /> : <UnlockOutlined />}
            onClick={handleLock}
          />
        </Space>
      </Flex>
    </List.Item>
  );
};
