// Route configurations
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        component: '404',
        path: '/user/*',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/analysis',
      },
      {
        name: 'analysis',
        icon: 'smile',
        path: '/dashboard/analysis',
        component: './dashboard/analysis',
      },
      {
        name: 'Heat Map',
        path: '/dashboard/map',
        component: './dashboard/map/index.tsx',
      },
    ],
  },
  {
    name: 'Returns',
    path: '/returns',
    icon: 'table',
    routes: [
      {
        path: '/returns',
        redirect: '/returns/inventory',
      },
      {
        name: 'Inventory',
        path: '/returns/inventory',
        component: './order/inventory',
      },
    ],
  },
  {
    name: 'Staff',
    path: '/staff',
    icon: 'smile',
    routes: [
      {
        path: '/staff',
        redirect: '/staff/list',
      },
      {
        name: 'List',
        path: '/staff/list',
        component: './staff/list',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard/analysis',
  },
  {
    component: '404',
    path: '/*',
  },
];
