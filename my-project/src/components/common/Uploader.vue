<template>
    <div class="weui-uploader">
        <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
                <li class="weui-uploader__file" v-for="(thumbnail, index) in thumbnails"
                    :style="{ backgroundImage: `url(${ thumbnail })` }" @click="click(index)">
                    <badge text="x" class="delete" @click.native.stop="deleteImage(index)"></badge>
                </li>
            </ul>
            <flexbox>
                <flexbox-item :span="1/2">
                    <div class="weui-uploader__input-box">
                        <input id="uploaderInput1" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                    </div>
                </flexbox-item>

                <flexbox-item :span="1/2">
                    <div class="weui-uploader__input-box">
                        <input id="uploaderInput2" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                    </div>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item :span="1/2" class="input_info">
                    请添加营销主图
                </flexbox-item>
                <flexbox-item :span="1/2" class="input_info">
                    请添加最少三张晒图
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
    import { Badge } from 'vux'
    import { Flexbox, FlexboxItem } from 'vux'

    export default {
        props: {
            thumbnails: Array,
        },
        methods: {
            onButtonClick () {
                this.$emit('on-button-click')
            },
            click (index) {
                this.$emit('on-item-click', index)
            },
            deleteImage (index) {
                this.$emit('on-delete-click', index)
            },
        },
        components: {
            Badge,
            Flexbox,
            FlexboxItem,
        },
    }
</script>

<style lang="less">
    @import '~vux/src/styles/weui/widget/weui-uploader/index.less';

    .delete {
        float: right;
    }

    .weui-uploader {
        padding: 10px;
        text-align: center;

        .weui-uploader__bd {
            margin: 0;

            .weui-uploader__input-box {
                margin: 0 auto;
                float: none;
            }

        }
    }
</style>