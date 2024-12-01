import { createRouter, createWebHistory } from 'vue-router';
import guards from './guards';
import vendorRoutes from './vendor'; // Import the routes from vendor.js

const routes = [
  {
    path: '/',
    name: 'default',
    component: () => import('../views/HomeView.vue'),
  },
  // Spread vendorRoutes here to integrate them
  ...vendorRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
});

router.beforeEach(guards.beforeEach);
router.beforeResolve(guards.beforeResolve);
router.afterEach(guards.afterEach);

export default router;
