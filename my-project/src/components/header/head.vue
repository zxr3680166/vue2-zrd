<template>
    <div>
        <x-header class="header"
                  :class="{'hide': !showHeader}"
                  title="slot:overwrite-title"
                  :left-options="{showBack: false}">
            <search class="search_Bar"
                    slot="overwrite-title"
                    @result-click="resultClick"
                    @on-change="getResult"
                    :results="results"
                    v-model="searchValue"
                    position="absolute"
                    auto-scroll-to-top
                    top="0px"
                    @on-focus="onFocus"
                    @on-cancel="onCancel"
                    @on-submit="onSubmit"
                    ref="search"
                    placeholder="找肉单，就上找肉单App">
            </search>
            <x-icon @click="showPop=!showPop" slot="right" type="navicon" size="35"
                    style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
        </x-header>
        <div v-transfer-dom>
            <popup v-model="showPop" :show-mask="true" position="top" class="popUp_nav">
                <!-- group already has a top border, so we need to hide header's bottom border-->
                <popup-header
                        right-text="关闭"
                        title="全部分类"
                        :show-bottom-border="false"
                        @on-click-right="showPop = false">
                </popup-header>
                <group gutter="0">
                    <checker v-model="classify" radio-required default-item-class="checkr-item"
                             selected-item-class="checkr-item-selected" @on-change="onChange">
                        <checker-item v-for="(item,idx) in classifyList" :value='idx' :key="idx">{{item.name}}
                        </checker-item>
                    </checker>
                </group>
            </popup>
        </div>
        <div v-transfer-dom>
            <toast v-model="showPositionValue" :time="800" is-show-mask :type="toastType" :text="toastText"
                   :position="position" width="12em">{{toastText}}
            </toast>
        </div>
    </div>
</template>
<script>
    import {Group, Checker, CheckerItem, TransferDom, PopupHeader, Popup, XHeader, Search, Toast} from 'vux'
    import {mapState} from 'vuex'

    export default {
        name: 'head-nav',
        data() {
            return {
                showPop: false, // 分类导航弹出
                classify: '', // 分类选择
                classifyList: [{
                    cid: 1,
                    name: '女装',
                }, {
                    cid: 2,
                    name: '男装',
                }, {
                    cid: 3,
                    name: '内衣',
                }, {
                    cid: 4,
                    name: '母婴',
                }, {
                    cid: 5,
                    name: '美妆',
                }, {
                    cid: 6,
                    name: '居家',
                }, {
                    cid: 7,
                    name: '鞋包配饰',
                }, {
                    cid: 8,
                    name: '美食',
                }, {
                    cid: 9,
                    name: '文体车品',
                }, {
                    cid: 10,
                    name: '数码家电',
                }, {
                    cid: 11,
                    name: '运动户外',
                }, {
                    cid: 12,
                    name: '其他',
                }],
                showHeader: true,
                results: [],
                searchValue: '',
                keyword: '',
                position: 'default',
                toastText: '',
                toastType: 'success',
                showPositionValue: false
            }
        },
        computed: {
            ...mapState([
                'classify_selected',
                'isSearching',
                'hackReset',
            ]),

        },
        props: ['type', 'index'],
        directives: {
            TransferDom
        },
        components: {
            Group,
            Checker,
            CheckerItem,
            PopupHeader,
            Popup,
            XHeader,
            Toast,
            Search,
        },
        methods: {
            setFocus() {
                this.$refs.search.setFocus()
            },
            resultClick(item) {
                // window.alert('you click the result item: ' + JSON.stringify(item))
                this.onSubmit()
            },
            getResult(val) {
                // console.log('on-change', val)
                this.results = val ? this._getResult(this.searchValue) : []
            },
            _getResult(val) {
                let rs = []
                rs.push({
                    title: `关键词：${val}<------点击搜索`,
                    other: 0
                })
                return rs
            },
            onSubmit() {
                this.$refs.search.setBlur()
                this.classify_selected.keyword = this.searchValue

                let params = {
                    type: this.index == 0 ? 'paoliang' : 'so',
                    page : 1,
                    cid: this.classify_selected.cid,
                    keyword: this.classify_selected.keyword
                }


                this.$http.post(`/api/get_tkjd_goods_list`, params).then(res => {
                    console.log('on-submit', params, res.data)

                    if (res.data.code == 200) {
                        if (res.data.data.list.length != 0) {
                            this.classify_selected.goodsListArr = res.data.data.list
                            this.isSearching.state = true
                            this.hackReset.state = false
                            this.hackReset.state = true
                        }
                        console.log('搜索结果长度:', this.classify_selected.goodsListArr[this.index].length)
                    } else {
                        this.showPosition('middle', res.data.data, 'warn')
                    }
                })

            },
            onFocus() {
                // console.log('on focus')
            },
            onCancel() {
                // console.log('on cancel')
                this.isSearching.state = false
                this.classify_selected.goodsListArr = []
                this.classify_selected.keyword = ''
                this.hackReset.state = false
                this.hackReset.state = true
            },
            onChange() {
                this.showPop = !this.showPop
                this.classify_selected.cid = this.classifyList[this.classify].cid
                this.classify_selected.name = this.classifyList[this.classify].name
                // console.log(this.classify_selected)
            },
            showPosition(position, text, type) {
                this.position = position
                this.toastText = text
                this.toastType = type
                this.showPositionValue = true
            },


        }
    }

</script>

<style lang="scss">
    @import '../../assets/css/mixin';

    .vux-header.header {
        background-color: #ff2200;
        width: 100%;

        .vux-header-left {
            left: 0;
        }
        .vux-header-right {
            right: 0;
        }
        .weui-search-bar {
            background-color: #ff2200;
            width: 100%;

        }

        .vux-header-title-area {
            /*margin: 0 30px 0 88px;*/
            margin: 0 30px 0 0px;
        }

        .weui-cells.vux-search_show .weui-cell:last-child {
            margin-bottom: 5px;
            border-bottom: 3px solid $red;
        }

    }

    .popUp_nav {
        .vux-popup-header {
            color: $red;
            background-color: #ffebe8;
        }

        .checkr-item {
            @include wh(102px, 50px);
            @include borderRadius(5px);
            @include sc(16px, $red);
            line-height: 50px;
            background-color: #ffebe8;
            text-align: center;
            margin: 15px 38px;
        }
        .checkr-item-selected {
        }

    }

</style>
