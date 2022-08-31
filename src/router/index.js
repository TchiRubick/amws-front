import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getToken } from '../scripts/localStorage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'public-articles',
      component: () => import('../views/PublicArticlesView.vue')
    },
    {
      path: '/article/:id',
      name: 'public-article',
      component: () => import('../views/PublicArticleView.vue')
    },
    {
      path: '/admin/users',
      name: 'users',
      beforeEnter: async () => await getToken() ? true : { name: 'home' },
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/admin/user-new',
      name: 'user-new',
      beforeEnter: async () => await getToken() ? true : { name: 'home' },
      component: () => import('../views/UserNewView.vue')
    },
    {
      path: '/admin/user/:id',
      name: 'user',
      beforeEnter: async () => await getToken() ? true : { name: 'home' },
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/adimn/article/:id',
      name: 'article',
      beforeEnter: async () => await getToken() ? true : { name: 'home' },
      component: () => import('../views/ArticleView.vue')
    },
    {
      path: '/admin/articles',
      name: 'articles',
      beforeEnter: async () => await getToken() ? true : { name: 'home' },
      component: () => import('../views/ArticlesView.vue')
    },
    {
      path: '/admin/article-new',
      name: 'article-new',
      beforeEnter: async () => await getToken() ? true : { name: 'home' },
      component: () => import('../views/ArticleNewView.vue')
    }
  ]
})

export default router
