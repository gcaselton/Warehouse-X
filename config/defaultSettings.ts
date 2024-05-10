import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * Settings for the ProLayout component.
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  // Theme settings
  navTheme: 'light',
  colorPrimary: '#1890ff', 

  // Layout settings
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,

  // General settings
  title: 'Warehouse X',
  pwa: true,
  logo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Dyson_%28Unternehmen%29_logo.svg', // Dyson logo
};

export default Settings;
