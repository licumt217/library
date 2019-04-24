import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const login = r => require.ensure([], () => r(require('../pages/login')), 'login')

const homepage = r => require.ensure([], () => r(require('../pages/homepage')), 'homepage')

const user_list = r => require.ensure([], () => r(require('../pages/user/list')), 'user_list')
const user_operate = r => require.ensure([], () => r(require('../pages/user/operate')), 'user_operate')
const user_detail = r => require.ensure([], () => r(require('../pages/user/detail')), 'user_detail')
const user_auth = r => require.ensure([], () => r(require('../pages/user/auth')), 'user_auth')

const book_list = r => require.ensure([], () => r(require('../pages/book/list')), 'book_list')
const book_operate = r => require.ensure([], () => r(require('../pages/book/operate')), 'book_operate')

const borrow_list = r => require.ensure([], () => r(require('../pages/borrow/list')), 'borrow_list')
const borrow_operate = r => require.ensure([], () => r(require('../pages/borrow/operate')), 'borrow_operate')


const resource_list = r => require.ensure([], () => r(require('../pages/resource/list')), 'resource_list')
const resource_operate = r => require.ensure([], () => r(require('../pages/resource/operate')), 'resource_operate')

const role_list = r => require.ensure([], () => r(require('../pages/role/list')), 'role_list')
const role_operate = r => require.ensure([], () => r(require('../pages/role/operate')), 'role_operate')
const role_auth = r => require.ensure([], () => r(require('../pages/role/auth')), 'role_auth')





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
                activeName:'/user/list'
            }
        },{
            path:'/user/operate',
            component:user_operate
            ,
            meta:{
                activeName:'/user/list'
            }
        },{
            path:'/user/detail',
            component:user_detail
            ,
            meta:{
                activeName:'/user/list'
            }
        },{
            path:'/user/auth',
            component:user_auth
            ,
            meta:{
                activeName:'/user/list'
            }
        },


        //book
        {
            path:'/book/list',
            component:book_list,
            meta:{
                activeName:'/book/list'
            }
        },{
            path:'/book/operate',
            component:book_operate,
            meta:{
                activeName:'/book/list'
            }
        },


        //borrow
        {
            path:'/borrow/list',
            component:borrow_list,
            meta:{
                activeName:'/borrow/list'
            }
        },{
            path:'/borrow/operate',
            component:borrow_operate,
            meta:{
                activeName:'/borrow/list'
            }
        },


        {
            path:'/resource/list',
            component:resource_list,
            meta:{
                activeName:'/resource/list'
            }
        },{
            path:'/resource/operate',
            component:resource_operate,
            meta:{
                activeName:'/resource/list'
            }
        },


        {
            path:'/role/list',
            component:role_list,
            meta:{
                activeName:'/role/list'
            }
        },{
            path:'/role/operate',
            component:role_operate,
            meta:{
                activeName:'/role/list'
            }
        },{
            path:'/role/auth',
            component:role_auth,
            meta:{
                activeName:'/role/list'
            }
        },

    ]
})

router.afterEach((to,from,next)=>{

    //切换路由时菜单动态跟随切换
        store.commit('activeMenuName',to.meta.activeName)

})

export default router
