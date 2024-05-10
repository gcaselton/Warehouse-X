/**
 * This component is the form used to create a new return
 */
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { message,Button } from 'antd';
import { addProduct } from '@/services/ant-design-pro/api';
import { ActionType, ModalForm, ProFormText, ProFormTextArea,  ProFormRadio,ProForm } from '@ant-design/pro-components';

import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { FC } from 'react';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface CreateFormProps {
  reload?: ActionType['reload'];
}

/**
 * Creates a base64 representation of a file.
 * @param file FileType
 * @returns Promise<string>
 */
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

/**
 * CreateForm component for adding new products.
 */
const CreateForm: FC<CreateFormProps> = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const headers = {
    token:localStorage.getItem('TOKEN_STRING')
  };

  /**
   * Handles preview of the uploaded file.
   * @param file UploadFile
   */
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  /**
   * Handles change in file upload.
   * @param newFileList UploadFile[]
   */
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

  const intl = useIntl();

  const { loading } = useRequest(addProduct, {
    manual: true,
    onSuccess: () => {
      messageApi.success('Return added successfully!');
      reload?.();
    },
    onError: () => {
      messageApi.error('Adding failed, please try again');
    },
  });

  // render the form
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
         
          let formData = {
            name:value?.name,
            sliderUrls:value?.image?.file?.response?.data || "",
            categoryId:Number(value?.categoryId),
            serialId:Number(value?.serialId),
            status:1,
            postcode:value?.postcode
          };
          let res = await addProduct(formData);
          if(res?.code === 200){
            messageApi.success('Added successfully');
            setTimeout(() =>{
              window.location.reload();
            },2000);
          }  else {
            messageApi.error('Added failed, please try again!');
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
            defaultMessage: 'Postcode',
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
