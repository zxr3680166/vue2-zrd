<template>
    <div>
        <div v-transfer-dom>
            <popup v-model="detailPop" class="popUp_detail">
                <popup-header
                        class="popUp_detail_header"
                        title="朋友圈文案"
                        :show-bottom-border="false"
                        @on-hide="onHide">
                </popup-header>
                <div class="title">{{popInfoDetail.content}}</div>

                <div class="images">
                    <img class="previewer-demo-img miniImage" v-for="(item, index) in list" :src="item.src" width="100"
                         @click="show(index)" :key="item">
                </div>

                <flexbox :gutter="0" class="button_wrap">
                    <flexbox-item :span="1/3">
                        <x-button mini type="warn" class="share_button copy-Detail" :data-clipboard-text="popInfoDetail.content" @click.native="copy">复制文案
                        </x-button>
                    </flexbox-item>

                    <flexbox-item :span="1/3">
                        <x-button mini type="warn" class="share_button" @click.native="better">更好文案
                        </x-button>
                    </flexbox-item>

                    <flexbox-item :span="1/3">
                        <x-button mini type="warn" class="share_button" @click.native="onHide">关闭
                        </x-button>
                    </flexbox-item>
                </flexbox>
            </popup>
        </div>

        <div v-transfer-dom>
            <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
        </div>

        <div v-transfer-dom>
            <toast v-model="showPositionValue" :time="800" is-show-mask :type="toastType" :text="toastText"
                   :position="position" width="16em">{{toastText}}
            </toast>
        </div>

    </div>
</template>

<script>
    import {
        Flexbox,
        FlexboxItem,
        Group,
        Popup,
        PopupHeader,
        Previewer,
        Toast,
        TransferDom,
        XButton,
        XTextarea
    } from 'vux'
    import Clipboard from 'clipboard'

    export default {
        data () {
            return {
                detailPop: false, //完事朋友圈文案
                position: 'default',
                toastText: '',
                toastType: 'success',
                showPositionValue: false,
                copyText: '',
                pwdPop: false,
                list: [],
                options: {
                    getThumbBoundsFn (index) {
                        // find thumbnail element
                        let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                        // get window scroll Y
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                        // optionally get horizontal scroll
                        // get position of element relative to viewport
                        let rect = thumbnail.getBoundingClientRect()
                        // w = width
                        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                        // Good guide on how to get element coordinates:
                        // http://javascript.info/tutorial/coordinates
                    }
                }
            }
        },

        directives: {
            TransferDom
        },
        components: {
            Previewer,
            Toast,
            XTextarea,
            PopupHeader,
            Popup,
            XButton,
            Group,
            Flexbox,
            FlexboxItem,
        },
        props: ['popInfoDetail','currentItem'],
        watch: {
            popInfoDetail: function (value) {
                this.list = [];//每次弹出文案前都清空数据

                if (this.popInfoDetail) {
                    this.detailPop = true
                    let market_image = {
                        src: this.popInfoDetail.market_image,
                        w: 200,
                        h: 200,
                    }
                    this.list.push(market_image)
                    let images = this.popInfoDetail.image.split('#')
                    for (let i = 0; i < images.length; i++) {
                        this.list.push({
                            src: images[i],
                            w: 200,
                            h: 200,
                        })
                    }
                } else {
                }
                // console.log(this.list)
            },
        },
        updated () {
        },
        methods: {
            logIndexChange (arg) {
                // console.log(arg)
            },
            show (index) {
                this.$refs.previewer.show(index)
            },
            onHide () {
                this.detailPop = false
                this.list = []
            },
            better () {
                this.onHide()
                this.$emit('openFriend', this.currentItem)
            },
            showPosition (position, text, type) {
                this.position = position
                this.toastText = text
                this.toastType = type
                this.showPositionValue = true
            },
            copy () {
                const clipboard = new Clipboard('.copy-Detail')
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
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/css/mixin';

    .popUp_detail {
        @include borderRadius(10px);
        @include wh(630px, 82%);
        @include center;
        margin: 0 auto;
        background-color: #fff;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            width: 0;
            display: none;
        }

        .popUp_detail_header {
            background-color: $red;
            color: #fff;

            > div,
            .vux-popup-header-title {
                color: #fff;
            }
        }

        .title {
            @include sc(20px, #666);
            @include borderRadius(5px);
            background-color: #f5f5f5;
            line-height: 50px;
            text-align: left;
            margin: 10px;
            padding: 0 10px;
        }

        .images {
            margin: 10px;
            .miniImage {
                @include wh(50%, auto);
            }
        }

        .button_wrap {
            text-align: center;
            margin-bottom: 20px;
        }

    }


</style>
