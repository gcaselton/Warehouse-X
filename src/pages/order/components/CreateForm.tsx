import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { message, Modal,Button } from 'antd';
import { addRule } from '@/services/ant-design-pro/api';
import { ActionType, ModalForm, ProFormText, ProFormTextArea,  ProFormRadio,ProForm } from '@ant-design/pro-components';

import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { FC } from 'react';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
interface CreateFormProps {
  reload?: ActionType['reload'];
}
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const CreateForm: FC<CreateFormProps> = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
   
  
  ]);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const { reload } = props;

  const [messageApi, contextHolder] = message.useMessage();
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const { run, loading } = useRequest(addRule, {
    manual: true,
    onSuccess: () => {
      messageApi.success('Added successfully');
      reload?.();
    },
    onError: () => {
      messageApi.error('Adding failed, please try again!');
    },
  });

  return (
    <>
      {contextHolder}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        trigger={
          <Button type="primary" icon={<PlusOutlined />}>
            <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>
        }
        layout="horizontal"
        {...formItemLayout}
        width="800px"
        modalProps={{ okButtonProps: { loading } }}
        onFinish={async (value) => {
          await run({ data: value as API.RuleListItem });

          return true;
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.newOrder.productName.required"
                  defaultMessage="product name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
          label={intl.formatMessage({
            id: 'pages.newOrder.productName',
            defaultMessage: 'productName',
          })}
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.newOrder.serialId.required"
                  defaultMessage="serialId is required"
                />
              ),
            },
          ]}
          width="md"
          name="serialId"
          label={intl.formatMessage({
            id: 'pages.newOrder.serialId',
            defaultMessage: 'serialId',
          })}
        />
        <ProFormRadio.Group
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.newOrder.serialId.required"
                    defaultMessage="serialId is required"
                  />
                ),
              },
            ]}
            options={[
              {
                value: '1',
                label: 'refund',
              },
              {
                value: '2',
                label: 'repair',
              },
              {
                value: '3',
                label: 'recycle',
              },
            ]}
            label="returnType"
            name="publicType"
          />
            <ProForm.Item 
            
             rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.newOrder.image.required"
                    defaultMessage="image is required"
                  />
                ),
              },
            ]}
            width="md"
            name="name"
            label={intl.formatMessage({
              id: 'pages.newOrder.image',
              defaultMessage: 'image',
            })}>
              <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-circle"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </ProForm.Item>
          
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
        <ProFormTextArea 
          width="md" 
          name="desc"
          label={intl.formatMessage({
            id: 'pages.newOrder.notes',
            defaultMessage: 'notes',
          })} />
      </ModalForm>
    </>
  );
};

export default CreateForm;
