import Vue from 'vue'
import Router from 'vue-router'
import Article from './../views/article.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/article/:id/userid/:userid',
      name: 'Article',
      component: Article
    }
  ]
})
