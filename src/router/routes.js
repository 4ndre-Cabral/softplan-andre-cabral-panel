
const routes = [
  {
    path: '/',
    name: 'default',
    meta: { auth: true },
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/users',
    children: [
      { path: '/users', name: 'Usuários', meta: { auth: true }, component: () => import('pages/user/Users.vue') },
      { path: '/user/:id?', name: 'Dados do usuário', meta: { auth: true }, component: () => import('pages/user/UserDetail.vue') },
      { path: '/procedures', name: 'Processos', meta: { auth: true }, component: () => import('pages/procedure/Procedures.vue') },
      { path: '/opinions', name: 'Pareceres', meta: { auth: true }, component: () => import('pages/opinion/Opinions.vue') }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/autentication/login.vue'),
    meta: {
      auth: false
    }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
