<template>
    <div class="weui-uploader">
        <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
                <li class="weui-uploader__file" v-for="(thumbnail, index) in thumbnails"
                    :style="{ backgroundImage: `url(${ thumbnail })` }" @click="click(index)">
                    <badge text="x" class="delete" @click.native.stop="deleteImage(index)"></badge>
                </li>
            </ul>
            <flexbox :gutter="10">
                <flexbox-item :span="1/3">
                    <div class="weui-uploader__input-box">
                        <input id="uploaderInput1" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                    </div>
                </flexbox-item>

                <flexbox-item :span="1/3">
                    <div class="weui-uploader__input-box">
                        <input id="uploaderInput2" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                    </div>
                </flexbox-item>

                <flexbox-item :span="1/3">
                    <div class="weui-uploader__input-box">
                        <input id="uploaderInput3" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                    </div>
                </flexbox-item>
            </flexbox>
            <flexbox :gutter="10">
                <flexbox-item :span="1/3" class="input_info left">
                    请添加商品主图
                </flexbox-item>
                <flexbox-item :span="1/3" class="input_info left">
                    请添加营销主图
                </flexbox-item>
                <flexbox-item :span="1/3" class="input_info left">
                    &nbsp;&nbsp;请添加晒图
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
        width: 80%;
        margin: 0 auto;
        margin-top: 10px;
        padding: 10px;
        text-align: left;

        .weui-uploader__bd {
            margin: 0;

            .weui-uploader__input-box {
                /*margin: 0 auto;*/
                float: none;
            }

        }
    }
</style>