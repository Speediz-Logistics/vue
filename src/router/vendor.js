import requiredAuth from "@/router/middlewares/requiredAuth.js";
import authenticated from "@/router/middlewares/redirectIfAuthenticated.js";

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
        component: () => import('@/views/pages/vendor/screens/LoginScreen.vue'),
        meta: { middlewares: [authenticated] },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/pages/vendor/screens/RegisterScreen.vue'),
      },
      {
        path:'onboard-screen',
        name: 'onboard-Screen',
        component: () => import('@/views/pages/vendor/screens/OnBoardScreen.vue'),
        meta: { middlewares: [requiredAuth] },
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/pages/vendor/screens/ForgetPassword.vue')
      },
      {
        path: 'package-management',
        name: 'package-management',
        component: () => import('@/views/pages/vendor/screens/packageManagement.vue')
      },
      {
        path: 'package-management/package-detail/:id',
        name: 'detail',
        component: () => import('@/views/pages/vendor/screens/PackageDetail/[id].vue')
      }
    ],
  },
];
