/**
 * @name Umi Configuration
 * @description UmiJS configuration file for our project. Contains settings for routing, themes, proxies, plugins, and more.
 * @doc https://umijs.org/config/
 */

import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  hash: true,
  routes,
  theme: {
    'root-entry-name': 'variable',
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  fastRefresh: true,
  model: {},
  initialState: {},
  title: 'Warehouse X',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  locale: {
    default: 'en-US',
    antd: true,
  },
  antd: {},
  request: {},
  access: {},
  headScripts: [{ src: '/scripts/loading.js', async: true }],
  presets: ['umi-presets-pro'],
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  mock: {
    include: ['mock/**/*', 'src/pages/**/_mock.ts'],
  },
  mfsu: {
    strategy: 'normal',
  },
  esbuildMinifyIIFE: true,
  requestRecord: {},
});
