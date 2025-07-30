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
      },
      {
        path: 'employers',
        name: 'Employers',
        component: () => import('pages/EmployerHomePage.vue')
      },
      {
        path: 'job-listing',               
        name: 'JobListing',
        component: () => import('pages/JobListing.vue')
      },
      {
        path: 'job/:id', 
        name: 'JobDescription',
        component: () => import('pages/JobDescriptionPage.vue'),
        props: true 
      },
       {path: '/resume-builder',
        component: () => import('../components/resume-builder.vue') }
    ]
  },

  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'), 
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/LoginPage.vue') 
      },
    ]
  },

  {
    path: '/create-account',
    component: () => import('layouts/AuthLayout.vue'), 
    children: [
      {
        path: '',
        name: 'CreateAccount',
        component: () => import('pages/CreateAccount.vue') 
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'JobSeekerDashboard',
        component: () => import('pages/JobSeekerDashboard.vue'),
        meta: {requiresAuth: true}
      },
    ]
  },
{
  path: '/employer-login',
  component: () => import('pages/EmployerLogin.vue')
},
{
  path: '/employer-portal',
  component: () => import('pages/EmployerPortal.vue')
},

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes;
