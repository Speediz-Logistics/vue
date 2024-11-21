export default [
  {
    path: '/',
    name: 'default',
    component: () => import('../views/HomeView.vue'),
    children: [
      // {
      //   path: '',
      //   name: 'tokyu.top',
      //   component: () => import('@views/tokyu/Index.vue'),
      // },
    ],
  },
];
