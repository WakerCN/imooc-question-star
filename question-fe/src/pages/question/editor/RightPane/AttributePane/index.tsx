/*
 * @Author       : 魏威
 * @Date         : 2024-03-11 14:23
 * @LastEditTime : 2024-03-11 18:00
 * @LastEditors  : Waker
 * @Description  : 属性面板
 */
import { useGetQuestionDetail } from '@/hooks/question';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import { getConfigByBaseType } from '@/widgets';
import { Result } from 'antd';
import React from 'react';
import styles from './index.module.scss';

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
          <div className={styles['header']}>
            {selectComponent.fe_id} -- {selectComponent.baseType} --
            {selectComponent.title}
          </div>
          <div>{genAttributeForm()}</div>
        </div>
      ) : (
        <Result title={'请先选中一个组件'} />
      )}
    </div>
  );
};
