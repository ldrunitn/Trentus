import { createRouter, createWebHistory, useRoute } from 'vue-router'
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
import SurveyView from '@/views/user/SurveyView.vue'
import SendAlert from '@/views/gds/SendAlert.vue'
import store from '@/store'
import E404View from '@/views/E404View.vue'
import RegistrazioneGdS from '@/views/gds/RegistrazioneGdS.vue'
import LoginViewAdmin from '../views/admin/LoginViewAdmin.vue'
import MakeSurvery from '@/views/gds/MakeSurvery.vue'
import SurveyResultView from '@/views/gds/SurveyResultView.vue'
import { useStore } from 'vuex'
import UnauthorizedView from '@/views/UnauthorizedView.vue'
import { nextTick } from 'vue'
// const store = useStore();
const router = createRouter({
  //import.meta.env.BASE_URL
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          component: ServicesView,
        },
        {
          path: '/service/:service_id',
          name: "service-details-user",
          component: ServiceView,
          props: true
        },
        {
          path: 'service/:service_id/report',
          name: "service-report",
          meta: { roles: ['user']},
          component: ReportView,
          props: true
        },
        {
          path: 'service/:service_id/survey/:survey_id',
          meta: { roles: ['user']},
          component: SurveyView,
          props: true
        },
        {
          path: '/alert/:service_id/:alert_id',
          meta: { roles: ['user']},
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
          path: ':service_id/sendsurvey',
          component: MakeSurvery,
          props: true
        },
        {
          path: 'service/:service_id/survey/:survey_id',
          component: SurveyResultView,
          props: true
        },
        {
          path: '/gds/alert/:service_id/:alert_id',
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
      path: '/admin/login',
      component: LoginViewAdmin
    },
    {
      path: '/admin',
      name: 'Admin Homepage',
      meta: { roles: ['admin']},
      component: HomeView,
      children: [
        {
          path: '',
          component: ServicesView,
          props: true
        },
        {
          path: ':service_id',
          component: ServiceView,
          props: true,
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
        },
        {
          path: 'service/:service_id',
          name: "service-details-admin",
          component: ServiceView,
          props: true
        },
      ]
    },
    {
      path: '/unauthorized',
      component: UnauthorizedView
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
  const userRole = store.getters['getRole'];
  const isAuth = store.getters['getToken'] ? true : false;
  const requiredRoles = to.meta.roles;
  if(isAuth){
    if(!requiredRoles){
      if(userRole === 'gds'){
        store.dispatch('logout');
        next()
      }
      next();
      return;
    }
    else if (requiredRoles.includes(userRole)){
      next();
      return;
    }
    //non autorizzato
    next('/unauthorized');
    return;
  }
  else{
    if(!requiredRoles){
      next();
      return;
    }
    else next('login')
  } 
});

export default router
