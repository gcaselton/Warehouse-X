import { PlusOutlined } from '@ant-design/icons';
import { removeRule, rule,getInStorageList,deleteOrerById,getRoleById } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { 
  Button, 
  Drawer, 
  Input, 
  message,
  Modal,
  Avatar,
  Badge,
  Form,
  Card,
  Col,
  Dropdown,
  List,
  Progress,
  Radio,
  Row,
 } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import CreateForm from '../components/CreateForm';
import UpdateForm from '../components/UpdateForm';
import DistributeForm from '../components/DistributeForm'
import { history, useModel } from '@umijs/max';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const [messageApi, contextHolder] = message.useMessage();

  const { run: delRun, loading } = useRequest(removeRule, {
    manual: true,
    onSuccess: () => {
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();

      messageApi.success('Deleted successfully and will refresh soon');
    },
    onError: () => {
      messageApi.error('Delete failed, please try again');
    },
  });
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [currentUserRoleId, setCurrentUserRoleId] = useState<number>(0);
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.productName"
          defaultMessage="productName"
        />
      ),
      dataIndex: 'name',
      tip: 'The rule name is the unique key',
      render: (dom, entity) => {
        // debugger
        // 
        return (
          <a 
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}>
          <Avatar size="large" shape="square" style={{marginRight:10}} src={entity.sliderUrls} />
          {dom}
        </a>
        );
      },
    },
    // {
    //   title: <FormattedMessage id="pages.searchTable.orderId" defaultMessage="Description" />,
    //   dataIndex: 'orderId',
    //   valueType: 'textarea',
    // },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.orderId"
          defaultMessage="orderId"
        />
      ),
      dataIndex: 'orderId',
      sorter: true,
      // hideInForm: true,
      // renderText: (val: string) =>
      //   `${val}${intl.formatMessage({
      //     id: 'pages.searchTable.tenThousand',
      //     defaultMessage: ' 万 ',
      //   })}`,
    },
    {
      title: <FormattedMessage id="returnType" defaultMessage="returnType" />,
      dataIndex: 'categoryId',
      hideInForm: true,
      valueEnum: {
        1: {
          text: (
            <FormattedMessage
              id="refund"
              defaultMessage="refund"
            />
          ),
          status: 'refund',
        },
        2: {
          text: (
            <FormattedMessage id="repair" defaultMessage="repair" />
          ),
          status: 'repair',
        },
        3: {
          text: (
            <FormattedMessage id="recycle" defaultMessage="recycle" />
          ),
          status: 'recycle',
        }
      },
  },
    {
        title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
        dataIndex: 'status',
        hideInForm: true,
        valueEnum: {
          0: {
            text: (
              // <Badge status="processing" text="进行中" />
              <FormattedMessage
                id="pages.searchTable.nameStatus.default"
                defaultMessage="Shut down"
              />
            ),
            status: 'Default',
          },
          1: {
            text: (
              <FormattedMessage id="pages.searchTable.nameStatus.inStorage" defaultMessage="Running" />
            ),
            status: 'inStorage',
          },
          2: {
            text: (
              <FormattedMessage id="pages.searchTable.nameStatus.outStorage" defaultMessage="Online" />
            ),
            status: 'outStorage',
          }
        },
        
    },
    // {
    //     title: <FormattedMessage id="pages.searchTable.auditStatus" defaultMessage="auditStatus" />,
    //     dataIndex: 'status',
    //     hideInForm: true,
    //     valueEnum: {
    //       0: {
    //         text: (
    //           <FormattedMessage
    //             id="pages.searchTable.auditStatus.default"
    //             defaultMessage="Shut down"
    //           />
    //         ),
    //         status: 'Default',
    //       },
    //       1: {
    //         text: (
    //           <FormattedMessage id="pages.searchTable.auditStatus.success" defaultMessage="success" />
    //         ),
    //         status: 'inStorage',
    //       },
    //       2: {
    //         text: (
    //           <FormattedMessage id="pages.searchTable.auditStatus.refuse" defaultMessage="refuse" />
    //         ),
    //         status: 'outStorage',
    //       }
    //     },
    //   },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.createTime"
          defaultMessage="Last scheduled time"
        />
      ),
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: 'pages.searchTable.exception',
                defaultMessage: 'Please enter the reason for the exception!',
              })}
            />
          );
        }
        return defaultRender(item);
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      display:"none",
      render: (_, record) => [
        // <a style={{display: currentUserRoleId === 3 ? 'inline' : 'none'}}>{{--}}</a>
       
        <a 
        style={{display: currentUserRoleId === 3 ? 'inline' : 'none'}}
         >
          --
        </a>,
        // update
        <UpdateForm
          trigger={
            <a>
              <FormattedMessage id="pages.searchTable.config" defaultMessage="update" />
            </a>
          }
          key="config"
          onOk={actionRef.current?.reload}
          values={{
            ...record,
            currentUserRoleId:currentUserRoleId
          }}
        />,
        // delete
        <a key="subscribeAlert"  
        style={{display: currentUserRoleId === 1 ? 'inline' : 'none'}}
          onClick={() => {
            console.log(record,"record---------")
            Modal.confirm({
              title: 'delete order',
              content: 'Are you sure you want to delete this order？',
              okText: 'yes',
              cancelText: 'cancel',
              onOk: () => deleteItem(record.id),
            });
        }}>
          <FormattedMessage
            id="delete"
            defaultMessage="delete"
          />
        </a>,

        // distribute
        <DistributeForm 
          trigger={
            <a>
              <FormattedMessage id="distribute" defaultMessage="distribute" />
            </a>
          }
          key="config"
          onOk={actionRef.current?.reload}
          values={{
            ...record,
            currentUserRoleId:currentUserRoleId
          }}
        />,


      //    <a key="distribute" onClick={()=>{
       
      //    }}>
      //    <FormattedMessage
      //      id="distribute"
      //      defaultMessage="distribute"
      //    />
      //  </a>,
      //   <a key="audit">
      //       <FormattedMessage
      //       id="audit"
      //       defaultMessage="audit"
      //   />
      // </a>,
      ],
    },
  ];

  const deleteItem = async (id: string) => {
    
    let res = await deleteOrerById(id)
    if(res.code === 200){
      messageApi.success('Deleted successfully and will refresh soon');
      setTimeout(() =>{
        window.location.reload()
      },2000)
      
      // getInStorageList({pageSize: 20,current: 1})
    } else {
      messageApi.error('Delete failed, please try again');
    }
    console.log(res,"delete res")
  }; 

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = useCallback(
    async (selectedRows: API.RuleListItem[]) => {
      if (!selectedRows?.length) {
        messageApi.warning('请选择删除项');

        return;
      }

      await delRun({
        data: {
          key: selectedRows.map((row) => row.key),
        },
      });
    },
    [delRun],
  );

  return (
    <PageContainer>
      {contextHolder}
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [<CreateForm key="create" reload={actionRef.current?.reload} />]}
        //request={getInStorageList}
        request = {async (
          params: T & {
            pageSize: number;
            current: number;
          },
          sort,
          filter,
        ) => {
          console.log('params-------------',params)
          let res1 = await getRoleById(currentUser?.id)
          console.log(res1,"res----getRoldId")
          setCurrentUserRoleId(res1?.data)
          const msg = await getInStorageList(params);
          console.log('getInStorageList',msg);
          return {
            data: msg?.data?.list,
            success: msg?.code === 200,
            total: msg?.data?.total,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            loading={loading}
            onClick={() => {
              handleRemove(selectedRowsState);
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
