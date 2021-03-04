const Home = () => import('views/layout/home.vue')
const App = () => import('views/layout/App.vue')

const UserList = () => import('views/system/user/list.vue')
const AddUser = () => import('views/system/user/add.vue')
const UserDetail = () => import('views/system/user/detail.vue')
const RoleList = () => import('views/system/role/list.vue')
const AddRole = () => import('views/system/role/add.vue')

const system = {
  path: '/system',
  component: Home,
  meta: { title: '系统管理' },
  children: [
    {
      path: 'user',
      redirect: 'user/list',
      component: App,
      meta: { title: '用户管理' },
      children: [{
        path: 'list',
        component: UserList,
        meta: { title: '用户列表' },
        name: 'UserList'
      }, {
        path: 'add',
        component: AddUser,
        meta: { title: '添加用户' },
        name: 'AddUser'
      }, {
        path: 'edit/:id',
        component: AddUser,
        meta: { title: '修改用户' },
        name: 'EditUser'
      }, {
        path: 'detail/:id',
        component: UserDetail,
        meta: { title: '用户详情' },
        name: 'UserDetail'
      }]
    },
    {
      path: 'role',
      redirect: 'role/list',
      component: App,
      meta: { title: '角色管理' },
      children: [{
        path: 'list',
        component: RoleList,
        meta: { title: '角色列表' },
        name: 'RoleList'
      }, {
        path: 'add',
        component: AddRole,
        meta: { title: '添加角色' },
        name: 'AddRole'
      }, {
        path: 'edit/:id',
        component: AddRole,
        meta: { title: '修改角色' },
        name: 'EditRole'
      }]
    }
  ]
}
export default system
