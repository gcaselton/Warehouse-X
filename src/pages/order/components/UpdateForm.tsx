import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload,Cascader } from 'antd';
import type { GetProp, UploadFile, UploadProp } from 'antd';
import { message, Modal,Button } from 'antd';
import { updateProduct } from '@/services/ant-design-pro/api';
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
   // storeLocation
   const options: Option[] = [
    {
      value: 'Warehouse return',
      label: 'Warehouse return',
      children: [
        {
          value: 'section A',
          label: 'section A',
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
          value: 'section B',
          label: 'section B',
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
      ],
    },
    {
      value: 'Warehouse repair',
      label: 'Warehouse repair',
      children: [
        {
          value: 'section A',
          label: 'section A',
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
          value: 'section B',
          label: 'section B',
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
      ],
    },
    {
      value: 'Warehouse recycle',
      label: 'Warehouse recycle',
      children: [
        {
          value: 'section A',
          label: 'section A',
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
          value: 'section B',
          label: 'section B',
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
      ],
    },
  ];
  const onChange = (value: (string | number)[]) => {
    console.log(value);
  };
const CreateForm: FC<CreateFormProps> = (props) => {
  console.log({props});
  const [previewOpen, setPreviewOpen] = useState(true);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
   
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: props.values?.sliderUrls,
    },
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

  const { run, loading } = useRequest(updateProduct, {
    manual: true,
    onSuccess: () => {
      messageApi.success('updated successfully');
      reload?.();
    },
    onError: () => {
      messageApi.error('updated failed, please try again!');
    },
  });

  return (
    <>
      {contextHolder}
      <ModalForm
        initialValues={props.values}
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.updateRule',
          defaultMessage: 'New rule',
        })}
        trigger={
          <a style={{display: props.values?.currentUserRoleId <= 2 ? 'inline' : 'none'}}>
            <FormattedMessage id="pages.searchTable.update" defaultMessage="update" />
          </a>
        }
        layout="horizontal"
        {...formItemLayout}
        width="800px"
        modalProps={{ okButtonProps: { loading } }}
        onFinish={async (value) => {
          let formData = {
            id:props.values?.id,
            name:value?.name,
            sliderUrls:value?.image?.file?.response?.data || "",
            categoryId:Number(value?.categoryId),
            orderId:Number(value?.orderId),
            storeLocation:`${value?.storeLocation[0]}-${value?.storeLocation[1]}-${value?.storeLocation[2]}`,
            status:1
          }
          let res = await updateProduct(formData);
          console.log(res,"updated-----")
          if(res?.code === 200){
            messageApi.success('Updated successfully');
            setTimeout(() =>{
              window.location.reload()
            },2000)
          }  else {
            messageApi.error('Updated failed, please try again!');
          }
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
                  id="pages.newOrder.orderId.required"
                  defaultMessage="orderId is required"
                />
              ),
            },
          ]}
          width="md"
          name="orderId"
          label={intl.formatMessage({
            id: 'pages.newOrder.orderId',
            defaultMessage: 'orderId',
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
                value: 1,
                label: 'refund',
              },
              {
                value: 2,
                label: 'repair',
              },
              {
                value: 3,
                label: 'recycle',
              },
            ]}
            label="returnType"
            name="categoryId"
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
                {/* {fileList.length >= 8 ? null : uploadButton} */}
              </Upload>
            </ProForm.Item>
          
      {previewImage && (
        <Image
          //wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={props.values?.sliderUrls}
        />
      )}
        <ProForm.Item 
        rules={[
          {
               required: true,
               message: (
                 <FormattedMessage
                   id="storeLocation"
                   defaultMessage="storeLocation is required"
                 />
               ),
          },
        ]}
           width="md"
           name="storeLocation"
           label={intl.formatMessage({
             id: 'storeLocation',
             defaultMessage: 'storeLocation',
           })}>
            <Cascader options={options} onChange={onChange} placeholder="Please select" />
        </ProForm.Item>
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
