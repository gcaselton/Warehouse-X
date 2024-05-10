import { assignRole } from '@/services/ant-design-pro/api';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { ActionType, ModalForm, ProForm } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { message, Tree } from 'antd';
import { FC, useState } from 'react';

interface CreateFormProps {
  reload?: ActionType['reload'];
}

// CreateForm component for assigning roles
const CreateForm: FC<CreateFormProps> = (props) => {
  const { reload } = props;
  const [roleList, setRoleList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const intl = useIntl();

  // UseRequest hook for handling API requests
  const { loading } = useRequest(assignRole, {
    manual: true,
    onSuccess: () => {
      messageApi.success('Assign role successfully');
      reload?.();
    },
    onError: () => {
      messageApi.error('Assign role failed, please try again!');
    },
  });

  // Tree data for displaying roles in a tree structure
  const treeData: TreeDataNode[] = [
    {
      title: 'Manager',
      key: 1,
      children: [
        {
          title: 'Senior',
          key: 2,
          children: [
            {
              title: 'Junior',
              key: 3,
            },
          ],
        },
      ],
    },
  ];

  // Function to handle role selection in the tree
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    setRoleList(selectedKeys);
  };

  // Function to submit role assignment
  const submitAssignRole = async () => {
    let formData = {
      roleId: roleList[0],
      userId: props?.values?.id,
    };
    let res = await assignRole({ ...formData });
    console.log(res, 'submitAssignRole');
    if (res?.code === 200) {
      messageApi.success('Assign role successfully');
      reload?.();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      messageApi.error('Assign role failed, please try again!');
    }
    return true;
  };

  return (
    <>
      {contextHolder}
      {/* ModalForm for assigning roles */}
      <ModalForm
        initialValues={{
          ...props.values,
        }}
        title={intl.formatMessage({
          id: 'assign role',
          defaultMessage: 'Assign Role',
        })}
        trigger={
          <a
            style={{ display: props.values?.currentUserRoleId === 1 ? 'inline' : 'none' }}
            type="primary"
            icon={<PlusOutlined />}
          >
            <FormattedMessage id="assignRole" defaultMessage="Assign Role" />
          </a>
        }
        width="400px"
        modalProps={{ okButtonProps: { loading } }}
        onFinish={() => submitAssignRole()}
      >
        <ProForm.Item
          rules={[
            {
              required: false,
              message: <FormattedMessage id="status" />,
            },
          ]}
          width="md"
          name="roleId"
        >
          {/* Tree component for selecting roles */}
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={[props.values?.roleId]}
            defaultSelectedKeys={[props.values?.roleId]}
            onSelect={onSelect}
            treeData={treeData}
          />
        </ProForm.Item>
      </ModalForm>
    </>
  );
};

export default CreateForm;
