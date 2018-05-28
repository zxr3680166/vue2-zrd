<template>
    <div class="goodslist_container">
        <ul v-load-more="loaderMore" v-if="goodsListArr.length" type="1">
            <li v-for="item in goodsListArr" class="goods_li">
                <section>
                    <img :src="require('../../assets/images/' + item.image_path)" class="goods_img">
                </section>
                <group class="goods_right" :gutter="0">
                    <header class="goods_detail_header">
                        <flexbox orient="vertical">
                            <flexbox-item>
                                <h3 v-show="item.showVolume" class="goods_title_home">
                                    最近2小时销售{{item.sales_Volume}}件</h3>
                            </flexbox-item>
                            <flexbox-item>
                                <h4 :class="item.is_premium? 'premium': ''" class="goods_title">
                                    {{item.name}}</h4>
                            </flexbox-item>
                        </flexbox>
                    </header>
                    <flexbox class="info_detail">
                        <flexbox-item :span="1/5">
                            <div class="goods_info">¥{{item.price}}</div>
                        </flexbox-item>
                        <flexbox-item :span="1/3">
                            <div class="goods_info">佣金：{{item.rating}}%</div>
                        </flexbox-item>
                        <flexbox-item>
                            <div class="goods_info">销量：{{item.order_num}}</div>
                        </flexbox-item>
                    </flexbox>
                    <flexbox class="info_detail">
                        <flexbox-item :span="1/5">
                            <div class="goods_info">券{{item.ticket}}元</div>
                        </flexbox-item>
                        <flexbox-item :span="1.2/3" @click.native="openFriend(item)">
                            <x-button v-if="!item.friend" mini type="warn" class="mini_button">
                                朋友圈文案
                            </x-button>
                            <x-button v-else mini type="" class="mini_button dis">
                                完善朋友圈
                            </x-button>
                        </flexbox-item>
                        <flexbox-item>
                            <div class="goods_info">剩余：{{item.remaind_num}}</div>
                        </flexbox-item>
                    </flexbox>
                    <flexbox class="info_detail">
                        <flexbox-item :span="1/2">
                            <x-button mini type="warn" class="share_button">复制淘口令</x-button>
                        </flexbox-item>
                        <flexbox-item :span="1/2">
                            <x-button mini type="warn" class="share_button">分享到微信</x-button>
                        </flexbox-item>
                    </flexbox>
                </group>
                <section class="weixin_button">
                    <img src="../../assets/images/icons/weixin_icon.png">
                </section>
            </li>
        </ul>
        <ul v-else class="animation_opactiy">
            <li class="list_back_li" v-for="item in 10" :key="item">
                <img src="../../assets/images/shopback.svg" class="list_back_svg">
            </li>
        </ul>
        <p v-if="touchend" class="empty_data">请取消朋友圈文案可以搜索更多</p>
        <aside class="return_top" @click="backTop" v-if="showBackStatus">
            <svg class="back_top_svg">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
            </svg>
        </aside>
        <div ref="abc" style="background-color: red;"></div>
        <transition name="loading">
            <load-more v-show="showLoading" tip="正在加载"></load-more>
        </transition>
        <div v-transfer-dom>
            <popup v-model="friendPop" class="popUp_friend">
                <popup-header
                        class="popUp_friend_header"
                        title="完善朋友圈文案"
                        :show-bottom-border="false">
                </popup-header>
                <div class="link">{{popInfo.link}}</div>
                <div class="title">{{popInfo.title}}</div>
                <x-textarea class="textarea_input" title="" :max="200" placeholder="请填写完善朋友圈文案" :show-counter="false"
                            :rows="8" :cols="30"></x-textarea>
                <uploader :thumbnails="thumbnails"></uploader>
                <flexbox :gutter="0" class="button_wrap">
                    <flexbox-item :span="1/2">
                        <x-button mini type="warn" class="share_button" @click.native="friendPop = !friendPop">取消</x-button>
                    </flexbox-item>
                    <flexbox-item :span="1/2">
                        <x-button mini type="warn" class="share_button" @click.native="confirmPop = !confirmPop">提交
                        </x-button>
                    </flexbox-item>
                </flexbox>
            </popup>
        </div>
        <div v-transfer-dom>
            <alert v-model="confirmPop" class="confirm" title="提示" @on-show="onShow" @on-hide="onHide">
                感谢您的完善，我们会尽快审核
                <br>
                审核并采纳将奖励<em>100积分</em>
                <br>
                <a class="integral">[积分用途]</a>
            </alert>
        </div>
    </div>
