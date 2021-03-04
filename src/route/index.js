import AsyncComponent from './asyncComponent'
const Login = AsyncComponent(() => import('@/views/login'))
const Home = AsyncComponent(() => import('@/views/layout/home'))
const Dashboard = AsyncComponent(() => import('@/views/dashboard'))
const User = AsyncComponent(() => import('@/views/system/user'))
const Role = AsyncComponent(() => import('@/views/system/role'))
const Department = AsyncComponent(() => import('@/views/system/department'))

const routes = [
  {
    path: '/login',
    component: Login,
    requiresAuth: false  //是否需要登录才能访问
  },
  {
    path: '/home',
    component: Home,
    requiresAuth: false,
    children: [
      {
        path: '/home/dashboard',
        component: Dashboard
      }
    ]
  },
  {
    path: '/system',
    component: Home,
    requiresAuth: true,
    children: [
      {
        path: '/system/user',
        component: User
      },
      {
        path: '/system/role',
        component: Role
      },
      {
        path: '/system/department',
        component: Department
      }
    ]
  }
]

export default routes