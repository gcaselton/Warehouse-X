import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload,Cascader,Select } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { message, Modal,Button } from 'antd';
import { outStorageById } from '@/services/ant-design-pro/api';
import { ActionType, ModalForm, ProFormText, ProFormTextArea,  ProFormRadio,ProForm,ProFormSelect } from '@ant-design/pro-components';

import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { FC } from 'react';
import options from './CreateForm'
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
interface DistributeFormProps {
  reload?: ActionType['reload'];
}

const DistributeForm: FC<DistributeFormProps> = (props) => {
  console.log("distribute form",props)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
   
  
  ]);
  const headers = {
    token:localStorage.getItem('TOKEN_STRING')
  }

  const locationOptions: Option[] = [
    {
      value: 'Refunds',
      label: 'Refunds',
      children: [
        {
          value: 'Section A',
          label: 'Section A',
          children: [
            {
              value: 'A10',
              label: 'A10',
            },
            {
              value: 'A20',
              label: 'A20',
            },
            {
              value: 'A30',
              label: 'A30',
            },
          ],
        },
        {
          value: 'Section B',
          label: 'Section B',
          children: [
            {
              value: 'B10',
              label: 'B10',
            },
            {
              value: 'B20',
              label: 'B20',
            },
            {
              value: 'B30',
              label: 'B30',
            },
          ],
        },
        {
          value: 'Section C',
          label: 'Section C',
          children: [
            {
              value: 'C10',
              label: 'C10',
            },
            {
              value: 'C20',
              label: 'C20',
            },
            {
              value: 'C30',
              label: 'C30',
            },
          ],
        },
      ],
    },
    {
      value: 'Repairs',
      label: 'Repairs',
      children: [
        {
          value: 'Section A',
          label: 'Section A',
          children: [
            {
              value: 'A10',
              label: 'A10',
            },
            {
              value: 'A20',
              label: 'A20',
            },
            {
              value: 'A30',
              label: 'A30',
            },
          ],
        },
        {
          value: 'Section B',
          label: 'Section B',
          children: [
            {
              value: 'B10',
              label: 'B10',
            },
            {
              value: 'B20',
              label: 'B20',
            },
            {
              value: 'B30',
              label: 'B30',
            },
          ],
        },
        {
          value: 'Section C',
          label: 'Section C',
          children: [
            {
              value: 'C10',
              label: 'C10',
            },
            {
              value: 'C20',
              label: 'C20',
            },
            {
              value: 'C30',
              label: 'C30',
            },
          ],
        },
      ],
    },
    {
      value: 'Recycling',
      label: 'Recycling',
      children: [
        {
          value: 'Section A',
          label: 'Section A',
          children: [
            {
              value: 'A10',
              label: 'A10',
            },
            {
              value: 'A20',
              label: 'A20',
            },
            {
              value: 'A30',
              label: 'A30',
            },
          ],
        },
        {
          value: 'Section B',
          label: 'Section B',
          children: [
            {
              value: 'B10',
              label: 'B10',
            },
            {
              value: 'B20',
              label: 'B20',
            },
            {
              value: 'B30',
              label: 'B30',
            },
          ],
        },
        {
          value: 'Section C',
          label: 'Section C',
          children: [
            {
              value: 'C10',
              label: 'C10',
            },
            {
              value: 'C20',
              label: 'C20',
            },
            {
              value: 'C30',
              label: 'C30',
            },
          ],
        },
      ],
    },
  ];

  const { reload } = props;

  const [messageApi, contextHolder] = message.useMessage();
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const { run, loading } = useRequest(outStorageById, {
    manual: true,
    onSuccess: () => {
      messageApi.success('Item successfully marked for pickup!');
      reload?.();
    },
    onError: () => {
      messageApi.error('Distribution failed, please try again');
    },
  });

  const onChange = (value: (string | number)[]) => {
    console.log(value);
  };

  return (
    <>
      {contextHolder}
      <ModalForm
        initialValues={props.values}
        title={intl.formatMessage({
          id: 'Distribute',
          defaultMessage: 'Distribute',
        })}
        trigger={
          <a type="primary">
            <FormattedMessage id="Distribute" defaultMessage="Distribute" />
          </a>
        }
        layout="horizontal"
        {...formItemLayout}
        width="800px"
        modalProps={{ okButtonProps: { loading } }}
        onFinish={async (value) => {
          console.log("form value",value,value.storeLocation)
          let res = await outStorageById(props?.values?.id);
          if(res.code === 200){
            messageApi.success('outStorage successfully');  
            setTimeout(() =>{
              window.location.reload()
            },2000)
          } else {
            messageApi.error('outStorage failed, please try again!');
          }
          return true;
        }}
      >

      
        <ProFormSelect
            name="auditResult"
            label="Audit Status"
            valueEnum={{
              authorised: 'Authorised',
              denied: 'Denied',
            }}
            placeholder="In Process"
            rules={[{ required: false, message: 'In Process' }]}
          />

        <ProForm.Item 
           width="md"
           name="storeLocation"
           label={intl.formatMessage({
             id: 'address',
             defaultMessage: 'Warehouse Location',
           })}>
            <Cascader options={locationOptions} onChange={onChange} placeholder="Please select" />
        </ProForm.Item>
         
        <ProFormTextArea 
          width="md" 
          name="desc"
          initialValue={'Ready for pickup!'}
          label={intl.formatMessage({
            id: 'pages.newOrder.notes',
            defaultMessage: 'Notes',
          })} />
      </ModalForm>
    </>
  );
};

export default DistributeForm;
