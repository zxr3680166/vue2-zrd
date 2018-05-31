import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {
    userInfo: {//用户信息
        user_id: 1, // id
        avatar: 'touxiang.png', // 头像
        username: 'ZXR', // 用户名
        mobile: '15160085114', //手机号
        balance: 1000, //账户余额
        level: 9, //等级
        point: 8888, //积分
    },
    classify_selected: {
        cid: 0,
        name:'',
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
})
