import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
    isLogin:sessionStorage.getItem("isLogin")||'no'
}

const getters={
    isLogin:(state)=>{

        return state.isLogin;
    }
}

const mutations={
    isLogin:(state,value)=>{
        sessionStorage.setItem("isLogin",value)
        state.isLogin=value
    }
}

export default new Vuex.Store({state,getters,mutations})
