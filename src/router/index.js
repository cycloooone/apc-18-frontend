import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginPage.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminView from '../views/AdminView.vue'
import NewsView from '../views/NewsView.vue'
import TestView from '../views/TestView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView
  },
  {
    path: '/test',
    name: 'test',
    component: TestView
  },
  
  
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
