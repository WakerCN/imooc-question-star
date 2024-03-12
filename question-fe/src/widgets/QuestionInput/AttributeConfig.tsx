/*
 * @Author       : 魏威
 * @Date         : 2024-03-11 16:48
 * @LastEditTime : 2024-03-12 14:54
 * @LastEditors  : Waker
 * @Description  : input属性配置
 */
import { Form, FormProps, Input } from 'antd';
import { useEffect } from 'react';
import { WidgetConfig } from '..';

export const AttributeConfig: WidgetConfig['AttributeConfig'] = (props) => {
  const { value, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onValuesChange: FormProps['onValuesChange'] = (_, allValues) => {
    onChange?.(allValues);
  };

  return (
    <Form
      form={form}
      disabled={disabled}
      size={'small'}
      labelAlign="left"
      labelCol={{ span: 6 }}
      onValuesChange={onValuesChange}
    >
      <Form.Item name={'title'} label="标题">
        <Input />
      </Form.Item>
      <Form.Item name={'placeholder'} label="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};
