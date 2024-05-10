/**
 * This is the main inventory page where users can see a list of all created returns and perform numerous actions.
 */
import { removeRule, getInStorageList, deleteOrerById, getRoleById } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import {
  Button,
  Drawer,
  Input,
  message,
  Modal
} from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import CreateForm from '../components/CreateForm';
import UpdateForm from '../components/UpdateForm';
import DistributeForm from '../components/DistributeForm';
import { useModel } from '@umijs/max';

// Define component
const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
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
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [currentUserRoleId, setCurrentUserRoleId] = useState<number>(0);

  // Define columns for the table
  const columns: ProColumns<API.RuleListItem>[] = [
    // Column for product name
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.productName"
          defaultMessage="Product Name"
        />
      ),
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a 
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}>
            {dom}
          </a>
        );
      },
    },
    // Column for serial ID
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.serialId"
          defaultMessage="SerialId"
        />
      ),
      dataIndex: 'serialId',
    },
    // Column for return type
    {
      title: <FormattedMessage id="returnType" defaultMessage="Return Type" />,
      dataIndex: 'categoryId',
      hideInForm: true,
      valueEnum: {
        1: {
          text: (
            <FormattedMessage
              id="refund"
              defaultMessage="Refund"
            />
          ),
          status: 'refund',
        },
        2: {
          text: (
            <FormattedMessage id="repair" defaultMessage="Repair" />
          ),
          status: 'repair',
        },
        3: {
          text: (
            <FormattedMessage id="recycle" defaultMessage="Recycle" />
          ),
          status: 'recycle',
        }
      },
    },
    // Column for audit status
    {
      title: <FormattedMessage id="pages.searchTable.auditStatus" defaultMessage="Audit Status" />,
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: (
            <FormattedMessage
              id="pages.searchTable.auditStatus.default"
              defaultMessage="In Process"
            />
          ),
          status: 'In Process',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.auditStatus.success" defaultMessage="Authorised" />
          ),
          status: 'Authorised',
        },
        2: {
          text: (
            <FormattedMessage id="pages.searchTable.auditStatus.refuse" defaultMessage="Denied" />
          ),
          status: 'Denied',
        }
      },
    },
    // Column for create time
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.createTime"
          defaultMessage="Date and Time"
        />
      ),
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
    // Column for options
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Options" />,
      dataIndex: 'option',
      valueType: 'option',
      display: "none",
      render: (record) => [
        <a 
          style={{display: currentUserRoleId === 3 ? 'inline' : 'none'}}
        >
          --
        </a>,
        <UpdateForm
          trigger={
            <a>
              <FormattedMessage id="pages.searchTable.config" defaultMessage="Update" />
            </a>
          }
          key="config"
          onOk={actionRef.current?.reload}
          values={{
            ...record,
            currentUserRoleId:currentUserRoleId
          }}
        />,
        <a key="subscribeAlert"  
          style={{display: currentUserRoleId === 1 ? 'inline' : 'none'}}
          onClick={() => {
            console.log(record,"record---------")
            Modal.confirm({
              title: 'Delete Return',
              content: 'Are you sure you want to delete this return？',
              okText: 'Yes',
              cancelText: 'Cancel',
              onOk: () => deleteItem(record.id),
            });
          }}>
          <FormattedMessage
            id="delete"
            defaultMessage="Delete"
          />
        </a>,
        <DistributeForm 
          trigger={
            <a>
              <FormattedMessage id="distribute" defaultMessage="Audit" />
            </a>
          }
          key="config"
          onOk={actionRef.current?.reload}
          values={{
            ...record,
            currentUserRoleId:currentUserRoleId
          }}
        />,
      ],
    },
  ];

  const deleteItem = async (id: string) => {
    // Delete item function
    let res = await deleteOrerById(id)
    if(res.code === 200){
      messageApi.success('Deleted successfully and will refresh soon');
      setTimeout(() =>{
        window.location.reload()
      },2000)
    } else {
      messageApi.error('Delete failed, please try again');
    }
    console.log(res,"delete res")
  }; 

  /**
   *  Delete node
   * @param selectedRows
   */
  const handleRemove = useCallback(
    async (selectedRows: API.RuleListItem[]) => {
      // Handle remove function
      if (!selectedRows?.length) {
        messageApi.warning('Delete node');
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

  // rendering
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
              defaultMessage="Delete selected"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Audit selected"
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
        {/* Render ProDescriptions component */}
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
