
export default [
  {
    path: '/vendor',
    name: 'vendor',
    component: () => import('@views/VendorView.vue'),
    children: [
      {
        path: '',
        name: 'vendor.index',
        component: () => import('@views/VendorView.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@views/pages/vendor/screens/LoginScreen.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@views/pages/vendor/screens/registerScreen.vue')
      },
      {
        path:'onBoardScreen',
        name: 'onBoardScreen',
        component: () => import('@views/pages/vendor/screens/OnBoardScreen.vue')
      },
      {
        path: 'forgotPassword',
        name: 'forgotPassword',
        component: () => import('@views/pages/vendor/screens/forgetPassword.vue')
      }
    ],
  },
];
