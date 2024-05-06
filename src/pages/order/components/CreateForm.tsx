import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload,Cascader } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { message, Modal,Button } from 'antd';
import { addProduct } from '@/services/ant-design-pro/api';
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
  const headers = {
    token:localStorage.getItem('TOKEN_STRING')
  }
 
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
   
  setFileList(newFileList);
    console.log({fileList});

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const { reload } = props;

  interface Option {
    value: string | number;
    label: string;
    children?: Option[];
  }
  
  // storeLocation
  const options: Option[] = [
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
  
  const onChange = (value: (string | number)[]) => {
    console.log(value);
  };
  
  
  

  const [messageApi, contextHolder] = message.useMessage();
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const { run, loading } = useRequest(addProduct, {
    manual: true,
    onSuccess: () => {
      messageApi.success('Return added successfully!');
      reload?.();
    },
    onError: () => {
      messageApi.error('Adding failed, please try again');
    },
  });

  return (
    <>
      {contextHolder}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New Return',
        })}
        trigger={
          <Button type="primary" icon={<PlusOutlined />}>
            <FormattedMessage id="New Return" defaultMessage=" New Return" />
          </Button>
        }
        layout="horizontal"
        {...formItemLayout}
        width="800px"
        modalProps={{ okButtonProps: { loading } }}
        onFinish={async (value) => {
          console.log("form value",value,value.storeLocation)
          // image url
          // value?.sliderUrls = fileList
          let formData = {
            name:value?.name,
            sliderUrls:value?.image?.file?.response?.data || "",
            categoryId:Number(value?.categoryId),
            serialId:Number(value?.serialId),
            storeLocation:`${value?.storeLocation[0]}-${value?.storeLocation[1]}-${value?.storeLocation[2]}`,
            status:1,
            postcode:value?.postcode
          }
          await run(formData);

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
                  defaultMessage="Product name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
          label={intl.formatMessage({
            id: 'pages.newOrder.productName',
            defaultMessage: 'Product Name',
          })}
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.newOrder.serialId.required"
                  defaultMessage="Serial Number is required"
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
                    id="pages.newOrder.orderType.required"
                    defaultMessage="Return Type is required"
                  />
                ),
              },
            ]}
            options={[
              {
                value: '1',
                label: 'Refund',
              },
              {
                value: '2',
                label: 'Repair',
              },
              {
                value: '3',
                label: 'Recycle',
              },
            ]}
            label="Return Type"
            name="categoryId"
          />
            <ProForm.Item 
            width="md"
            name="image"
            label={intl.formatMessage({
              id: 'pages.newOrder.image',
              defaultMessage: 'image',
            })}>
              
              {/* <Upload {...uploadProps}>
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
              </Upload> */}
                  
              <Upload
                  action="http://117.72.14.250:8501/admin/system/fileUpload"
                  headers={headers}
                  multiple={false}
                  listType="picture-circle"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                {fileList.length >= 1 ? null : uploadButton}
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
      <ProForm.Item 
           width="md"
           name="storeLocation"
           label={intl.formatMessage({
             id: 'storeLocation',
             defaultMessage: 'Warehouse Location',
           })}>
            <Cascader options={options} onChange={onChange} placeholder="Please select" />
        </ProForm.Item>
        
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.newOrder.postcode.required"
                  defaultMessage="Postcode is required"
                />
              ),
            },
          ]}
          width="md"
          name="postcode"
          label={intl.formatMessage({
            id: 'pages.newOrder.postcode',
            defaultMessage: 'Customer postcode',
          })}
        />
     
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
