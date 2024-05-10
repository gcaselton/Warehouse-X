/**
 * This component is the form used to edit information about an already created return.
 */
import React, { useState } from 'react';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile } from 'antd';
import { message } from 'antd';
import { updateProduct } from '@/services/ant-design-pro/api';
import { ActionType, ModalForm, ProFormText, ProFormTextArea, ProFormRadio, ProForm } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { FC } from 'react';

// Define types for file and props
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
interface CreateFormProps {
  reload?: ActionType['reload'];
}

// Function to convert file to base64
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// Main component definition
const CreateForm: FC<CreateFormProps> = (props) => {
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

  // Function to handle preview of uploaded file
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // Function to handle file change
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const { reload } = props; 

  const [messageApi, contextHolder] = message.useMessage(); 
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } }; 
  const intl = useIntl(); 

  // Use request hook for updateProduct API
  const { loading } = useRequest(updateProduct, {
    manual: true, // Manually trigger the request
    onSuccess: () => {
      messageApi.success('updated successfully'); // Display success message
      reload?.();
    },
    onError: () => {
      messageApi.error('updated failed, please try again!'); // Display error message
    },
  });

  // Render the form component
  return (
    <>
      {contextHolder} {/* Render message context holder */}
      {/* Modal form for updating product */}
      <ModalForm
        initialValues={props.values}
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.updateRule',
          defaultMessage: 'New rule',
        })} 
        trigger={
          <a style={{ display: props.values?.currentUserRoleId <= 2 ? 'inline' : 'none' }}>
            <FormattedMessage id="pages.searchTable.update" defaultMessage="update" />
          </a>
        } // Trigger element for modal
        layout="horizontal" 
        {...formItemLayout} 
        width="800px" 
        modalProps={{ okButtonProps: { loading } }} 
        onFinish={async (value) => {
          // Prepare form data for update
          let formData = {
            id: props.values?.id,
            name: value?.name,
            sliderUrls: value?.image?.file?.response?.data || '',
            categoryId: Number(value?.categoryId),
            serialId: Number(value?.serialId),
            storeLocation: `${value?.storeLocation[0]}-${value?.storeLocation[1]}-${value?.storeLocation[2]}`,
            status: 1,
          };
          // Make API request to update product
          let res = await updateProduct(formData);
          console.log(res, 'updated-----');
          // Check response code
          if (res?.code === 200) {
            // Display success message and reload after 2 seconds
            messageApi.success('Updated successfully');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            // Display error message if update fails
            messageApi.error('Updated failed, please try again!');
          }
          return true; 
        }}
      >
        {/* ProFormText for product name */}
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
            defaultMessage: 'Product Name',
          })}
        />

        {/* ProFormText for serial number */}
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.newOrder.orderId.required"
                  defaultMessage="Serial Number is required"
                />
              ),
            },
          ]}
          width="md"
          name="serialId"
          label={intl.formatMessage({
            id: 'pages.newOrder.orderId',
            defaultMessage: 'Serial Number',
          })}
        />

        {/* ProFormRadio for return type */}
        <ProFormRadio.Group
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
          options={[
            {
              value: 1,
              label: 'Refund',
            },
            {
              value: 2,
              label: 'Repair',
            },
            {
              value: 3,
              label: 'Recycle',
            },
          ]}
          label="Return Type"
          name="categoryId"
        />

        {/* ProForm.Item for image upload */}
        <ProForm.Item
          rules={[
            {
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
            defaultMessage: 'Image (optional)',
          })}
        >
          {/* Upload component for image */}
          <Upload
            action="http://117.72.14.250:8501/admin/system/fileUpload"
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
          </Upload>
        </ProForm.Item>

        {/* Display preview image if available */}
        {previewImage && (
          <Image
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={props.values?.sliderUrls}
          />
        )}

        {/* ProFormTextArea for notes */}
        <ProFormTextArea
          width="md"
          name="desc"
          label={intl.formatMessage({
            id: 'pages.newOrder.notes',
            defaultMessage: 'Notes',
          })}
        />
      </ModalForm>
    </>
  );
};

export default CreateForm;
