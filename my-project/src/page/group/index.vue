<template>

    <div class="group">
        <!-- 搜索栏 -->
        <head-nav></head-nav>

        <!-- 顶部导航 -->
        <tab class="groupTab" :line-width="3" custom-bar-width="100%"
             active-color="#fff" bar-active-color="#fff" v-model="index">
            <tab-item v-for="(item, idx) in tabList"
                      :selected="idx === index"
                      :key="idx">{{ item }}
            </tab-item>
        </tab>

        <!-- 正文 -->
        <swiper class="tabContainer" v-model="index" height="100%" :show-dots="false">
            <swiper-item class="swiperItem" v-for="(item, idx) in tabList" :key="idx">
                <div class="tab-swiper vux-center">
                    <!-- 商品列表 -->
                    <group-list v-if="hasGetData"></group-list>
                </div>
            </swiper-item>
        </swiper>
    </div>

</template>

<script>
    import headNav from '../../components/header/head_2'
    import groupList from '../../components/common/groupList'
    import {Tab, TabItem, Swiper, SwiperItem} from 'vux'

    export default {
        name: 'group',
        data() {
            return {
                tabList: ['最近2小时销量排行', '最近24小时销量排行', '联盟大全'],
                index: 0,
                hasGetData: true,
            }
        },

        components: {
            groupList,
            headNav,
            Tab,
            TabItem,
            Swiper,
            SwiperItem
        },
    }
</script>

<style lang="less">

    .group {
        height: 100%;
        width: 100%;

        .groupTab {
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
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;
                transform: translate3d(0, 0, 0);
                &::-webkit-scrollbar {
                    width: 0;
                    display: none;
                }
            }
        }
    }

</style>