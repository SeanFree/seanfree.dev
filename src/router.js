import Vue from 'vue'
import Router from 'vue-router'
import About from '@/views/About'
import Resume from '@/views/Resume'
import Contact from '@/views/Contact'
import Portfolio from '@/views/Portfolio'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: '/',
	routes: [
		{
			name: 'About',
			path: '/',
			component: About,
			meta: {
				title: 'Sean Free - Home'
			}
		},
		{
			name: 'Resume',
			path: '/resume',
			component: Resume,
			meta: {
				title: 'Sean Free - Resume'
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
