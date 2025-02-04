import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import ServiceView from '@/views/ServiceView.vue'
import AdminHomeView from '@/views/AdminHomeView.vue'
import RequestView from '@/views/admin/RequestView.vue'
import ModifyView from '@/views/admin/ModifyView.vue'
import AlertView from '@/views/user/AlertView.vue'
import ServicesView from '@/views/user/ServicesView.vue'
import ServicesViewAdmin from '@/views/admin/ServicesViewAdmin.vue'
import LoginViewGdS from '@/views/gds/LoginViewGdS.vue'
import ReportView from '@/views/ReportView.vue'
import SendAlert from '@/views/gds/SendAlert.vue'
import store from '@/store'
import E404View from '@/views/E404View.vue'
import RegistrazioneGdS from '@/views/gds/RegistrazioneGdS.vue'
const router = createRouter({
  //import.meta.env.BASE_URL
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { roles: ['user']},
      children: [
        {
          path: '',
          component: ServicesView,
        },
        {
          path: 'service/:service_id',
          name: "service-details",
          component: ServiceView,
          props: true
        },
        {
          path: 'service/:service_id/report',
          name: "service-report",
          component: ReportView,
          props: true
        },
        {
          path: '/alert',
          component: AlertView,
          props:true,
        }
      ]
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
      path: '/report',
      name: 'report',
      component: ReportView,
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
      meta: { roles: ['gds']},
      component: HomeView,
      children: [
        {
          path: ':service_id',
          component: ServiceView,
          props: true,
        },
        {
          path:':service_id/modify',
          component: ModifyView,
          props: true
        },{
          path: ':service_id/sendalert',
          component: SendAlert,
          props: true
        },
        {
          path: '/gds/alert',
          component: AlertView,
          props:true,
        }
      ]
    },
    {
      path: '/register/gds',
      component: RegistrazioneGdS
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: E404View,
    },
    
  ],
})
router.beforeEach((to, from, next) => {
  // const userRole = store.getters['getRole'];
  const userRole = store.state.role;
  const requiredRoles = to.meta.roles;

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    next('/login'); //non permesso
  } else {
    next(); //permesso
  }
});

export default router
