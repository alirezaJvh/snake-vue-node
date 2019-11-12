import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = ()=> import('../views/Home');
const Playground = ()=>import('../views/Playground');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Playground
  },
  {
    path: '/test',
    name: 'test',
    component: Home
  },
  {
    path: '/game',
    name: 'game',
    component: ()=> import('../views/Playground')
  }
]

const router = new VueRouter({
  routes
})

export default router
