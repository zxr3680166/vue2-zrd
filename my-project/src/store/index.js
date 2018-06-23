import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'


Vue.use(Vuex)

const state = {
    userInfo: {//用户信息
        city: '',
        country: '',
        create_time: '',
        groupid: null,
        headimgurl: '',
        id: 0,
        language: '',
        nickname: '',
        openid: '',
        pid: null,
        privilege: '',
        province: '',
        qr_scene: null,
        qr_scene_str: null,
        remark: null,
        sex: 1,
        subscribe: null,
        subscribe_scene: null,
        subscribe_time: null,
        tagid_list: null,
        unionid: null,

    },
    classify_selected: {// 分类选择+搜索
        cid: 0,
        name: '分类结果',
        keyword: '', //搜索关键词
        goodsListArr: [],//分类和搜索结果
    },
    isSearching: {
        state : false
    },
    hackReset: {
        state : true
    },
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
})
