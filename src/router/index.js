import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('views/login/login.vue')
const Home = () => import('views/layout/home.vue')
const Dashboard = () => import('views/dashboard/index.vue')

import system from './modules/system'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    children: [{
      path: '/dashboard',
      component: Dashboard,
      meta: { title: '资源概览' },
      name: 'Dashboard'
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...routes,
    system
  ]
})
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
