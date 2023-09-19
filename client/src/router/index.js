import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import ShoopingList from "../views/ShoppingList.vue"
import DetailProduct from "../views/DetailProduct.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/product/:id',
      name: 'detail',
      component: DetailProduct
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoopingList
    },
  ]
})

router.beforeEach((to,from,next) => {
  const isAuthenticated = localStorage.access_token

  const allowedRoutes = ['home', 'login', 'register', 'detail']

  if (!isAuthenticated && !allowedRoutes.includes(to.name)) {
    next("/login")
  } else if (isAuthenticated && (to.name === "login" || to.name === "register")) {
    next("/")
  } else {
    next()
  }
})

export default router
