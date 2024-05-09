import { assignRole } from '@/services/ant-design-pro/api';
import { PlusOutlined,DownOutlined } from '@ant-design/icons';
import { ActionType, ModalForm, ProFormText, ProFormTextArea,ProForm } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, message,Switch,Tree } from 'antd';
import { FC,useState } from 'react';

interface CreateFormProps {
  reload?: ActionType['reload'];
}

const CreateForm: FC<CreateFormProps> = (props) => {
    console.log(props,"assignform-props");
  const { reload } = props;
  const [readonly, setReadonly] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();


  const { run, loading } = useRequest(assignRole, {
    manual: true,
    onSuccess: (res) => {
      messageApi.success('Assign role successfully');
      reload?.();
    },
    onError: () => {
      messageApi.error('Assign role failed, please try again!');
    },
  });

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
            }
          ],
        }
      ],
    },
  ];
  

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    setRoleList(selectedKeys)

    // setRoleList([props.values.roleId])
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  const submitAssignRole = async () => {
    let formdata = {
        roleId:roleList[0],
        userId:props?.values?.id
      }
      let res = await assignRole({ ...formdata });
      console.log(res,'submitAssignRole')
      if(res?.code === 200){
        messageApi.success('Assign role successfully');
        reload?.();
        setTimeout(() =>{
            window.location.reload()
          },2000)
      } else {
        messageApi.error('Assign role failed, please try again!');
      }
     return true
  };

  return (
    <>
      {contextHolder}
      <ModalForm
      initialValues={
        {
          ...props.values,
        }
      }
        title={intl.formatMessage({
          id: 'assign role',
          defaultMessage: 'Assign Role',
        })}
        trigger={
          <a 
          style={{display: props.values?.currentUserRoleId === 1 ? 'inline' : 'none'}}
          type="primary" icon={<PlusOutlined />}>
            <FormattedMessage id="assignRole" defaultMessage="Assign Role" />
          </a>
        }
        width="400px"
        modalProps={{ okButtonProps: { loading } }}
        onFinish={() => submitAssignRole() }
      >
           <ProForm.Item 
            rules={[
             {
               required: false,
               message: (
                 <FormattedMessage
                   id="status"
                 />
               ),
             },
           ]}
           width="md"
           name="roleId"
          >
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
