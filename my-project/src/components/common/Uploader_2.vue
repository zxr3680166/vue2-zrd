<template>
    <div class="weui-uploader">
        <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
                <li class="weui-uploader__file" v-for="(thumbnail, index) in thumbnails" :key="thumbnail"
                    :style="{ backgroundImage: `url(${ thumbnail })` }" @click="click(index)">
                    <!--<badge text="x" class="delete" @click.native.stop="deleteImage(index)"></badge>-->
                </li>
            </ul>
            <flexbox :gutter="10">
                <flexbox-item :span="1/3">
                    <div class="weui-uploader__input-box">
                        <input id="uploaderInput1" @change='add_img' class="weui-uploader__input" type="file" accept="image/*" multiple/>
                    </div>
                </flexbox-item>

                <flexbox-item :span="1/3">
                    <div class="weui-uploader__input-box">
                        <input id="uploaderInput2" @change='add_img' class="weui-uploader__input" type="file" accept="image/*" multiple/>
                    </div>
                </flexbox-item>

                <flexbox-item :span="1/3">
                    <div class="weui-uploader__input-box">
                        <input id="uploaderInput3" @change='add_img' class="weui-uploader__input" type="file" accept="image/*" multiple/>
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
        data() {
            return {
                imgData: {
                    accept: 'image/gif, image/jpeg, image/png, image/jpg',
                }
            }
        },
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
            add_img (event) {
                let reader = new FileReader()
                let img1 = event.target.files[0]
                let type = img1.type//文件的类型，判断是否是图片
                let size = img1.size//文件的大小，判断图片的大小
                if (this.imgData.accept.indexOf(type) == -1) {
                    alert('请选择我们支持的图片格式！')
                    return false
                }
                if (size > 1048576) {
                    alert('请选择1M以内的图片！')
                    return false
                }
                var uri = ''
                let form = new FormData()
                form.append('file', img1, img1.name)
                // console.log(img1, img1.name)

                this.$http.post(`/api/uploadFile`, form, {
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then(response => {
                    uri = response.data.data
                    this.thumbnails.push(uri)
                    // console.log(this.thumbnails)
                }).catch(error => {
                    alert(error, '上传图片出错！')
                })
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