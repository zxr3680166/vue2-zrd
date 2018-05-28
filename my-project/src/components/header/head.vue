<template>
    <div>
        <x-header class="header"
                  :class="{'hide': !showHeader}"
                  title="slot:overwrite-title"
                  :left-options="{backText: '朋友圈文案'}">
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
            <popup v-model="showPop" :show-mask="false" position="top" class="popUp_nav">
                <!-- group already has a top border, so we need to hide header's bottom border-->
                <popup-header
                        right-text="关闭"
                        title="全部分类"
                        :show-bottom-border="false"
                        @on-click-right="showPop = false">
                </popup-header>
                <group gutter="0">
                    <checker v-model="classify" radio-required default-item-class="checkr-item"
                             selected-item-class="checkr-item-selected">
                        <checker-item value='1'>分类</checker-item>
                        <checker-item value='2'>分类</checker-item>
                        <checker-item value='3'>分类</checker-item>
                        <checker-item value='4'>分类</checker-item>
                        <checker-item value='5'>分类</checker-item>
                        <checker-item value='6'>分类</checker-item>
                        <checker-item value='7'>分类</checker-item>
                        <checker-item value='8'>分类</checker-item>
                    </checker>
                </group>
            </popup>
        </div>
    </div>
</template>
<script>
    import { Group, Checker, CheckerItem, TransferDom, PopupHeader, Popup, XHeader, Search, Toast } from 'vux'

    export default {
        name: 'head-nav',
        data () {
            return {
                showPop: false, // 分类导航弹出
                classify: '', // 分类选择
                showHeader: true,
                results: [],
                searchValue: '',
            }
        },
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
            margin: 0 30px 0 88px;
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
