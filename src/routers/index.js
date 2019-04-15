import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const login = r => require.ensure([], () => r(require('../pages/login')), 'login')

const homepage = r => require.ensure([], () => r(require('../pages/homepage')), 'homepage')

const user_list = r => require.ensure([], () => r(require('../pages/user/list')), 'user_list')
const user_operate = r => require.ensure([], () => r(require('../pages/user/operate')), 'user_operate')

const book_list = r => require.ensure([], () => r(require('../pages/book/list')), 'book_list')
const book_operate = r => require.ensure([], () => r(require('../pages/book/operate')), 'book_operate')



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


        //user
        {
            path:'/user/list',
            component:user_list
        },{
            path:'/user/operate',
            component:user_operate
        },


        //book
        {
            path:'/book/list',
            component:book_list
        },{
            path:'/book/operate',
            component:book_operate
        },
    ]
})

export default router
