import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About'
import Contact from '@/views/Contact'
import Portfolio from '@/views/Portfolio'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: '/',
	routes: [
		{
			name: 'Home',
			path: '/',
			component: Home,
			meta: {
				title: 'Sean Free - Home'
			}
		},
		{
			name: 'About',
			path: '/about',
			component: About,
			meta: {
				title: 'Sean Free - About'
			}
		},
		{
			name: 'Portfolio',
			path: '/portfolio',
			component: Portfolio,
			meta: {
				title: 'Sean Free - Portfolio'
			}
		},
		{
			name: 'Contact',
			path: '/contact',
			component: Contact,
			meta: {
				title: 'Sean Free - Contact'
			}
		}
	]
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title

	next()
})

export default router
