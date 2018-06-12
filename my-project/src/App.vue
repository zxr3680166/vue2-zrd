<template>

    <div class="app">
        <div class="main">
            <view-box ref="viewBox">
                <router-view>

                </router-view>
            </view-box>
            <tabbar slot="bottom" style="position: fixed;" @on-index-change="routeChange">
                <tabbar-item selected link="/" @on-item-click="validation">
                    <x-icon slot="icon" type="home" size="30"></x-icon>
                    <x-icon class="redIcon" slot="icon-active" type="home" size="30"></x-icon>
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item link="/meat" @on-item-click="validation">
                    <x-icon slot="icon" type="clipboard" size="30"></x-icon>
                    <x-icon class="redIcon" slot="icon-active" type="clipboard" size="30"></x-icon>
                    <span slot="label">肉单</span>
                </tabbar-item>
                <tabbar-item link="/group" @on-item-click="validation">
                    <x-icon slot="icon" type="person" size="30"></x-icon>
                    <x-icon class="redIcon" slot="icon-active" type="person" size="30"></x-icon>
                    <span slot="label">采集群</span>
                </tabbar-item>
                <tabbar-item link="/mine" @on-item-click="validation">
                    <x-icon slot="icon" type="happy" size="30"></x-icon>
                    <x-icon class="redIcon" slot="icon-active" type="happy" size="30"></x-icon>
                    <span slot="label">我的</span>
                </tabbar-item>
            </tabbar>
        </div>

        <div v-transfer-dom>
            <loading v-model="isLoading" text="加载中"></loading>
        </div>
    </div>

</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {ViewBox, Loading, Tabbar, TabbarItem, TransferDom} from 'vux'

    export default {
        name: 'app',
        data() {
            return {
                showNav: true, // 底部导航显示
                weixin: {}, // 微信接口数据
            }
        },
        components: {
            ViewBox,
            Loading,
            Tabbar,
            TabbarItem,
        },
        directives: {
            TransferDom
        },
        watch: {
            // 如果路由有变化，会执行该方法
            '$route': function () {
                this.routeChange()
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.vux.isLoading
            })
        },
        methods: {
            ...mapActions([
                'initializeData',
            ]),

            changeLogin() {
                console.log('login')
                this.showLogin = !this.showLogin
            },

            routeChange() {
                let path = this.$route.path
                if (path === '/' || path === '/meat' || path === '/group' || path === '/mine') {
                    this.showNav = true
                } else {
                    this.showNav = false
                }
            },

            //
            registerapi() {
                // 接口：获取微信接口数据
                let url = 'http://www.51bmonster.com/api/auth'
                //fetch请求
                fetch(url, {
                    method: 'GET',
                }).then(response => response.json()).then(json => {
                    this.weixin = json.data
                    console.log('微信接口', this.weixin)
                    // var timestamp = this.weixin['timestamp']//时间戳
                    var timestamp = +new Date()//时间戳
                    var nonceStr = this.weixin.nonceStr//随机串
                    var signature = this.weixin.signature //签名
                    var appid = this.weixin.appid
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: appid, // 必填，公众号的唯一标识
                        timestamp: timestamp, // 必填，生成签名的时间戳
                        nonceStr: nonceStr, // 必填，生成签名的随机串
                        signature: signature,// 必填，签名，见附录1
                        jsApiList: [/*'checkJsApi', */'openLocation']
                        // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    })
                    wx.ready(function () {
                    })
                })

            },

            validation: function (val) {
                console.log(val)
            },

        },
        created() {
            // 初始化用户数据
            this.initializeData()
            // this.registerapi()
            // this.routeChange()
            console.log('createApp')
        },
        mounted() {
            window.setTimeout(() => {
                document.documentElement.scrollTop = 0
                document.body.scrollTop = 0
            }, 250)
        }
    }

</script>

<style lang="scss">
    @import './assets/css/px2rem.scss';

    html,
    body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }

    .app,
    .main {
        height: 100%;
        width: 100%;
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
    }

    .weui-toast__content {
        /*font-size: px2rem(20);*/
    }

</style>
