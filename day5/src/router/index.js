import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'Home',
	component: Home
},
{
	path: '/',
	name: 'About',
	redirect: '/hy',
	component: () => import('../views/About.vue'),
	children: [{
		path: '/hy',
		name: 'hy',
		component: () => import('../views/hy.vue'),
	}, {
		path: '/users',
		name: 'users',
		component: () => import('../views/users.vue')
	}, {
		path: "/roles",
		name: "roles",
		component: () => import('../views/roles.vue')
	}, {
		path: '/rights',
		name: 'rights',
		component: () => import('../views/rights.vue')
	}, {
		path: '/goods',
		name: "goods",
		component: () => import('../views/goods.vue')
	}, {
		path: '/addGoods',
		name: "addGoods",
		component: () => import('../views/addGoods.vue')
	}, {
		path: '/categories',
		name: "categories",
		component: () => import('../views/categories.vue')
	}, {
		path: '/params',
		name: "params",
		component: () => import('../views/params.vue')
	}]
}
]
const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	let status = sessionStorage.getItem('token')
	if (status) {
		if (to.path == '/') {
			next('/hy')
		} else {
			next()
		}
	} else {
		if (to.path == '/') {
			next()
		} else {
			next('/')
		}
	}
})

export default router
