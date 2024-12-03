import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminHomeView from '@/views/AdminHomeView.vue'
import RequestView from '@/views/admin/RequestView.vue'
import ServicesList from '@/views/admin/ServicesList.vue'
import ModifyRequestView from '@/views/admin/ModifyRequestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/admin',
      name: 'Admin Homepage',
      component: AdminHomeView,
      children: [
        {
          path:'',
          component: ServicesList
        },
        {
          path: ':request_id/approve',
          component: RequestView, 
          props: true
        },
        {
          path:':service_id/modify',
          component: ModifyRequestView,
          props: true
        }
      ]
    }
    
  ],
})

export default router
