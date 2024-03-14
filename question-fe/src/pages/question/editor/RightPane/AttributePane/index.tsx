/*
 * @Author       : 魏威
 * @Date         : 2024-03-11 14:23
 * @LastEditTime : 2024-03-13 17:00
 * @LastEditors  : Waker
 * @Description  : 属性面板
 */
import { useGetQuestionDetail } from '@/hooks/question';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import { getConfigByBaseType } from '@/widgets';
import { Empty, Flex, Typography } from 'antd';
import React from 'react';
import styles from './index.module.scss';
import { HBIcon } from '@/components/HBIcon';

interface AttributePaneProps {}

export const AttributePane: React.FC<AttributePaneProps> = () => {
  const { selectComponent } = useGetQuestionDetail();

  const { updateProps } = questionSlice.actions;
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormChange = (value: any, id: string) => {
    dispatch(updateProps({ id, props: value }));
  };

  const genAttributeForm = () => {
    if (!selectComponent) {
      return;
    } else {
      const config = getConfigByBaseType(selectComponent.baseType);
      if (!config) return;
      const { AttributeConfig } = config;
      return (
        <AttributeConfig
          disabled={selectComponent.isLocked}
          value={selectComponent.props}
          onChange={(value) => handleFormChange(value, selectComponent.fe_id)}
        />
      );
    }
  };

  return (
    <div className={styles['attr-pane']}>
      {selectComponent ? (
        <div>
          <div className={styles['info-card']}>
            <HBIcon
              iconKey={selectComponent.baseType}
              size={24}
              style={{ marginRight: 10 }}
            />
            <Flex justify="space-between" style={{ width: 356 }}>
              <Typography.Text>{selectComponent.title}</Typography.Text>
              <Typography.Text>
                {'ID: '}
                <Typography.Text type="secondary" copyable>
                  {selectComponent.fe_id}
                </Typography.Text>
              </Typography.Text>
            </Flex>
          </div>
          <div>{genAttributeForm()}</div>
        </div>
      ) : (
        <Empty
          style={{
            height: '100%',
            width: '100%',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          description={'请先选中一个组件'}
        />
      )}
    </div>
  );
};
