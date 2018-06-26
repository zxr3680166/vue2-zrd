<template>
    <div :id="'goodslist_' + index" class="goodslist_container loadmore" v-load-more="loaderMore">
        <ul v-if="goodsListArr.length > 0" type="1">
            <li v-for="(item,index) in goodsListArr" class="goods_li" :key="item.goods_id">
                <section class="imgWrapper">
                    <x-icon type="bookmark" class="bookmark" size="35" text="111"></x-icon>
                    <div class="bookmark_num">{{index+1}}</div>
                    <img :src="item.pic.indexOf('item_pic') ? item.pic + '_430x430q90.jpg' : item.pic + '_400x400.jpg_.webp'"
                         class="goods_img">
                </section>
                <group class="goods_right" :gutter="0">
                    <header class="goods_detail_header">
                        <flexbox orient="vertical">
                            <!-- <flexbox-item>
                                <h3 v-show="item.showVolume" class="goods_title_home">
                                    最近2小时销售{{item.sales}}件</h3>
                            </flexbox-item> -->
                            <flexbox-item>
                                <h4 :class="item.src? 'premium': ''" class="goods_title">
                                    {{item.goods_name}}</h4>
                            </flexbox-item>
                        </flexbox>
                    </header>
                    <flexbox class="info_detail">
                        <flexbox-item :span="1/5">
                            <div class="goods_info">¥{{item.price}}</div>
                        </flexbox-item>
                        <flexbox-item :span="1/3">
                            <div class="goods_info">佣金：{{item.rate}}%</div>
                        </flexbox-item>
                        <flexbox-item>
                            <div class="goods_info">销量：{{item.sales}}</div>
                        </flexbox-item>
                    </flexbox>
                    <flexbox class="info_detail" :gutter="0">
                        <flexbox-item :span="1.2/6">
                            <div class="goods_info">券{{item.price_coupons}}元</div>
                        </flexbox-item>
                        <flexbox-item :span="1.2/3">
                            <x-button v-if="item.is_friendpop" mini type="warn" class="mini_button" @click.native="openFriend_2(item)">
                                朋友圈文案
                            </x-button>
                            <x-button v-else mini type="" class="mini_button dis" @click.native="openFriend(item)">
                                完善朋友圈
                            </x-button>
                        </flexbox-item>
                        <flexbox-item>
                            <div class="goods_info">剩余：{{item.quan_shengyu}}</div>
                        </flexbox-item>
                    </flexbox>
                    <flexbox class="info_detail">
                        <flexbox-item :span="1/2">
                            <x-button mini type="warn" class="share_button" @click.native="copyTaoPwd(item)">复制淘口令
                            </x-button>
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
            <p class="empty_data">没有相关数据</p>
            <!--<li class="list_back_li" v-for="item in 10" :key="item">-->
            <!--<img src="../../assets/images/shopback.svg" class="list_back_svg">-->
            <!--</li>-->
        </ul>

        <!--<p v-if="touchend" class="empty_data">请取消朋友圈文案可以搜索更多</p>-->


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
                <div class="link">{{link}}</div>
                <div class="title">{{popInfo.goods_title}}</div>
                <x-textarea class="textarea_input" title="" :max="200" placeholder="请填写完善朋友圈文案" :show-counter="false"
                            :rows="8" :cols="30" v-model="popInfo.content">
                </x-textarea>
                <uploader :popInfo="popInfo"></uploader>
                <flexbox :gutter="0" class="button_wrap">
                    <flexbox-item :span="1/2">
                        <x-button mini type="warn" class="share_button" @click.native="friendPop = !friendPop">取消
                        </x-button>
                    </flexbox-item>
                    <flexbox-item :span="1/2">
                        <x-button mini type="warn" class="share_button" @click.native="onSubmit">提交
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

        <div v-transfer-dom>
            <toast v-model="showPositionValue" :time="800" is-show-mask :type="toastType" :text="toastText"
                   :position="position" width="16em">{{toastText}}
            </toast>
        </div>

        <div v-transfer-dom>
            <popup v-model="pwdPop" class="popUp_pwd">
                <popup-header
                        class="popUp_friend_header"
                        title="复制淘口令"
                        :show-bottom-border="false">
                </popup-header>
                <x-textarea class="textarea_input" title="" :max="200" placeholder="淘口令" :show-counter="false"
                            :rows="8" :cols="30" v-model="copyText">
                </x-textarea>

                <x-button type="primary" class="share_button copy-TaoPwd" :data-clipboard-text="copyText"
                          @click.native="copy">点击复制
                </x-button>

            </popup>
        </div>

        <goods-detail :popInfoDetail="popInfoDetail"></goods-detail>

    </div>
