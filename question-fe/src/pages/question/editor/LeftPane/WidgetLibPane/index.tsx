/*
 * @Author       : 魏威
 * @Date         : 2024-03-08 13:41
 * @LastEditTime : 2024-03-13 15:19
 * @LastEditors  : Waker
 * @Description  :
 */
import { HBCollapse } from '@/components/HBCollapse';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import { WidgetConfig, getLibConfigByName, widgetLibGroup } from '@/widgets';
import { Col, CollapseProps, Row } from 'antd';
import React from 'react';
import styles from './index.module.scss';
import { nanoid } from 'nanoid';
import { HBIcon } from '@/components/HBIcon';

interface Props {}

export const WidgetLibPane: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { addWidget } = questionSlice.actions;

  const handleAdd = (config: WidgetConfig) => {
    const compConfig = getLibConfigByName(config.name);
    if (compConfig) {
      const { defaultProps, baseType, name } = compConfig;
      dispatch(
        addWidget({
          fe_id: nanoid(18),
          title: name,
          isHidden: false,
          isLocked: false,
          baseType,
          props: defaultProps
        })
      );
    }
  };

  const items: CollapseProps['items'] = widgetLibGroup.map((group) => ({
    key: group.key,
    label: group.title,
    children: (
      <Row gutter={6} style={{ marginTop: 8, rowGap: 6 }}>
        {group.components.map((comp) => {
          return (
            <Col span={12} key={comp.name}>
              <div
                className={styles['widget-item']}
                onDoubleClick={() => handleAdd(comp)}
              >
                <HBIcon
                  iconKey={comp.iconKey}
                  size={24}
                  style={{ margin: 8 }}
                />
                <div className={styles['title']}>{comp.name}</div>
              </div>
            </Col>
          );
        })}
      </Row>
    )
  }));

  return (
    <HBCollapse
      bordered={false}
      style={{ background: 'transparent' }}
      size="small"
      items={items}
    />
  );
};
