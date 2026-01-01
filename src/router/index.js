import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'login', component: () => import('../components/LoginPage.vue') },
  { path: '/signup', name: 'signup', component: () => import('../components/SignupPage.vue') },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/ForgotPasswordPage.vue'),
  },
  { path: '/browse', name: 'browse', component: () => import('../components/BrowsePage.vue') },
  { path: '/post', name: 'post', component: () => import('../components/PostPage.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
