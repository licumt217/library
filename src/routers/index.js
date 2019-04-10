import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const login = r => require.ensure([], () => r(require('../pages/login')), 'login')

const homepage = r => require.ensure([], () => r(require('../pages/homepage')), 'homepage')

const user_list = r => require.ensure([], () => r(require('../pages/user/list')), 'user_list')
const user_add = r => require.ensure([], () => r(require('../pages/user/add')), 'user_add')

const router=new VueRouter({
    base:'library',
    mode:'history',
    routes:[
        {
            path:'/',
            component:homepage
        },{
            path:'/login',
            component:login
        },


        {
            path:'/user/list',
            component:user_list
        },{
            path:'/user/add',
            component:user_add
        },
    ]
})

export default router
