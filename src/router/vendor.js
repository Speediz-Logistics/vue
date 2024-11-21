export default [
  {
    path: '/vendor',
    name: 'vendor',
    component: () => import('@views/VendorView.vue'),
    children: [
      {
        path: '',
        name: 'tokyu.top',
        component: () => import('@views/tokyu/Index.vue'),
      },
    ],
  },
];
