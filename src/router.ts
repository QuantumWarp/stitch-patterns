import { createRouter, createWebHashHistory } from 'vue-router';

import AdminList from './views/AdminList.vue';
import AdminEdit from './views/AdminEdit.vue';
import AdminKnit from './views/AdminKnit.vue';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/admin/list' },
    { path: '/admin/list', component: AdminList },
    { path: '/admin/edit/:id?', component: AdminEdit },
    { path: '/admin/knit/:id?', component: AdminKnit },
    // TODO: User routes
    // { path: '/user/examples', component: UserExample },
    // { path: '/user/edit', component: UserEdit },
    // { path: '/user/submit', component: UserSubmit },
  ]
});
