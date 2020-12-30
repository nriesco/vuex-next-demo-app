import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [{
  path: '/',
  name: 'demoName',
  component: () => import(/* webpackChunkName: "Container" */ '@/components/demo/Container.vue')
}, {
  path: '/demo/:id',
  name: 'demoEditor',
  component: () => import(/* webpackChunkName: "Editor" */ '@/components/demo/Editor.vue')
}]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
