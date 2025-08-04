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
        path: 'post-job', 
        name: 'PostNewJob',
        component: () => import('components/PostNewJob.vue')
      },
      {
        path: 'jobs/:category',
        name: 'JobListing',
        component: () => import('pages/JobListing.vue'),
        props: true
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
  path: '/posted-jobs',
  name: 'PostedJobs',
  component: () => import('components/PostedJobs.vue')
},
{
  path: '/candidates',
  name: 'EmployerCandidates',
  component: () => import('components/EmployerCandidates.vue')
},
{
  path: '/employer-messages',
  name: 'EmployerMessages',
  component: () => import('components/EmployerMessages.vue')
},
{
  path: '/company-profile',
  name: 'CompanyProfile',
  component: () => import('components/CompanyProfile.vue')
},
  {
    path: '/employer-settings',
    name: 'EmployerSettings',
    component: () => import('components/EmployerSettings.vue')
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