</template>

<script>
    import {
        Alert,
        Flexbox,
        FlexboxItem,
        Group,
        LoadMore,
        Popup,
        PopupHeader,
        Toast,
        TransferDom,
        XButton,
        XTextarea
    } from 'vux'
    import { loadMore } from '../../assets/js/mixin'
    import uploader from './Uploader'
    import { mapState } from 'vuex'
    import Clipboard from 'clipboard'
    import goodsDetail from '../../components/common/goodsDetail'
    import { Base64 } from 'js-base64'

    export default {
        data () {
            return {
                offset: 0, // 批次加载商品列表，每次加载20个 limit = 20
                goodsListArr: [],// 商品列表数据
                preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
                showBackStatus: false, //显示返回顶部按钮
                showLoading: false, //显示加载动画
                touchend: false, //没有更多数据
                friendPop: false, //完事朋友圈文案
                confirmPop: false, //确认提示
                link: '',
                popInfo: {
                    keyid: '', //商品自增长id
                    goods_id: '', //商品淘宝id
                    goods_title: '', //商品标题
                    content: '', // 朋友圈内容
                    image: [], // 朋友圈图片，多图以‘#’号分隔
                    market_image: [], //营销主图
                },
                popInfoDetail : {
                    content : '',
                },
                thumbnails: [], // 上传图片组
                page: 1,
                // selected: this.classify_selected,
                oldCid: 0,
                position: 'default',
                toastText: '',
                toastType: 'success',
                showPositionValue: false,
                copyText: '',
                pwdPop: false,
            }
        },
        computed: {
            ...mapState([
                'classify_selected',
                'isSearching',
                'hackReset',
                'userInfo',
            ]),
        },
        directives: {
            TransferDom
        },
        components: {
            goodsDetail,
            Toast,
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
        props: ['index', 'type', 'cid',],
        watch: {
            //cid，当值发生变化的时候重新监听
            cid: function (value) {
                // console.log('载入分类数据', this.oldCid, this.cid)

                if (this.type == 'classify') {

                    if (this.oldCid != this.cid) {
                        this.page = 1
                        this.touchend = false
                    }

                    if (this.cid != 0) {
                        this.loaderMore()
                    } else {
                        this.goodsListArr = this.classify_selected.goodsListArr
                    }
                }
            },
        },
        updated () {
        },
        methods: {
            async initData () {
                //获取数据
                this.getList(this.page)
            },
            getList (page) {

                let params = {}

                if (this.type == 'classify') {
                    params = {
                        type: this.type, //商品自增长id
                        cid: this.classify_selected.cid, //商品淘宝id
                        page: page, //商品标题
                    }

                    if (params.cid == 0) {
                        return
                    }
                } else {
                    params = {
                        type: this.type, //商品自增长id
                        page: page, //商品标题
                    }
                }

                this.$http.post(`/api/get_tkjd_goods_list`, params).then(res => {
                    // console.log(params, res.data)

                    if (this.type == 'classify') {

                        if (this.oldCid === this.cid) {
                            this.classify_selected.goodsListArr = this.classify_selected.goodsListArr.concat(res.data.data.list)
                        } else {
                            let arr = []
                            this.classify_selected.goodsListArr = arr.concat(res.data.data.list)
                            this.oldCid = this.cid
                        }

                        this.classify_selected.goodsListArr = [...new Set(this.classify_selected.goodsListArr)] // 去重

                        this.goodsListArr = this.classify_selected.goodsListArr

                        this.page += 1 //页码加1
                        if (this.classify_selected.goodsListArr.length < 20) {
                            this.touchend = true
                        }

                    } else {

                        this.goodsListArr = this.goodsListArr.concat(res.data.data.list)

                        this.goodsListArr = [...new Set(this.goodsListArr)] // 去重
                        this.page += 1 //页码加1
                        if (this.goodsListArr.length < 20) {
                            this.touchend = true
                        }

                    }

                    this.hideLoading()
                    this.preventRepeatReuqest = false
                })
            },
            //到达底部加载更多数据
            async loaderMore () {
                if (this.touchend || this.isSearching.state) {
                    return
                }
                //防止重复请求
                if (this.preventRepeatReuqest) {
                    return
                }
                this.showLoading = true
                this.preventRepeatReuqest = true
                //获取数据
                this.getList(this.page)

            },
            //复制掏口令
            copyTaoPwd (item) {
                // console.log(!!item.tao_pwd)
                if (!!item.tao_pwd) {
                    if (this.userInfo.tkl_type == 2) {
                        this.copyText = item.D_title
                            + '\n原价' + item.Org_Price + '  券后' + item.Price + '\n'
                            + '--------抢购方式--------\n'
                            + '打开连接\n' +
                            'https://wenan001.kuaizhan.com/?taowords=' + item.tao_pwd + '&pic=' + Base64.encode(item.pic) + '\n'
                    } else {
                        this.copyText = item.D_title
                            + '\n原价' + item.Org_Price + '  券后' + item.Price + '\n'
                            + '--------抢购方式--------\n'
                            + '复制本信息' + item.tao_pwd + '打开淘宝即可获取\n'
                    }
                    this.pwdPop = true

                } else {
                    this.$http.get(`/api/get_taobao_tbk_tpwd?id=${item.GoodsID}`).then(res => {
                        // console.log(res.data)
                        if (res.data.code == 200) {
                            item.tao_pwd = res.data.data.tkl
                            if (this.userInfo.tkl_type == 2) {
                                this.copyText = item.D_title
                                    + '\n原价' + item.Org_Price + '  券后' + item.Price + '\n'
                                    + '--------抢购方式--------\n'
                                    + '打开连接\n' +
                                    'https://wenan001.kuaizhan.com/?taowords=' + item.tao_pwd + '&pic=' + Base64.encode(item.pic) + '\n'
                            } else {
                                this.copyText = item.D_title
                                    + '\n原价' + item.Org_Price + '  券后' + item.Price + '\n'
                                    + '--------抢购方式--------\n'
                                    + '复制本信息' + item.tao_pwd + '打开淘宝即可获取\n'
                            }
                            this.pwdPop = true

                        } else {
                            // alert(res.data.data)
                            this.showPosition('middle', res.data.data, 'warn')
                        }
                    })
                }
            },

            //开发环境与编译环境loading隐藏方式不同
            hideLoading () {
                this.showLoading = false
            },
            openFriend (item) {
                // console.log(item)
                this.friendPop = !this.friendPop
                this.link = 'https://detail.tmall.com/item.htm?id=' + item.goods_id
                this.popInfo.keyid = item.id //商品自增长id
                this.popInfo.type = 'tkdj' //文案属于淘客基地商品
                this.popInfo.goods_id = item.goods_id //商品淘宝id
                this.popInfo.goods_title = item.goods_name
                this.popInfo.content = item.quan_guid_content
                this.popInfo.image = []// 朋友圈图片，多图以‘#’号分隔
                this.popInfo.market_image = []// 主图
            },
            openFriend_2 (item) {
                // console.log(item)
                this.$http.get(`api/get_friendpop_detail?goods_id=${item.goods_id}`).then(res => {
                    // console.log(res.data)
                    this.popInfoDetail = res.data.data.entity
                })
            },
            onShow () {
                console.log('on show')
            },
            onHide () {
                console.log('on hide')
            },
            onSubmit () {
                if (this.popInfo.market_image.length < 1 || this.popInfo.image.length < 3) {
                    this.showPosition('middle', '请上传1张主图和至少3张晒图', 'warn')
                    return
                } else {
                    this.confirmPop = !this.confirmPop
                    this.friendPop = !this.friendPop
                }

                let params = {
                    keyid: '', //商品自增长id
                    goods_id: '', //商品淘宝id
                    goods_title: '', //商品标题
                    content: '', // 朋友圈内容
                    image: [], // 朋友圈图片，多图以‘#’号分隔
                    market_image: [],
                }
                this.popInfo.market_image = this.popInfo.market_image[0]
                this.popInfo.image = this.popInfo.image.join('#')

                this.$http.post(`/api/add_friendpop`, this.popInfo).then(res => {
                    if (res.data.code == 200) {
                        // console.log(this.popInfo)
                        this.popInfo = params
                    } else {
                        this.showPosition('middle', '未知错误', 'warn')
                    }
                })
            },
            showPosition (position, text, type) {
                this.position = position
                this.toastText = text
                this.toastType = type
                this.showPositionValue = true
            },
            copy () {
                const clipboard = new Clipboard('.copy-TaoPwd')
                clipboard.on('success', e => {
                    // console.log('复制成功')
                    this.showPosition('middle', '复制成功', 'success')
                    // 释放内存
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    // console.log('复制失败')
                    // 不支持复制
                    this.showPosition('middle', '复制失败，请重试', 'warn')
                    // 释放内存
                    clipboard.destroy()
                })
                // document.getElementsByClassName("copy-TaoPwd")[this.type].click()
                this.pwdPop = false
            },

        },
        mounted () {
            this.$nextTick(() => {
                this.initData()
            })
            // this.timer = setInterval(() => {
            //     // console.log(this.$vux.toast.isVisible())
            // }, 1000)
        },
        beforeDestroy () {
            // clearInterval(this.timer)
        }

    }
</script>

<style lang="scss" scoped>
    @import '../../assets/css/mixin';

    .goodslist_container {
        background-color: $bc;
        height: 100%;
    }

    .loadmore {
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        transform: translate3d(0, 0, 0);
        &::-webkit-scrollbar {
            width: 0;
            display: none;
        }
    }

    .goods_li {
        display: flex;
        margin: 5px 0;
        background-color: $fc;

        .imgWrapper {
            position: relative;
            overflow: hidden;

            .bookmark {
                fill: #59bdb5;
                position: absolute;
                top: -10px;
                left: -6px;
                transform: scale(1.8, 1.2);
            }
            .bookmark_num {
                @include sc(12px, $fc);
                position: absolute;
                top: 0px;
                left: 0px;
                text-align: center;
                line-height: 35px;
                width: 47px;
                z-index: 99;
            }

            .goods_img {
                @include wh(270px, 270px);
                display: block;
                margin-right: 5px;
            }
        }

    }

    .list_back_li {
        height: 261px;
        .list_back_svg {
            @include wh(100%, 100%)
        }
    }

    .goods_right {
        width: 408px;
        min-width: 408px;
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
                margin-top: 20px;
            }
            .premium::before {
                content: '天猫';
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
                line-height: 30px;
                font-size: 12px;
                padding: 0 5px;
                margin-left: 5px;
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

    .popUp_pwd,
    .popUp_friend {
        @include borderRadius(10px);
        @include wh(630px, 894px);
        @include center;
        margin: 0 auto;
        background-color: #fff;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            width: 0;
            display: none;
        }

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
            padding: 0 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
            margin-bottom: 50px;
        }

    }

    .popUp_pwd {
        @include wh(630px, 500px);
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

    #back_top {
        position: fixed;
        bottom: 10%;
        right: 40px;
        width: 64px;
        height: 64px;
        border-radius: 64px;
        text-align: center;
        background-color: rgba(49, 49, 49, 0.23);

        .icon-color {
            fill: #fff;
        }
    }

    .copy-TaoPwd {
        width: 80%;
    }
</style>
