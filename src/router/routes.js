import HomePage from 'pages/HomePage.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage 
      }
    ]
  },

  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'), // ✅ Separate layout for login
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/LoginPage.vue') 
      }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes;
