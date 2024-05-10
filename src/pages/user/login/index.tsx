// Import necessary modules from UmiJS, React, and Ant Design
import { useIntl, useModel } from '@umijs/max';
import { flushSync } from 'react-dom';
import { handleLogin } from './service';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProConfigProvider, ProFormText } from '@ant-design/pro-components';
import { message, theme } from 'antd';
import { useState } from 'react';

// Function to play login sound
const playLoginSound = () => {
  const audio = new Audio('/loginSound.wav');
  audio.play();
};

// Main functional component
const Page = () => {
  // Initialize necessary hooks and states
  const intl = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { token } = theme.useToken();
  const [setUserLoginState] = useState<API.LoginResult>({});

  // Function to fetch user info
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // Call handleLogin function to initiate login process
      const msg = await handleLogin({ ...values });
      const { code, data } = msg;
      if (code === 200) {
        // If login is successful, set token, show success message, play login sound, fetch user info, and redirect
        localStorage.setItem('TOKEN_STRING', data?.token || '');
        message.success(intl.formatMessage({ id: 'pages.login.success', defaultMessage: 'Login successful!' }));
        playLoginSound();
        await fetchUserInfo();
        setTimeout(() => {
          const urlParams = new URL(window.location.href).searchParams;
          window.location.href = urlParams.get('redirect') || '/';
        }, 2300);
        return;
      } else {
        // If login fails, show error message
        messageApi.error('Login failed, please try again!');
      }
      setUserLoginState(msg);
    } catch (error) {
      // Handle login error
      message.error(intl.formatMessage({ id: 'pages.login.failure', defaultMessage: 'Login failed, please try again!' }));
    }
  };

  // Render login form page
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
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="Warehouse X"
        containerStyle={{
          backgroundColor: 'transparent',
          backdropFilter: 'blur(4px)',
        }}
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
          {/* Login form fields */}
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
            placeholder={'Username'}
            rules={[
              {
                required: true,
                message: 'Username is required!',
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
            placeholder={'Password'}
            rules={[
              {
                required: true,
                message: 'Password is required!',
              },
            ]}
          />
        </>
      </LoginFormPage>
    </div>
  );
};

// Export default component wrapped in ProConfigProvider for theme configuration
export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};
