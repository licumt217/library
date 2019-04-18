import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
    //防止页面刷新状态丢失
    isLogin:sessionStorage.getItem("isLogin")==='true'?true:false,
    userId:sessionStorage.getItem("userId")||'',
    activeMenuName:sessionStorage.getItem("activeMenuName")||'1-1',
}

const getters={
    isLogin:(state)=>{

        console.log(1)

        return sessionStorage.getItem("isLogin")==='yes';
    },
    userId:(state)=>{

        return sessionStorage.getItem("userId")||'';
    },

}

const mutations={
    isLogin:(state,value)=>{
        sessionStorage.setItem("isLogin",value)
        state.isLogin=value
    },
    userId:(state,value)=>{
        sessionStorage.setItem("userId",value)
        state.userId=value
    },
    activeMenuName:(state,value)=>{
        sessionStorage.setItem("activeMenuName",value)
        state.activeMenuName=value
    },
}

export default new Vuex.Store({state,getters,mutations})