</template>

<script>
    import {
        AlertModule,
        Alert,
        XTextarea,
        TransferDom,
        PopupHeader,
        Popup,
        XButton,
        Flexbox,
        FlexboxItem,
        Group,
        LoadMore
    } from 'vux'
    import { loadMore } from '../../assets/js/mixin'
    import { showBack, animate } from '../../assets/js/mUtils'
    import uploader from './Uploader'

    export default {
        data () {
            return {
                offset: 0, // 批次加载商品列表，每次加载20个 limit = 20
                goodsListArr: [// 商品列表数据
                    {
                        link: 'https://doc.vux.li/zh-CN/components/cell.html',
                        image_path: 'goods_0.png', // 商品图
                        showVolume: true, // 是否显示销量
                        sales_Volume: 5000, // 2小时销量
                        is_premium: true, // 品牌
                        name: '【马丁】男士洗发水沐浴露套装2瓶', // 商品名
                        price: 20.6, // 价格
                        rating: 30, // 佣金
                        order_num: 8888, // 销量
                        ticket: 60, // 券价格
                        friend: true, // 朋友圈文案
                        remaind_num: 5000, // 剩余数量
                    },
                    {
                        link: 'https://doc.vux.li/zh-CN/components/cell.html',
                        image_path: 'goods_1.png', // 商品图
                        showVolume: true, // 是否显示销量
                        sales_Volume: 500, // 2小时销量
                        is_premium: true, // 品牌
                        name: '【马丁】男士洗发水沐浴露套装2瓶', // 商品名
                        price: 120.6, // 价格
                        rating: 80, // 佣金
                        order_num: 888, // 销量
                        ticket: 60, // 券价格
                        friend: false, // 朋友圈文案
                        remaind_num: 800, // 剩余数量
                    },
                    {
                        link: 'https://doc.vux.li/zh-CN/components/cell.html',
                        image_path: 'goods_2.png', // 商品图
                        showVolume: true, // 是否显示销量
                        sales_Volume: 5000, // 2小时销量
                        is_premium: true, // 品牌
                        name: '【马丁】男士洗发水沐浴露套装2瓶', // 商品名
                        price: 20.6, // 价格
                        rating: 30, // 佣金
                        order_num: 8888, // 销量
                        ticket: 60, // 券价格
                        friend: true, // 朋友圈文案
                        remaind_num: 5000, // 剩余数量
                    },
                    {
                        link: 'https://doc.vux.li/zh-CN/components/cell.html',
                        image_path: 'goods_3.png', // 商品图
                        showVolume: true, // 是否显示销量
                        sales_Volume: 500, // 2小时销量
                        is_premium: true, // 品牌
                        name: '【马丁】男士洗发水沐浴露套装2瓶', // 商品名
                        price: 120.6, // 价格
                        rating: 80, // 佣金
                        order_num: 888, // 销量
                        ticket: 60, // 券价格
                        friend: false, // 朋友圈文案
                        remaind_num: 800, // 剩余数量
                    }
                ],
                preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
                showBackStatus: false, //显示返回顶部按钮
                showLoading: false, //显示加载动画
                touchend: false, //没有更多数据
                friendPop: false, //完事朋友圈文案
                confirmPop: false, //确认提示
                popInfo: {
                    link: '',
                    title: '',
                    text: '',
                },
                thumbnails: [],
            }
        },
        mounted () {
            // this.initData()
        },
        directives: {
            TransferDom
        },
        components: {
            Alert,
            uploader,
            XTextarea,
            PopupHeader,
            Popup,
            XButton,
            Group,
            LoadMore,
            Flexbox,
            FlexboxItem,
        },
        mixins: [loadMore],
        props: [],
        computed: {},
        updated () {
        },
        methods: {
            initData () {
                //获取数据
                /*                let res
                                // let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
                                this.shopListArr = [...res]
                                if (res.length < 20) {
                                    this.touchend = true
                                }
                                this.hideLoading()
                                //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
                                showBack(status => {
                                    this.showBackStatus = status
                                })*/
            },
            //到达底部加载更多数据
            async loaderMore () {
                /*                if (this.touchend) {
                                    return
                                }
                                //防止重复请求
                                if (this.preventRepeatReuqest) {
                                    return
                                }
                                this.showLoading = true
                                this.preventRepeatReuqest = true

                                //数据的定位加20位
                                this.offset += 20
                                let res
                                // let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);

                                this.hideLoading()
                                this.shopListArr = [...this.shopListArr, ...res]
                                //当获取数据小于20，说明没有更多数据，不需要再次请求数据
                                if (res.length < 20) {
                                    this.touchend = true
                                    return
                                }
                                this.preventRepeatReuqest = false*/
            },
            //开发环境与编译环境loading隐藏方式不同
            hideLoading () {
                this.showLoading = false
            },
            //返回顶部
            backTop () {
                animate(document.body, {scrollTop: '0'}, 400, 'ease-out')
            },
            openFriend (item) {
                this.friendPop = !this.friendPop
                this.popInfo.title = item.name
                this.popInfo.link = item.link
            },
            onShow () {
                console.log('on show')
            },
            onHide () {
                console.log('on hide')
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import '../../assets/css/mixin';

    .goodslist_container {
        background-color: #fff;
    }

    .goods_li {
        display: flex;
        margin: 5px 0;
    }

    .goods_img {
        @include wh(270px, 270px);
        display: block;
        margin-right: 5px;
    }

    .list_back_li {
        height: 485px;
        .list_back_svg {
            @include wh(100%, 100%)
        }
    }

    .goods_right {
        width: 408px;
        padding: 4px 0;

        .goods_detail_header {
            @include fj;
            align-items: center;
            .goods_title_home {
                @include font(40px, 40px, 'PingFangSC-Regular');
                color: #ff2200;
                font-weight: 700;
            }
            .goods_title {
                @include font(20px, 40px, 'PingFangSC-Regular');
                font-weight: 700;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .premium::before {
                content: '品牌';
                display: inline-block;
                color: #333;
                background-color: #ffd930;
                padding: 0 1px;
                border-radius: 1px;
                margin-right: 1px;
            }
        }

        .info_detail {
            margin-top: 5px;

            .goods_info {
                text-align: center;
                @include sc(20px, #666);
            }

            .mini_button {
                line-height: 1;
                font-size: 12px;
                padding: 0 5px;
            }
            .mini_button.dis {
                background-color: #d9d9d9;
            }

            .share_button {
                font-size: 16px;
                line-height: 40px;
            }
        }

    }

    .weixin_button {
        width: 68px;
        background-color: #ff2200;
        text-align: center;
        line-height: 269px;

        img {
            @include wh(47px, 47px);
            margin-bottom: -7px;
        }

    }

    .popUp_friend {
        @include borderRadius(10px);
        @include wh(630px, 894px);
        @include center;
        margin: 0 auto;
        background-color: #fff;

        .popUp_friend_header {
            background-color: $red;
            color: #fff;

            > div,
            .vux-popup-header-title {
                color: #fff;
            }
        }

        .link,
        .title {
            @include sc(20px, #666);
            @include borderRadius(5px);
            background-color: #f5f5f5;
            line-height: 50px;
            text-align: center;
            margin: 10px;
        }

        .textarea_input {
            @include sc(20px, #000);
            @include borderRadius(5px);
            background-color: #f5f5f5;
            padding: 10px;
            margin: 10px;

            textarea {
                background-color: #f5f5f5;
            }
        }

        .button_wrap {
            text-align: center;
        }

    }

    .confirm {
        em {
            color: $red;
        }
        .integral {
            color: $red;
        }

    }

    .empty_data {
        @include sc(20px, #666);
        text-align: center;
        line-height: 200px;
    }

    .return_top {
        position: fixed;
        bottom: 300px;
        right: 100px;
        .back_top_svg {
            @include wh(200px, 200px);
        }
    }

    .loading-enter-active, .loading-leave-active {
        transition: opacity 1s
    }

    .loading-enter, .loading-leave-active {
        opacity: 0
    }
</style>
