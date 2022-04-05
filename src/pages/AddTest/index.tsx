import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Form } from '@formily/antd';
import InputNumber from './DInputNumber';
import { Input } from 'antd';
import { useRef } from 'react';
import { useEffect } from 'react';

const SchemaField = createSchemaField({
  components: {
    InputNumber,
    Input,
  },
});

const form = createForm();

export default () => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [ref]);
  return (
    <>
      <Form form={form}>
        <SchemaField>
          <SchemaField.Number
            name="password"
            title="密码"
            required
            x-component="InputNumber"
            x-component-props={{
              stepControlOnly: true,
              defaultValue: 0,
            }}
          />
        </SchemaField>
      </Form>
      <InputNumber ref={ref} />
      <InputNumber />
    </>
  );
};
