import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export default createRouter({
  history: createWebHashHistory('/MohamedRostom/'),
  scrollBehavior: () => ({ top: 0, behavior: 'instant' }),
  routes: [
    { path: '/',           component: HomeView },
    { path: '/about',      component: () => import('../views/AboutView.vue') },
    { path: '/experience', component: () => import('../views/ExperienceView.vue') },
    { path: '/projects',   component: () => import('../views/ProjectsView.vue') },
    { path: '/contact',    component: () => import('../views/ContactView.vue') },
  ],
})
