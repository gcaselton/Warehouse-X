import { updateStaff } from '@/services/ant-design-pro/api';
import { PlusOutlined,DownOutlined } from '@ant-design/icons';
import { ActionType, ModalForm, ProFormText, ProFormTextArea,ProForm } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, message,Switch,Tree } from 'antd';
import { FC,useState } from 'react';

interface CreateFormProps {
  reload?: ActionType['reload'];
}

const CreateForm: FC<CreateFormProps> = (props) => {
  const { reload } = props;
  const [readonly, setReadonly] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const { run, loading } = useRequest(updateStaff, {
    manual: true,
    onSuccess: (res) => {
      messageApi.success('Added successfully');
      reload?.();
    },
    onError: () => {
      messageApi.error('Adding failed, please try again!');
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
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <>
      {contextHolder}
      <ModalForm
      initialValues={
        {
          ...props.values,
        // status:1
        }
      }
        title={intl.formatMessage({
          id: 'add staff',
          defaultMessage: 'add staff',
        })}
        trigger={
          // <a style={{display: props?.values?.roleId === 1 ? 'inline' : 'none'}} type="primary" icon={<PlusOutlined />}>
          //   <FormattedMessage id="update" defaultMessage="update" />
          // </a>
          <a type="primary" icon={<PlusOutlined />}>
          <FormattedMessage id="update" defaultMessage="update" />
        </a>
        }
        width="400px"
        modalProps={{ okButtonProps: { loading } }}
        onFinish={async (value) => {
          console.log(value,'add staff')
          let formdata = {
            ...value,
            name:"",
            status:value?.status ? 1 : 0,
            password:111111,
            description:"",
            id:props.values.id
          }
          console.log('formdata-----updateStaff',formdata)
          let res = await updateStaff({ ...formdata });
          console.log('addNewRole',res)
          if(res?.code === 200){
            messageApi.success('Added successfully');
            setTimeout(() =>{
              window.location.reload()
            },2000)
          } else if(res?.code === 209){
            messageApi.error('Update successfully!');
          } else {
            messageApi.error('Update failed, please try again!');
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
                  id="userName"
                  defaultMessage="userName is required"
                />
              ),
            },
          ]}
          width="md"
          name="username"
          label={intl.formatMessage({
            id: 'userName',
            defaultMessage: 'userName',
          })}
        />
         <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="phone"
                  defaultMessage="phone is required"
                />
              ),
            },
          ]}
          width="md"
          name="phone"
          label={intl.formatMessage({
            id: 'phone',
            defaultMessage: 'phone',
          })}
        />
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
           name="status"
           label={intl.formatMessage({
             id: 'role status',
             defaultMessage: 'role status',
           })}>
             
             <Switch
                style={{
                  marginBlockEnd: 16,
                }}
                defaultValue={props?.values?.status === 1}
                // checked={true}
                checkedChildren="on"
                unCheckedChildren="off"
                
              />
        
           </ProForm.Item>

           {/* <ProForm.Item 
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
           name="status"
           label={intl.formatMessage({
             id: 'role assign',
             defaultMessage: 'role assign',
           })}>
           
            <Tree
              showLine
              switcherIcon={<DownOutlined />}
              defaultExpandedKeys={['0-0-0']}
              onSelect={onSelect}
              treeData={treeData}
            />
           </ProForm.Item> */}

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
