/*
 * @Author       : 魏威
 * @Date         : 2024-03-11 16:48
 * @LastEditTime : 2024-03-15 09:58
 * @LastEditors  : Waker
 * @Description  : input属性配置
 */
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, FormProps, Input, Select, Space } from 'antd';
import { OptionProps } from 'antd/es/select';
import _ from 'lodash';
import { useEffect } from 'react';
import { WidgetConfig } from '..';

export const AttributeConfig: WidgetConfig['AttributeConfig'] = (props) => {
  const { value, onChange, disabled } = props;
  const [form] = Form.useForm();
  const defaultValue = Form.useWatch(['defaultValue'], form);
  const list = Form.useWatch(['list'], form);

  useEffect(() => {
    form.setFieldsValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onValuesChange: FormProps['onValuesChange'] = (_, allValues) => {
    /** 由于表单onChange事件只改了label属性，这里对option的value补齐 */
    const resultValues = {
      ...allValues,
      list: allValues.list.map((i: { label: string }) => ({
        ...i,
        value: i.label
      }))
    };
    onChange?.(resultValues);
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
      <Form.Item label="标题" name={'title'}>
        <Input />
      </Form.Item>
      <Form.Item label={'选项'}>
        <Form.List name={'list'}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restFields }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    name={[name, 'label']}
                    {...restFields}
                    rules={[
                      { required: true, message: '选项必须有值' },
                      {
                        validator: () => {
                          const arr = list.map((i: OptionProps) => i.label);
                          const uniqArr = _.uniq(arr);
                          if (arr.length !== uniqArr.length) {
                            return Promise.reject(new Error('选项不能重复'));
                          } else {
                            return Promise.resolve();
                          }
                        }
                      }
                    ]}
                  >
                    <Input placeholder="请输入选项" />
                  </Form.Item>
                  {index > 1 && (
                    <MinusCircleOutlined
                      onClick={() => {
                        if (list[name].value === defaultValue) {
                          form.setFieldsValue({ defaultValue: null });
                        }
                        remove(name);
                      }}
                    />
                  )}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() =>
                    add({
                      label: `选项${fields.length + 1}`,
                      value: ''
                    })
                  }
                  block
                  icon={<PlusOutlined />}
                >
                  新增选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label={'默认选中'} name={'defaultValue'}>
        <Select
          options={form.getFieldValue('list')}
          style={{ width: 192 }}
          allowClear
        />
      </Form.Item>
      <Form.Item name={'isVertical'} valuePropName="checked">
        <Checkbox>是否垂直布局</Checkbox>
      </Form.Item>
    </Form>
  );
};
