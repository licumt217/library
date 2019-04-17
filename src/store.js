import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
    isLogin:sessionStorage.getItem("isLogin")||'no',
    userId:sessionStorage.getItem("userId")||'',
}

const getters={
    isLogin:(state)=>{

        return state.isLogin;
    },
    userId:(state)=>{

        return state.userId;
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
}

export default new Vuex.Store({state,getters,mutations})
