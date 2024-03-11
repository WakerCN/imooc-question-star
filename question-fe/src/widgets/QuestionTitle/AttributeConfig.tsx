import { Checkbox, Form, FormProps, Input, Select } from 'antd';
import { useEffect } from 'react';
import { WidgetConfig } from '..';

export const AttributeConfig: WidgetConfig['AttributeConfig'] = (props) => {
  const { value, onChange } = props;
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
      labelAlign="left"
      labelCol={{ span: 6 }}
      size={'small'}
      onValuesChange={onValuesChange}
    >
      <Form.Item name={'title'} label="标题">
        <Input />
      </Form.Item>
      <Form.Item name={'level'} label="级别">
        <Select
          style={{ width: 70 }}
          options={[
            { label: '一级', value: 1 },
            { label: '二级', value: 2 },
            { label: '三级', value: 3 }
          ]}
        />
      </Form.Item>
      <Form.Item name={'alignCenter'} valuePropName="checked">
        <Checkbox style={{ marginRight: 10 }}>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};
