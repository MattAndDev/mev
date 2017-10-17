// ============================================
// Router
// ============================================


import Vue from 'vue'
import Router from 'vue-router'
import Home from './vue/views/home.vue'

Vue.use(Router)

export default new Router({
  base: '/my-careship/',
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
})
