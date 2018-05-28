<template>
    <div>
        <x-header class="header_2"
                  :class="{'hide': !showHeader}"
                  title="slot:overwrite-title"
                  @on-click-back="showPop=!showPop">
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
                    cancel-text=""
                    placeholder="找肉单，就上找肉单App">
            </search>
            <x-button @click.native="showPop=!showPop" class="condition" slot="overwrite-left" mini plain type="warn">选择筛选条件
            </x-button>
            <span slot="right" @click="onSubmit">搜索</span>
        </x-header>
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
    </div>
</template>
<script>
    import { XButton, Group, Checklist, TransferDom, PopupHeader, Popup, XHeader, Search, Toast } from 'vux'

    export default {
        name: 'head-nav',
        data () {
            return {
                showPop: false, // 分类导航弹出
                classify: '',
                showHeader: true,
                results: [],
                searchValue: '',
                commonList: [ '去重', '聚划算', '淘抢购', '过夜单' ], // 分类选择
                checklist: [],
            }
        },
        directives: {
            TransferDom
        },
        components: {
            XButton,
            Group,
            Checklist,
            PopupHeader,
            Popup,
            XHeader,
            Toast,
            Search,
        },
        methods: {
            setFocus () {
                this.$refs.search.setFocus()
            },
            resultClick (item) {
                window.alert('you click the result item: ' + JSON.stringify(item))
            },
            getResult (val) {
                console.log('on-change', val)
                this.results = val ? this._getResult(this.searchValue) : []
            },
            _getResult (val) {
                let rs = []
                for (let i = 0; i < 20; i++) {
                    rs.push({
                        title: `${val} result: ${i + 1} `,
                        other: i
                    })
                }
                return rs
            },
            onSubmit () {
                this.$refs.search.setBlur()
                this.$vux.toast.show({
                    type: 'text',
                    position: 'top',
                    text: 'on submit'
                })
            },
            onFocus () {
                console.log('on focus')
            },
            onCancel () {
                console.log('on cancel')
            },
            change (val, label) {
                console.log('change', val, label)
            },

        }
    }

</script>

<style lang="scss">
    @import '../../assets/css/mixin';

    .vux-header.header_2 {
        background-color: #ff2200;
        width: 100%;

        .vux-header-left {
            left: 0;
            padding: 0 5px;
            top: 10px;
            width: 98px;

            .condition {
                @include sc(12px, $red);
                @include borderRadius(0px);
                background-color: #fff;
                margin: 0;
                padding: 1px 10px;
            }
        }
        .vux-header-right {
            right: 15px;
        }
        .weui-search-bar {
            background-color: #ff2200;
            width: 100%;

        }

        .vux-header-title-area {
            margin: 0 43px 0 100px;
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
