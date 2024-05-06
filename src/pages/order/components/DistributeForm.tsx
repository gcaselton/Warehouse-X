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
          await run(props?.values?.id);
          return true;
        }}
      >
     
        <ProForm.Item 
           width="md"
           name="categoryId"
           label={intl.formatMessage({
             id: 'address',
             defaultMessage: 'Warehouse Location',
           })}>
            <Select
                defaultValue={2}
                style={{ width: 328 }}
                disabled
                options={[
                    { value: 1, label: 'Dyson return center' },
                    { value: 2, label: 'Dyson repair center' },
                    { value: 3, label: 'Dyson recycle center' },
                ]}
            />
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
