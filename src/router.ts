import { createWebHistory, createRouter } from 'vue-router';

import UserEdit from './views/UserEdit.vue';
import UserExample from './views/UserExample.vue';
import UserSubmit from './views/UserSubmit.vue';
import AdminList from './views/AdminList.vue';
import AdminEdit from './views/AdminEdit.vue';
import AdminKnit from './views/AdminKnit.vue';


export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/admin/edit' },
    { path: '/user/examples', component: UserExample },
    { path: '/user/edit', component: UserEdit },
    { path: '/user/submit', component: UserSubmit },
    { path: '/admin/list', component: AdminList },
    { path: '/admin/edit', component: AdminEdit },
    { path: '/admin/knit', component: AdminKnit },
  ]
});
