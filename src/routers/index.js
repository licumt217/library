import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const login = r => require.ensure([], () => r(require('../pages/login')), 'login')

const homepage = r => require.ensure([], () => r(require('../pages/homepage')), 'homepage')

const user_list = r => require.ensure([], () => r(require('../pages/user/list')), 'user_list')
const user_operate = r => require.ensure([], () => r(require('../pages/user/operate')), 'user_operate')

const book_list = r => require.ensure([], () => r(require('../pages/book/list')), 'book_list')
const book_operate = r => require.ensure([], () => r(require('../pages/book/operate')), 'book_operate')

const borrow_list = r => require.ensure([], () => r(require('../pages/borrow/list')), 'borrow_list')
const borrow_operate = r => require.ensure([], () => r(require('../pages/borrow/operate')), 'borrow_operate')



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
            ,
            meta:{
                activeName:'1-1'
            }
        },{
            path:'/user/operate',
            component:user_operate
            ,
            meta:{
                activeName:'1-1'
            }
        },


        //book
        {
            path:'/book/list',
            component:book_list,
            meta:{
                activeName:'1-2'
            }
        },{
            path:'/book/operate',
            component:book_operate,
            meta:{
                activeName:'1-2'
            }
        },


        //borrow
        {
            path:'/borrow/list',
            component:borrow_list,
            meta:{
                activeName:'1-3'
            }
        },{
            path:'/borrow/operate',
            component:borrow_operate,
            meta:{
                activeName:'1-3'
            }
        },
    ]
})

router.afterEach((to,from,next)=>{

    //切换路由时菜单动态跟随切换
    store.commit('activeMenuName',to.meta.activeName)

})

export default router
