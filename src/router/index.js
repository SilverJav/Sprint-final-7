import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth } from "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add-course',
    name: 'new-course',
    meta: {requiresAuth: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/AddCourseView.vue')
  },
  {
    path: '/:id',
    component: () => import(/* webpackChunkName: "about" */ '../views/CursoView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    const auth = getAuth();
    const usuario = auth.currentUser;
    console.log ('usuario desde router', usuario)
    if(!usuario){
      next({path: '/'})
    }else{
      next()
    }
  } else {
    next()
  }
})

export default router
