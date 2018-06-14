import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import routes from './router/router'
import store from './store/'

import './assets/css/reset.css'
import './assets/css/common.css'
/* 1px解决方案 */
import 'vux/src/styles/1px.less'
/* 纯css close图标 */
import 'vux/src/styles/close.less'
// import './components/index'
import './assets/js/rem'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

// 路由
const router = new VueRouter({
    routes
})
// 切换页面显示加载提示
router.beforeEach((to, from, next) => {
    store.commit('updateLoadingStatus', {isLoading: true})
    next()
})
// 新页面重置页面滚动 关闭加载提示
router.afterEach(route => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.onscroll = null
    setTimeout(() => {
        store.commit('updateLoadingStatus', {isLoading: false})
    }, 2000)
})

store.registerModule('vux', { // 名字自己定义
    state: {
        isLoading: false
    },
    mutations: {
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        }
    }
})

new Vue({
    router,
    store,
}).$mount('#app')
