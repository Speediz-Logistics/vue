import { createPinia } from 'pinia';

const store = createPinia();

export default store;

import * as user from './user.js';
import * as product from './package.js';

export const { useUserStore } = user;
export const { useProductStore } = product;
