import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    redirect: '/hy',
    component: () => import('../views/About.vue'),
    children: [
      {
        path: '/hy',
        name: "hy",
        component: () => import('../views/hy.vue')
      },
      {
        path: '/categories',
        name: "categories",
        component: () => import('../views/categories.vue')
      },
      {
        path: '/users',
        name: "users",
        component: () => import('../views/users.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
