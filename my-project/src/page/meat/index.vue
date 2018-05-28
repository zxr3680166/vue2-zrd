<template>

    <div class="meat">
        <div class="meatHead">肉单</div>

        <!-- 顶部导航 -->
        <tab class="meatTab" :line-width="3" custom-bar-width="0px"
             active-color="#fff" bar-active-color="#fff" v-model="index">
            <tab-item class="meatTabItem" v-for="(item, idx) in tabList"
                      :selected="idx === index"
                      :key="idx">{{ item }}
            </tab-item>
        </tab>

        <!-- 正文 -->
        <swiper class="tabContainer" v-model="index" height="100%" :show-dots="false">
            <swiper-item class="swiperItem" v-for="(item, idx) in tabList" :key="idx">
                <div class="tab-swiper vux-center">
                    <!-- 商品列表 -->
                    <goods-list v-if="hasGetData"></goods-list>
                </div>
            </swiper-item>
        </swiper>
    </div>

</template>

<script>
    import headNav from '../../components/header/head'
    import goodsList from '../../components/common/goodsList'
    import { Tab, TabItem, Swiper, SwiperItem } from 'vux'

    export default {
        name: 'meat',
        data () {
            return {
                tabList: ['预告版', '常规版'],
                index: 0,
                hasGetData: true,
            }
        },

        components: {
            goodsList,
            headNav,
            Tab,
            TabItem,
            Swiper,
            SwiperItem
        },
    }
</script>

<style lang="scss">
    @import '../../assets/css/mixin';

    .meat {
        height: 100%;
        width: 100%;

        .meatHead {
            @include wh(100%, 65px);
            @include sc(28px, #fff);
            background-color: $red;
            line-height: 65px;
            text-align: center;
        }

        .meatTab {
            @include sc(16px, $red);
            margin: 4px 2px;
            padding-top: 65px;

            .meatTabItem {
                line-height: 65px;
                background: none;
                border: 1px solid $red !important;

            }

            .vux-tab-container {
                height: auto;

                .vux-tab {
                    background-color: #fff;
                    color: $red;
                    height: auto;

                    .vux-tab-item.vux-tab-selected {
                        background-color: $red;
                        color: #fff;
                    }

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