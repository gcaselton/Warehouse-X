import { history, Link, useRequest } from '@umijs/max';
import { Footer } from '@/components';
import {  } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';


import { FormattedMessage, Helmet, SelectLang, useIntl, useModel } from '@umijs/max';
import { createStyles } from 'antd-style';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import { fakeLogin } from './service';

import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';

// type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const Page = () => {
  // const [loginType, setLoginType] = useState<LoginType>('phone');
  const intl = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { token } = theme.useToken();
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    console.log({userInfo})
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    console.log(values)
   const params = {
    loginDto:{...values}
   }
   
    try {
      // login
      // const msg = await login({ ...values, type });
      const msg = await fakeLogin({...values});
      console.log({msg});
      const { code,data } = msg;
      if (code === 200) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        // token
        localStorage.setItem('TOKEN_STRING',data?.token || '');
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        window.location.href = urlParams.get('redirect') || '/';
        return;
      }
      console.log({msg});
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Login failed,Please try again！',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}

        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        // logo="../../../../public/icons/download.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="Warehouse X"
        containerStyle={{
          backgroundColor: 'transparent',
          backdropFilter: 'blur(4px)',
        }}
        subTitle=""
      
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
         
   
          </div>
        }
      >
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'userName'}
              rules={[
                {
                  required: true,
                  message: 'userName is required!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={'prefixIcon'}
                  />
                ),
              }}
              placeholder={'password'}
              rules={[
                {
                  required: true,
                  message: 'password is required!',
                },
              ]}
            />
          </>
    
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};
