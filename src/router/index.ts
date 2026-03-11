import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/HomePage.vue'),
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/resume',
      component: () => import('@/pages/ResumePage.vue'),
      meta: {
        title: 'Resume',
      },
    },
    {
      path: '/projects',
      component: () => import('@/pages/ProjectsPage.vue'),
      meta: {
        title: 'Projects',
      },
    },
  ],
})

router.beforeEach((to) => {
  document.title =
    to.path === '/' ? 'Sean Free' : `Sean Free | ${to.meta.title}`
})

router.beforeEach((to, from) => {
  if (to.path !== from.path) {
    document.body.dispatchEvent(new Event('route-change'))
  }
})

export default router
