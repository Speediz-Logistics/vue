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
    ],
  },
];
