/*
 * @Author       : 魏威
 * @Date         : 2024-03-13 15:51
 * @LastEditTime : 2024-03-13 16:28
 * @LastEditors  : Waker
 * @Description  :
 */
import { Checkbox, Form, FormProps, Input } from 'antd';
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
      <Form.Item
        name={'text'}
        label="段落内容"
        rules={[{ required: true, message: '段落内容不能为空' }]}
      >
        <Input.TextArea rows={5} placeholder="请输入段落内容" />
      </Form.Item>
      <Form.Item name={'isCenter'} valuePropName="checked">
        <Checkbox>是否居中</Checkbox>
      </Form.Item>
    </Form>
  );
};
