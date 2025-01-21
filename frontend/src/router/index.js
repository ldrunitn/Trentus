import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import ServiceView from '@/views/ServiceView.vue'
import AdminHomeView from '@/views/AdminHomeView.vue'
import RequestView from '@/views/admin/RequestView.vue'
import ModifyView from '@/views/admin/ModifyView.vue'
import AlertView from '@/views/user/AlertView.vue'
import store from '@/store';
import ServicesView from '@/views/user/ServicesView.vue'
import ServicesViewAdmin from '@/views/admin/ServicesViewAdmin.vue'
import LoginViewGdS from '@/views/gds/LoginViewGdS.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        console.log(store.getters['user/getIsAuthenticated'])
        if (store.getters['user/getIsAuthenticated']) {
          next();
        } else {
          next('/login');
        }
      },
      children: [
        {
          path: '',
          component: ServicesView
        },
        {
          path:'alert',
          component: AlertView,
          props: true,
        },
      ]
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
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/gds/login',
      name: 'login gds',
      component: LoginViewGdS
    },
    {
      path: '/register',
      name: 'registration',
      component: RegistrationView,
    },
    {
      path: '/service',
      name: 'service',
      component: ServiceView,
    },
    {
      path: '/admin',
      name: 'Admin Homepage',
      component: AdminHomeView,
      children: [
        {
          path:'',
          component: ServicesViewAdmin,
          props: true
        },
        {
          path: ':request_id/approve',
          component: RequestView, 
          props: true
        },
        {
          path:':service_id/modify',
          component: ModifyView,
          props: true
        }
      ]
    },
    {
      path: '/gds',
      name: 'GdS Homepage',
      component: HomeView,
      children: [
        {
          path: ':service_id',
          component: ServiceView,
          props: true,
        }
      ]
    }
    
  ],
})

export default router
