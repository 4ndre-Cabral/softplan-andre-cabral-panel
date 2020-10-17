
const routes = [
  {
    path: '/',
    name: 'default',
    meta: { auth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', meta: { auth: true }, component: () => import('pages/Index.vue') }
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
