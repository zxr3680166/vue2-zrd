<template>
    <footer class="footer" :class="{'go-back': !showNav}">
        <section class="footer mint-1px-t" v-show="showNav">
            <nav class="nav nav-home" :class="{'cur-page': route === '/'}">
                <router-link to="/">
                    <!-- 预留 Tabbar 图标接口 -->
                    <div class="nav-icon">
                        <img v-show="route !== '/'" src="../../assets/images/icons/smile_1.png" alt="">
                        <img v-show="route === '/'" src="../../assets/images/icons/smile_2.png" alt="">
                    </div>
                    <!--首页-->
                </router-link>
            </nav>
            <nav class="nav nav-meat" :class="{'cur-page': route === '/meat'}">
                <router-link to="/meat">
                    <!-- 预留 Tabbar 图标接口 -->
                    <div class="nav-icon">
                        <img v-show="route !== '/meat'" src="../../assets/images/icons/smile_1.png" alt="">
                        <img v-show="route === '/meat'" src="../../assets/images/icons/smile_2.png" alt="">
                    </div>
                    肉单
                </router-link>
            </nav>
            <nav class="nav nav-group" :class="{'cur-page': route === '/group'}">
                <router-link to="group">
                    <div class="nav-icon">
                        <img v-show="route !== '/group'" src="../../assets/images/icons/smile_1.png" alt="">
                        <img v-show="route === '/group'" src="../../assets/images/icons/smile_2.png" alt="">
                    </div>
                    采集群
                </router-link>
            </nav>
            <nav class="nav nav-mine" :class="{'cur-page': route === '/mine'}">
                <router-link to="mine">
                    <div class="nav-icon">
                        <img v-show="route !== '/mine'" src="../../assets/images/icons/smile_1.png" alt="">
                        <img v-show="route === '/mine'" src="../../assets/images/icons/smile_2.png" alt="">
                    </div>
                    我的
                </router-link>
            </nav>
        </section>
        <!-- 返回按钮 -->
        <section v-show="!showNav" @click="goBack" style="width: 100%">
            <p class="back"> 返回 </p>
        </section>
    </footer>
</template>
<script>
    export default {
        props: {
            'showNav': {
                type: Boolean,
                default: true
            }
        },
        computed: {
            route () {
                return this.$route.path
            }
        },
        methods: {
            goBack () {
                this.$router.back()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/css/px2rem.scss';

    .footer {
        background-color: #ffffff;
        position: fixed;
        width: 100%;
        bottom: 0px;
        height: px2rem(99);
        display: -webkit-box;
        padding-top: 0px;
        border-top: 2px solid #e94d00;
        box-sizing: border-box;
        z-index: 99;

        nav {
            -webkit-box-flex: 1;
            text-align: center;
            width: 25%;

            a {
                /* 增加可点击区域 */
                margin: px2rem(-30) px2rem(-80);
                padding: px2rem(30) px2rem(80);
                font-size: px2rem(24);
                text-align: center;
                font-weight: 400;
                line-height: px2rem(96);
                color: #808080;
            }

            .nav-icon {
                width: px2rem(22);
                height: px2rem(22);
                margin: 0 auto;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .cur-page.nav {
            background-color: #e94d00;

            a {
                color: #ffffff;
            }

        }

        .nav-home::after,
        .nav-meat::after,
        .nav-group::after,
        .nav-mine::after {
            text-align: center;
            display: inline-block;
            font-size: px2rem(24);
        }

        .nav-home::after {
            content: "首页";
        }

        .nav-meat::after {
            content: "肉单";
        }

        .nav-group::after {
            content: "采集群";
        }

        .nav-mine::after {
            content: "我的";
        }

        .back {
            width: 100%;
            height: px2rem(92);
            line-height: px2rem(92);
            text-align: center;
            font-size: px2rem(24);
            color: #ffffff;
        }
    }

    .footer.go-back {
        height: px2rem(92);
    }

    .go-back {
        background: #ff2c43;
        display: none;
    }

</style>
