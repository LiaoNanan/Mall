import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const Home = () => import('@views/home/Home.vue')
const Category = () => import('@views/category/Category.vue')
const ShopCart = () => import('@views/shopcart/ShopCart.vue')
const Profile = () => import('@views/profile/Profile.vue')
const Detail = () => import('@views/detail/Detail.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },

]

const history = createWebHistory(process.env.BASE_URL)
const router = createRouter({
  history,
  routes
})

export default router
