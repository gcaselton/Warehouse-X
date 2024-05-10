/**
 * This component is the form used to audit and distribute returns.
 */
import { Cascader } from 'antd';
import { message } from 'antd'; 
import { outStorageById } from '@/services/ant-design-pro/api'; 
import { ActionType, ModalForm, ProFormTextArea, ProForm, ProFormSelect } from '@ant-design/pro-components'; 
import { FormattedMessage, useIntl, useRequest } from '@umijs/max'; 
import { FC } from 'react'; 

interface DistributeFormProps {
  reload?: ActionType['reload']; // Define props interface with optional reload function
}

const DistributeForm: FC<DistributeFormProps> = (props) => {
  // Warehouse location options for Cascader component
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

  const intl = useIntl();

  const { loading } = useRequest(outStorageById, {
    manual: true, 
    onSuccess: () => {
      // Display success message and reload if reload function is provided
      messageApi.success('Item successfully marked for pickup!');
      reload?.();
    },
    onError: () => {
      // Display error message if distribution fails
      messageApi.error('Distribution failed, please try again');
    },
  });

  // Handle onChange event for Cascader selection
  const onChange = (value: (string | number)[]) => {
    console.log(value); // Log selected value
  };

  // Render DistributeForm component
  return (
    <>
      {contextHolder}
      {/* Form for Audit & distribution */}
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
          console.log("form value", value, value.storeLocation); 
          // Make API request for outStorageById
          let res = await outStorageById(props?.values?.id);
          // Check response code
          if (res.code === 200) {
            // Display success message and reload after 2 seconds
            messageApi.success('outStorage successfully');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            // Display error message if outStorage fails
            messageApi.error('outStorage failed, please try again!');
          }
          return true; // Return true after finishing
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
          })}
        >
          {/* Cascader component for selecting store location */}
          <Cascader options={locationOptions} onChange={onChange} placeholder="Please select" />
        </ProForm.Item>

        {/* ProFormTextArea for order notes with default message signalling ready for pickup*/}
        <ProFormTextArea
          width="md"
          name="desc"
          initialValue={'Ready for pickup!'}
          label={intl.formatMessage({
            id: 'pages.newOrder.notes',
            defaultMessage: 'Notes',
          })}
        />
      </ModalForm>
    </>
  );
};

export default DistributeForm;
