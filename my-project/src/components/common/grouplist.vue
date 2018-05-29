<template>
    <div class="grouplist_container">
        <ul v-load-more="loaderMore" v-if="groupListArr.length" type="1">
            <li v-for="(item,idx) in groupListArr" class="group_li" :key="item.id" @click="openShare(idx)">
                <section>
                    <img :src="cover(item.image)" class="group_img">
                </section>
                <group class="group_right" :gutter="0">
                    <header class="group_detail_header">
                        <flexbox orient="vertical">
                            <flexbox-item>
                                <h4 class="group_title">{{item.title}}</h4>
                            </flexbox-item>
                        </flexbox>
                    </header>
                    <p class="info_detail f12" :gutter="0">{{item.tip}}</p>
                </group>
                <div class="group_mask" v-if="item.showMask">
                    <flexbox orient="vertical" :gutter="0">
                        <flexbox-item>券剩余：{{item.remaind_num}}</flexbox-item>
                        <flexbox-item>天猫</flexbox-item>
                        <flexbox-item>月销量：{{item.order_num}}</flexbox-item>
                        <flexbox-item>评分：{{item.rate}}</flexbox-item>
                        <flexbox-item>淘群购</flexbox-item>
                        <flexbox-item>05-16 22:00</flexbox-item>
                        <flexbox-item>近2小时销量：{{item.sales_Volume}}</flexbox-item>
                    </flexbox>
                </div>
            </li>
        </ul>
        <ul v-else class="animation_opactiy">
            <li class="list_back_li" v-for="item in 10" :key="item">
                <img src="../../assets/images/shopback.svg" class="list_back_svg">
            </li>
        </ul>
        <p v-if="touchend" class="empty_data">没有更多了</p>
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
            <popup v-model="sharePop" class="popUp_share" @on-hide="onHide">
                <popup-header
                        class="popUp_share_header"
                        title="分享到"
                        :show-bottom-border="false">
                </popup-header>
                <flexbox :gutter="0" class="button_wrap">
                    <flexbox-item :span="1/3">
                        <div class="share_icon" @click="button_1"><img src="../../assets/images/icons/weixin.png"/></div>
                        <div class="share_info">微信群</div>
                    </flexbox-item>
                    <flexbox-item :span="1/3">
                        <div class="share_icon" @click="button_2"><img src="../../assets/images/icons/weixin_2.png"/></div>
                        <div class="share_info">朋友圈</div>
                    </flexbox-item>
                    <flexbox-item :span="1/3">
                        <div class="share_icon" @click="button_3"><img src="../../assets/images/icons/taokoulin.png"/></div>
                        <div class="share_info">复制口令</div>
                    </flexbox-item>
                </flexbox>
            </popup>
        </div>
    </div>
</template>

<script>
    import {
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
                groupListArr: [// 商品列表数据
                    {
                        link: 'https://doc.vux.li/zh-CN/components/cell.html',
                        image_path: 'group_0.png', // 商品图
                        showMask: true, // 是否显示提示信息
                        sales_Volume: 5000, // 2小时销量
                        is_premium: true, // 品牌
                        name: '【马丁】男士洗发水沐浴露套装2瓶', // 商品名
                        price: 20.6, // 价格
                        rating: 30, // 佣金
                        order_num: 8888, // 销量
                        ticket: 60, // 券价格
                        share: true, // 朋友圈文案
                        remaind_num: 5000, // 剩余数量
                        rate: 4.8, // 评分
                    }
                ],
                preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
                showBackStatus: false, //显示返回顶部按钮
                showLoading: false, //显示加载动画
                touchend: false, //没有更多数据
                sharePop: false, //完事朋友圈文案
                popInfo: {
                    index: 0,
                    title: '',
                },
                page: 1//当前页数
            }
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
            cover (image){
                let name = !!image ? image.split('.')[0] : '';
                
                return `https://gchat.qpic.cn/gchatpic_new/691605980/575514581-2987620153-${name}/0?vuin=343049347&term=2`;
            },
            getList (page) {
                this.$http.get(`api/get_caijigoods_List?page=${page}&pageSize=20`).then(res => {
                    this.groupListArr = this.groupListArr.concat(res.data.data.list);
                });
            },
            //到达底部加载更多数据
            async loaderMore () {
                
            },
            //开发环境与编译环境loading隐藏方式不同
            hideLoading () {
                this.showLoading = false
            },
            //返回顶部
            backTop () {
                animate(document.body, {scrollTop: '0'}, 400, 'ease-out')
            },
            openShare(index) {
                console.log(index)
                this.sharePop = !this.sharePop
                this.popInfo.index = index
                this.groupListArr[index].showMask = false
            },
            button_1 () {
                console.log('微信群')

            },
            button_2 () {
                console.log('朋友圈')

            },
            button_3 () {
                console.log('复制口令')

            },
            onHide () {
                this.groupListArr[this.popInfo.index].showMask = true

            },
            change (val, label) {
                console.log('change', val, label)
            },
        },
        mounted (){
            this.$nextTick(() => {
                this.getList(1);
            });
        }

    }
</script>

<style lang="scss" scoped>
    @import '../../assets/css/mixin';

    .grouplist_container {
        background-color: #eaeaea;
    }

    .group_li {
        @include wh(48%, 550px);
        float: left;
        margin: 10px 1%;
        background-color: #fff;
        position: relative;
    }

    .group_img {
        @include wh(310px, 480px);
        display: block;
        margin:0 auto;
        text-align: center;
    }

    .list_back_li {
        height: 485px;
        .list_back_svg {
            @include wh(100%, 100%)
        }
    }

    .group_mask {
        @include sc(16px, #fff);
        position: absolute;
        left: 0;
        top: 0;
        background-color: #33333365;
    }

    .group_right {
        width: 100%;
        padding: 4px 0;

        .group_detail_header {
            @include fj;
            align-items: center;
            .group_title_home {
                @include font(40px, 40px, 'PingFangSC-Regular');
                color: #ff2200;
                font-weight: 700;
            }
            .group_title {
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

            .group_info {
                text-align: center;
                @include sc(20px, #666);

                em {
                    color: $red;
                }
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

    .popUp_share {
        @include borderRadius(5px);
        @include wh(100%, 286px);
        margin: 0 auto;
        background-color: #fff;

        .popUp_share_header {
            @include sc(20px, #000);
            height: 50px;
            line-height: 50px;

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

        .textarea {
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

            .share_icon {
                @include borderRadius(50%);
                @include wh(106px,106px);
                margin: 20px auto;
            }

            .share_info {
                @include sc(16px, #000);
            }
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
