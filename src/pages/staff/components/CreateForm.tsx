import { addStaff } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ModalForm, ProFormText, ProFormTextArea, ProForm } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, message, Switch } from 'antd';
import { FC, useState } from 'react';

interface CreateFormProps {
  reload?: ActionType['reload'];
}

// CreateForm component for adding staff
const CreateForm: FC<CreateFormProps> = (props) => {
  const { reload } = props;
  const [readonly, setReadonly] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const intl = useIntl();

  // UseRequest hook for handling API requests
  const { loading } = useRequest(addStaff, {
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
      {/* ModalForm for adding staff */}
      <ModalForm
        title={intl.formatMessage({
          id: 'add staff',
          defaultMessage: 'Add Staff',
        })}
        trigger={
          <Button type="primary" icon={<PlusOutlined />}>
            <FormattedMessage id="pages.searchTable.new" defaultMessage=" New" />
          </Button>
        }
        width="400px"
        modalProps={{ okButtonProps: { loading } }}
        // Function to handle form submission
        onFinish={async (value) => {
          console.log(value, 'add staff');
          let formData = {
            ...value,
            name: "",
            status: value?.status ? 1 : 0,
            password: "",
            description: "",
          };
          let res = await addStaff({ ...formData });
          console.log('addNewRole', res);
          if (res?.code === 200) {
            messageApi.success('Added successfully');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else if (res?.code === 209) {
            messageApi.error('staff already exists!');
          } else {
            messageApi.error('Adding failed, please try again!');
          }
          return true;
        }}
      >
        {/* ProFormText for entering username */}
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="userName"
                  defaultMessage="Name is required"
                />
              ),
            },
          ]}
          width="md"
          name="username"
          label={intl.formatMessage({
            id: 'userName',
            defaultMessage: 'Name',
          })}
        />
        {/* ProFormText for entering phone number */}
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="phone"
                  defaultMessage="Phone number is required"
                />
              ),
            },
          ]}
          width="md"
          name="phone"
          label={intl.formatMessage({
            id: 'phone',
            defaultMessage: 'Phone Number',
          })}
        />
        {/* ProForm item for role status */}
        <ProForm.Item
          rules={[
            {
              required: false,
              message: <FormattedMessage id="status" />,
            },
          ]}
          width="md"
          name="status"
          label={intl.formatMessage({
            id: 'role status',
            defaultMessage: 'Role Status',
          })}
        >
          {/* Switch component for toggling readonly mode */}
          <Switch
            style={{
              marginBlockEnd: 16,
            }}
            checked={readonly}
            checkedChildren="on"
            unCheckedChildren="off"
            onChange={setReadonly}
          />
        </ProForm.Item>
        {/* ProFormTextArea for entering notes */}
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
