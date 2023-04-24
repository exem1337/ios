import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: '/courses', component: () => import('pages/CoursesView.vue') },
      {
        path: '/courses/:id',
        component: () => import('src/pages/CourseView.vue'),
      },
      {
        path: '/expert',
        component: () => import('src/pages/ExpertPage.vue'),
      },
      {
        path: '/expert/rules/:id',
        component: () => import('src/pages/RuleEdit.vue'),
      },
      {
        path: '/expert/rules',
        component: () => import('src/pages/RuleEdit.vue'),
      },
      {
        path: '/courses/:id/edit',
        component: () => import('pages/CourseEdit.vue'),
      },
      {
        path: '/operator',
        component: () => import('pages/OperatorPage.vue'),
      },
      {
        path: '/courses/:id/edit/users',
        component: () => import('pages/CourseUsers.vue'),
      },
      {
        path: '/courses/:id/edit/:materialId/test',
        component: () => import('pages/TestEdit.vue'),
      },
      {
        path: 'courses/:id/results',
        component: () => import('pages/CourseResults.vue'),
      },
      {
        path: '/courses/:id/edit/test/:testId',
        component: () => import('pages/TestEdit.vue'),
      },
      {
        path: '/profile',
        component: () => import('src/pages/ProfilePage.vue'),
      },
      {
        path: '/about',
        component: () => import('src/pages/AboutPage.vue'),
      },
      {
        path: '/test/:id/:materialId',
        component: () => import('src/pages/TestPage.vue'),
      },
      {
        path: '/fuzzy',
        component: () => import('src/pages/FuzzyView.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
