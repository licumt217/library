import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
    //防止页面刷新状态丢失
    isLogin:sessionStorage.getItem("isLogin")==='true'?true:false,
    userId:sessionStorage.getItem("userId")||'',
    activeMenuName:sessionStorage.getItem("activeMenuName")||'1-1',
    username:sessionStorage.getItem("username")||'',
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
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
    username:(state,value)=>{
        sessionStorage.setItem("username",value)
        state.username=value
    },
    activeMenuName:(state,value)=>{
        sessionStorage.setItem("activeMenuName",value)
        state.activeMenuName=value
    },
    userInfo:(state,value)=>{
        sessionStorage.setItem("userInfo",JSON.stringify(value))
        state.userInfo=value
    },
}

export default new Vuex.Store({state,getters,mutations})
