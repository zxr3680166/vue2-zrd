<template>
    <div v-show="visible" id="back_top" @click="backTop">
        <x-icon type="ios-arrow-up" size="30" class="icon-color"></x-icon>
    </div>
</template>
<script>
    import { showBack, animate } from '../../assets/js/mUtils'

    export default {

        data () {
            return {
                wHeight: 0,
                visible: false,
                ret: 0,
                obj: null,
                speed: 0,
                times: 0,
                time: 0,
                scrollHeight: 500,
            }
        },
        props: {
            index: {
                type: Number,
            },
        },
        watch: {
            //index，当值发生变化的时候重新监听
            index: function (value) {
                this.listen(this.index)
            },
        },
        mounted () {
            this.listen(this.index)
        },
        methods: {
            hasScroll () {
                const scrollTop = this.getScroll(this.index)
                this.visible = scrollTop > this.scrollHeight
            },
            getScroll (idx) {
                return document.getElementsByClassName('loadmore')[idx].scrollTop
            },
            //返回顶部
            backTop () {
                animate(document.getElementsByClassName('loadmore')[this.index], {scrollTop: '0'}, 400, 'ease-out')
            },
            listen (idx) {
                document.getElementsByClassName('loadmore')[idx].addEventListener('scroll', this.hasScroll)
            }
        },
    }
</script>

<style lang="scss" scoped>
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
</style>