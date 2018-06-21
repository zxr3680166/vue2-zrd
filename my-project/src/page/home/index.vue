<template>

    <div class="home">
        <!-- 搜索栏 -->
        <head-nav :index="index" :type="index" :cid="classify_selected.cid" :goodsList="goodsList"></head-nav>

        <!-- 顶部导航 -->
        <tab class="homeTab" :line-width="3" custom-bar-width="60px"
             active-color="#fff" bar-active-color="#fff" v-model="index">
            <tab-item v-for="(item, idx) in tabList"
                      :selected="idx === index"
                      :key="idx">{{ item }}
            </tab-item>
        </tab>

        <!-- 正文 -->
        <swiper class="tabContainer" v-model="index" height="100%" :show-dots="false">
            <swiper-item class="swiperItem" v-for="(item, index) in tabList" :key="index">
                <div class="tab-swiper vux-center">
                    <!-- 商品列表 -->
                    <goods-list v-if="hackReset.state" :type="index" :cid="classify_selected.cid"
                                :goodsList="goodsList[index]"></goods-list>
                </div>
            </swiper-item>
        </swiper>


        <back-to-top :index="index"></back-to-top>

    </div>

</template>

<script>
    import headNav from '../../components/header/head'
    import goodsList from '../../components/common/goodsList'
    import backToTop from '../../components/common/backToTop'
    import {Tab, TabItem, Swiper, SwiperItem} from 'vux'
    import {mapState} from 'vuex'

    export default {
        name: 'home',
        data() {
            return {
                tabList: ['聚划算', '淘抢购', '大牌推荐', '全部商品'],
                goodsList: [[], [], [], []],// 商品列表数据
                index: 0,
            }
        },
        computed: {
            ...mapState([
                'classify_selected',
                'hackReset'
            ]),
        },
        components: {
            backToTop,
            goodsList,
            headNav,
            Tab,
            TabItem,
            Swiper,
            SwiperItem
        },
        mounted() {
            this.$nextTick(() => {
                this.hackReset.state = true
            })
        },

    }
</script>

<style lang="less">

    .home {
        height: 100%;
        width: 100%;

        .homeTab {
            .vux-tab {
                background-color: #ff2200;

                .vux-tab-item {
                    background: none;
                }
                .vux-tab-item.vux-tab-selected {
                    color: #fff;
                }

            }
        }

        .tabContainer {
            background-color: #eaeaea;
            height: 1054px;

            .swiperItem {
                /*                overflow-y: scroll;
                                -webkit-overflow-scrolling: touch;
                                transform: translate3d(0, 0, 0);
                                &::-webkit-scrollbar {
                                    width: 0;
                                    display: none;
                                }*/

                .tab-swiper {
                    height: 100%;
                }
            }
        }
    }

</style>