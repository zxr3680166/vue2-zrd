<template>
    <div class="profile_page">
        <section>
            <section class="profile-number">
                <router-link :to="userInfo&&userInfo.id? '/profile/info' : '/login'" class="profile-link">
                    <flexbox orient="vertical" :gutter="5">
                        <flexbox-item>
                            <img :src="userInfo.headimgurl" class="privateImage"
                                 v-if="userInfo&&userInfo.id">
                            <span class="privateImage" v-else>
                                <svg class="privateImage-svg">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink"
                                         xlink:href="#headimgurl-default"></use>
                                </svg>
                            </span>
                        </flexbox-item>
                        <flexbox-item class="user-info">{{nickname}}</flexbox-item>
                        <flexbox-item class="user-info"><img src="../../assets/images/icons/level.png">Lv.{{privilege}}&nbsp;&nbsp;
                            积分:{{pointNumber}}
                        </flexbox-item>
                    </flexbox>
                </router-link>
            </section>
            <section class="info-data">
                <flexbox :gutter="2">
                    <flexbox-item class="info-data-info">
                        <div @click="openPopUp('爆料肉单')" class="info-data-link">
                            <div class="info-data-top"><img src="../../assets/images/icons/infoDate-1.png"></div>
                            <div class="info-data-bottom">爆料肉单</div>
                        </div>
                    </flexbox-item>
                    <flexbox-item class="info-data-info">
                        <router-link to="/mine" class="info-data-link">
                            <div class="info-data-top"><img src="../../assets/images/icons/infoDate-2.png"></div>
                            <div class="info-data-bottom">积分中心</div>
                        </router-link>
                    </flexbox-item>
                    <flexbox-item class="info-data-info">
                        <router-link to="/mine" class="info-data-link">
                            <div class="info-data-top"><img src="../../assets/images/icons/infoDate-3.png"></div>
                            <div class="info-data-bottom">分享有礼</div>
                        </router-link>
                    </flexbox-item>
                </flexbox>
            </section>
            <section class="profile-list">
                <flexbox orient="vertical" :gutter="5">
                    <!-- 提交商品 -->
                    <flexbox-item class="listContainer" v-for="(item,index) in profileList"
                                  @click.native="listClick(item)" :key="index">
                        <aside>
                            <img :src="require('../../assets/images/icons/list-' + item.index + '.png')">
                        </aside>
                        <div class="listContainer-div">
                            <span>{{item.name}}</span>
                            <span class="itemInfo">{{item.info}}</span>
                            <span class="listContainer-divsvg">
                            <x-icon type="ios-arrow-right" size="30"></x-icon>
                        </span>
                        </div>
                    </flexbox-item>
                </flexbox>

            </section>
        </section>

        <div v-transfer-dom>
            <popup v-model="popUp.show" class="popUp_form" height="100%">
                <popup-header
                        class="popUp_form_header"
                        :title="popUp.title"
                        left-text="返回"
                        right-text="提交"
                        :show-bottom-border="false"
                        @on-click-right="onSubmit()"
                        @on-click-left="popUp.show = false">
                </popup-header>
                <flexbox orient="vertical" :gutter="10">
                    <flexbox-item class="popUp_form_detail">
                        <group :gutter="0" class="popUp_form_group">
                            <x-input class="textarea_input" placeholder="请填写商品链接"></x-input>
                        </group>
                    </flexbox-item>
                    <flexbox-item class="popUp_form_detail">
                        <group :gutter="0" class="popUp_form_group">
                            <x-input class="textarea_input" placeholder="请填写商品标题"></x-input>
                        </group>
                    </flexbox-item>
                    <flexbox-item class="popUp_form_detail">
                        <group :gutter="0" class="popUp_form_group">
                            <x-input class="textarea_input" placeholder="请填写优惠券链接"></x-input>
                        </group>
                    </flexbox-item>
                    <flexbox-item class="popUp_form_detail">
                        <group :gutter="0" class="popUp_form_group">
                            <flexbox :gutter="11">
                                <flexbox-item :span="1/3">
                                    <x-input class="textarea_input price" placeholder="请填写惠后价"></x-input>
                                </flexbox-item>
                                <flexbox-item :span="1/3">
                                    <x-input class="textarea_input ratling" placeholder="请填写佣金"></x-input>
                                </flexbox-item>
                                <flexbox-item :span="1/4">
                                    <x-button class="textarea_input button" text="请选分类"
                                              @click.native="showPop = true"></x-button>
                                </flexbox-item>
                            </flexbox>
                        </group>
                    </flexbox-item>
                    <flexbox-item class="popUp_form_detail">
                        <x-textarea class="textarea_input" title="" :max="200" placeholder="请填写完善朋友圈文案"
                                    :show-counter="false"
                                    :rows="8" :cols="30"></x-textarea>
                    </flexbox-item>
                </flexbox>

                <uploader :thumbnails="popUp.thumbnails"></uploader>
                <datetime class="popUp_form_time" v-model="popUp.time" format="YYYY-MM-DD HH:mm"
                          :minute-list="['00', '15', '30', '45']"
                          @on-change="change" title="选择时间"></datetime>

                <div class="explain">*审核通过后将消耗<em>100积分/次</em></div>

            </popup>
        </div>

        <div v-transfer-dom>
            <popup v-model="showPop" :show-mask="false" position="top" class="popUp_nav">
                <popup-header
                        right-text="关闭"
                        title="全部分类"
                        :show-bottom-border="false"
                        @on-click-right="showPop = false">
                </popup-header>
                <group gutter="0">
                    <checklist title="选择筛选条件" required :options="commonList"
                               v-model="checklist" @on-change="change"></checklist>
                </group>
            </popup>
        </div>

        <div v-transfer-dom>
            <popup v-model="popUp_pid.show" class="popUp_form" height="120px">
                <popup-header
                        class="popUp_form_header"
                        :title="popUp_pid.title"
                        left-text="返回"
                        right-text="提交"
                        :show-bottom-border="false"
                        @on-click-right="onSubmit_pid()"
                        @on-click-left="popUp_pid.show = false">
                </popup-header>
                <flexbox orient="vertical" :gutter="10">
                    <flexbox-item class="popUp_form_detail">
                        <group :gutter="0" class="popUp_form_group">
                            <x-input class="textarea_input" placeholder="请填写PID" v-model="pid"></x-input>
                        </group>
                    </flexbox-item>

                </flexbox>
            </popup>
        </div>

        <div v-transfer-dom>
            <popup v-model="popUp_set.show" class="popUp_form" height="120px">
                <popup-header
                        class="popUp_form_header"
                        :title="popUp_set.title"
                        left-text="返回"
                        @on-click-left="popUp_set.show = false"
                        :show-bottom-border="false">
                </popup-header>
                <flexbox orient="vertical" class="">
                    <flexbox-item>
                        <div class="">
                            <x-switch :title="setArray.tkl.title[setArray.tkl.value]" :value-map="setArray.tkl.valueMap"
                                      v-model="setArray.tkl.value" @on-change="onChange_tkl"></x-switch>
                        </div>
                    </flexbox-item>

                </flexbox>
            </popup>
        </div>


        <div v-transfer-dom>
            <toast v-model="showPositionValue" :time="800" is-show-mask :type="toastType" :text="toastText"
                   :position="position" width="10em">{{toastText}}
            </toast>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import {
        Alert,
        Checklist,
        Datetime,
        Flexbox,
        FlexboxItem,
        Group,
        Popup,
        PopupHeader,
        Toast,
        TransferDom,
        XButton,
        XInput,
        XSwitch,
        XTextarea,
    } from 'vux'
    import uploader from '../../components/common/Uploader_2'

    export default {
        data () {
            return {
                profiletitle: '我的',
                nickname: '登录/注册',           //用户名
                pid: '',
                resetname: '',
                mobile: '暂无绑定手机号',             //电话号码
                balance: 0,            //我的余额
                privilege: 0,             //等级
                pointNumber: 0,       //积分数
                headimgurl: '',            //头像地址
                profileList: [
                    {
                        index: 1,
                        name: '提交商品',
                        info: '',
                    }, {
                        index: 2,
                        name: '我的商品',
                        info: '',
                    }, {
                        index: 3,
                        name: '绑定PID',
                        info: '',
                    }, {
                        index: 4,
                        name: '消息中心',
                        info: '《如何成为一个地推高手》',
                    }, {
                        index: 5,
                        name: '联系客服',
                        info: '微信：wx18882256',
                    }, {
                        index: 6,
                        name: '帮助中心',
                        info: '',
                    }, {
                        index: 7,
                        name: '设置中心',
                        info: '',
                    },
                ],
                position: 'default',
                toastText: '',
                toastType: 'success',
                showPositionValue: false,
                popUp: {
                    show: false,
                    title: '提交商品',
                    thumbnails: [],
                    time: '2018-05-28 09:00'
                },
                showPop: false,
                commonList: ['去重', '聚划算', '淘抢购', '过夜单'], // 分类选择
                checklist: [],
                popUp_pid: {
                    show: false,
                    title: '设置PID',
                },
                popUp_set: {
                    show: false,
                    title: '设置中心',
                },
                setArray: {
                    tkl: {
                        title: ['淘口令口令版', '淘口令链接版'],
                        value: 0,
                        valueMap: [0, 1]
                    }
                },

            }
        },
        mounted () {
            this.initData()
        },
        components: {
            Toast,
            XSwitch,
            Alert,
            Datetime,
            Checklist,
            XInput,
            XTextarea,
            TransferDom,
            PopupHeader,
            Popup,
            XButton,
            Flexbox,
            FlexboxItem,
            Group,
            uploader,
        },
        directives: {
            TransferDom
        },
        computed: {
            ...mapState([
                'userInfo',
            ]),

        },

        methods: {
            initData () {
                if (this.userInfo && this.userInfo.id) {
                    this.headimgurl = this.userInfo.headimgurl
                    this.nickname = this.userInfo.nickname
                    this.mobile = this.userInfo.mobile || '暂无绑定手机号'
                    // this.balance = this.userInfo.balance
                    this.privilege = this.userInfo.privilege
                    // this.pointNumber = this.userInfo.point
                    this.pid = this.userInfo.pid
                } else {
                    this.nickname = '登录/注册'
                    this.mobile = '暂无绑定手机号'
                }
            },
            listClick (item) {
                if (item.index == 1) {
                    this.openPopUp(item.name)
                } else if (item.index == 3) {
                    this.popUp_pid.show = true
                } else if (item.index == 7) {
                    this.popUp_set.show = true
                }
            },
            onSubmit () {

            },
            onSubmit_pid () {
                this.$http.post(`/api/update_pid`, {pid: this.pid}).then(res => {
                    if (res.data.code == 200) {
                        this.showPosition('middle', 'PID设置成功', 'success')
                        this.userInfo.pid = this.pid
                        this.popUp_pid.show = false
                    }
                })
            },
            change (val, label) {
                console.log('change', val, label)
            },
            log (str1, str2 = '') {
                console.log(str1, str2)
            },
            onConfirm (val) {
                console.log('on-confirm arg', val)
                console.log('current value', this.value1)
            },
            openPopUp (item) {
                this.popUp.show = !this.popUp.show
                this.popUp.title = item
            },
            showPosition (position, text, type) {
                this.position = position
                this.toastText = text
                this.toastType = type
                this.showPositionValue = true
            },
            onChange_tkl (Val) {
                // console.log('淘口令设置', Val + 1)
                this.$http.post(`/api/update_tkl_type`, {tkl_type: Val + 1}).then(res => {
                    if (res.data.code == 200) {
                        this.showPosition('middle', '淘口令设置成功', 'success')
                        this.userInfo.pid = this.pid
                        this.popUp_pid.show = false
                    }
                })
            },
        },
        watch: {
            userInfo: function (value) {
                this.initData()
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../assets/css/mixin';

    .profile_page {
        background: #eaeaea;
        @include wh(100%, 100%);

        div, p, span {
            font-family: Helvetica Neue, Tahoma, Arial;
        }
    }

    .profile-number {

        .profile-link {
            display: flex;
            box-align: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            background: $red;
            padding: 66px 60px;

            .privateImage {
                display: block;
                margin: 0 auto;
                @include wh(201px, 201px);
                border-radius: 50%;
                vertical-align: middle;
                .privateImage-svg {
                    background: $fc;
                    border-radius: 50%;
                    @include wh(201px, 201px);
                }
            }
            .user-info {
                text-align: center;
                @include sc(12px, $fc);

                img {
                    @include wh(37px, 29px);
                    vertical-align: sub;
                }

            }
        }
    }

    .info-data {
        width: 100%;
        margin: 5px 0;

        .info-data-info {
            background: $fc;
            padding: 10px 0;

            .info-data-link {
                text-align: center;
                background: $fc;

                .info-data-top {
                    text-align: center;

                    img {
                        @include wh(81px, 70px)
                    }
                }
                .info-data-bottom {
                    @include sc(16px, #666);

                }
            }
        }

    }

    .profile-list {
        margin-top: 5px;

        .listContainer {
            background: $fc;
            padding-left: 100px;
            display: flex;
            align-items: center;

            aside {
                @include wh(50px, 50px);
                margin-right: 16px;
                display: flex;
                align-items: center;
            }
            .listContainer-div {

                width: 80%;
                padding: 15px 26px 15px 0;
                @include sc(16px, #333);
                line-height: 44px;
                display: flex;
                justify-content: space-between;

                span {
                    display: block;
                }

                .itemInfo {
                    margin-left: 40px;
                    color: #999;
                }

                .listContainer-divsvg {
                    @include wh(46px, 46px);
                    svg {
                        @include wh(100%, 100%);
                    }
                }
            }
        }
        .listContainer:nth-of-type(3) .listContainer-div {
            border: 0;
        }
    }

    .popUp_form {
        background-color: #fff;

        .popUp_form_header {
            background-color: $red;
            @include sc(16px, $fc);
            margin-bottom: 20px;

            > div,
            .vux-popup-header-title {
                color: #fff !important;
            }
        }

        .popUp_form_detail {
            @include sc(20px, #666);
            @include borderRadius(5px);
            width: 80%;
            background-color: $bc;
            text-align: center;
            line-height: 44px;

            .popUp_form_group {
                @include sc(20px, #666);
                @include borderRadius(5px);
                width: 100%;
                background-color: $bc;
                text-align: center;
                line-height: 44px;
            }

            .textarea_input {
                @include sc(20px, #000);
                @include borderRadius(5px);
                background-color: $bc;
                padding: 5px 10px;
                margin: 0px;
                text-align: center;
                position: relative;

            }

            .ratling:after,
            .price:after {
                @include sc(20px, $red);
                content: '元';
                position: absolute;
                top: 6px;
                right: 5px;
            }

            .ratling:after {
                content: '%';
            }

            .button {
                padding: 0 10px;
                color: #666;
            }

            .button:after {
                border: none;
            }

        }

        .explain,
        .popUp_form_time {
            text-align: center;
            width: 80%;
            margin: 0 auto;
            margin-bottom: 10px;
            @include sc(16px, #666);

            em {
                color: $red;
            }
        }

    }

</style>
