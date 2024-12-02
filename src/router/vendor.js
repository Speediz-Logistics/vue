
export default [
  {
    path: '/vendor',
    name: 'vendor',
    component: () => import('@/views/pages/vendor/index.vue'),
    children: [
      {
        path: '',
        name: 'vendor.index',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/pages/vendor/screens/LoginScreen.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/pages/vendor/screens/RegisterScreen.vue')
      },
      {
        path:'onboard-screen',
        name: 'onboard-Screen',
        component: () => import('@/views/pages/vendor/screens/OnBoardScreen.vue')
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/pages/vendor/screens/ForgetPassword.vue')
      }
    ],
  },
];
