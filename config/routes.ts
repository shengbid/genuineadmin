export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: '首页',
                icon: 'home',
                component: './Welcome',
              },
              // {
              //   path: '/admin',
              //   name: 'admin',
              //   icon: 'crown',
              //   component: './Admin',
              //   authority: ['admin'],
              //   routes: [
              //     {
              //       path: '/admin/sub-page',
              //       name: 'sub-page',
              //       icon: 'smile',
              //       component: './Welcome',
              //       authority: ['admin'],
              //     },
              //   ],
              // },
              {
                path: '/list/user',
                name: '用户管理',
                icon: 'user',
                component: './TableList/user',
                authority: ['admin'],
              }, {
                path: '/list/merchant',
                name: '商户管理',
                icon: 'pay-circle',
                component: './TableList/merchant',
                authority: ['admin'],
              }, {
                path: '/list/advice',
                name: '建议管理',
                icon: 'tag',
                component: './TableList/advice',
                authority: ['admin'],
              }, {
                path: '/list/report',
                name: '举报管理',
                icon: 'phone',
                component: './TableList/report',
                authority: ['admin'],
              }, {
                path: '/list/ad',
                name: '广告管理',
                icon: 'cloud',
                component: './TableList/ad',
                authority: ['admin'],
              }, {
                path: '/list/word',
                name: '文字管理',
                icon: 'book',
                component: './TableList/word',
                authority: ['admin'],
              }, {
                path: '/list/business',
                name: '业务需求管理',
                icon: 'paper-clip',
                component: './TableList/business',
                authority: ['admin'],
              }, {
                path: '/list/classify',
                name: '需求类别管理',
                icon: 'appstore',
                component: './TableList/classify',
                authority: ['admin'],
              },
              // {
              //   name: '表单管理',
              //   icon: 'table',
              //   path: '/list',
              //   routes: [
              //     { path: '/list', redirect: '/list/search' },
              //     {
              //       path: '/list/search',
              //       name: '搜索',
              //       icon: 'table',
              //       component: './TableList/search',
              //       authority: ['admin'],
              //     },
              //     {
              //       path: '/list/user',
              //       name: '用户管理',
              //       icon: 'table',
              //       component: './TableList/user',
              //       authority: ['admin'],
              //     },
              //   ],
              // },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
