import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from "@/views/AccueilView";

const routes = [
  {
    path: '/',
    name: 'accueil',
    component: AccueilView
  },
  {
    path: '/edit/:id',
    name: 'edit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "edit" */ '../views/EditView.vue')
  },
  {
    path: '/read/:id',
    name: 'read',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "read" */ '../views/ReadView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
