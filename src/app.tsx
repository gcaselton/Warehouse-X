import { AvatarDropdown, AvatarName, Footer } from '@/components';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

// Check if the environment is development
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login'; // Path for the login page

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  // Function to fetch user information
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
    } catch (error) {
      history.push(loginPath); // Redirect to login page if fetching user info fails
    }
    return undefined;
  };

  // If not on the login page, fetch user info and set initial state
  const { location } = history;
  if (![loginPath, '/user/register', '/user/register-result'].includes(location.pathname)) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [], // Render actions
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />, // Avatar title
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>; // Avatar dropdown
      },
    },
    footerRender: () => <Footer />, // Render footer
    onPageChange: () => {
      const { location } = history;
      // Redirect to login if not logged in
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      // Background layout images
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    menuHeaderRender: undefined, // Menu header render
    childrenRender: (children) => {
      return (
        <>
          {children}
          {isDev && (
            // Setting drawer for development environment
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request configuration, can configure error handling
 * It provides a unified network request and error handling solution based on axios and ahooks' useRequest.
 * @doc https://umijs.org/docs/max/request#configuration
 */
export const request: RequestConfig = {
  baseURL: 'http://117.72.14.250:8501', // Base URL for requests
  ...errorConfig, // Error handling configuration
};
