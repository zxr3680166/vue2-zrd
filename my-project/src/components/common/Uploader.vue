<template>
    <div class="weui-uploader">
        <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
                <li class="weui-uploader__file" v-for="(thumbnail, index) in popInfo.market_image"
                    :style="{ backgroundImage: `url('http://39.105.108.120/${ thumbnail }')` }"
                    @click.native="click(index)">
                    <!--<badge text="X" class="delete" @click.native.stop="deleteImage(index)"></badge>-->
                </li>
            </ul>
            <ul class="weui-uploader__files">
                <li class="weui-uploader__file" v-for="(thumbnail, index) in popInfo.image"
                    :style="{ backgroundImage: `url('http://39.105.108.120/${ thumbnail }')` }"
                    @click.native="click(index)">
                    <!--<badge text="X" class="delete" @click.native.stop="deleteImage(index)"></badge>-->
                </li>
            </ul>
            <flexbox>
                <flexbox-item :span="1/2">
                    <div class="weui-uploader__input-box">
                        <input id="uploaderInput1" @change='add_img(1)' class="weui-uploader__input" type="file"
                               accept="image/*" multiple/>
                    </div>
                </flexbox-item>

                <flexbox-item :span="1/2">
                    <div class="weui-uploader__input-box">
                        <input id="uploaderInput2" @change='add_img(2)' class="weui-uploader__input" type="file"
                               accept="image/*" multiple/>
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
        <div v-transfer-dom>
            <toast v-model="showPositionValue" :time="800" is-show-mask :type="toastType" :text="toastText"
                   :position="position" width="10em">{{toastText}}
            </toast>
        </div>
    </div>
</template>

<script>
    import { Badge, Flexbox, FlexboxItem, Toast, TransferDom } from 'vux'

    export default {
        data () {
            return {
                imgData: {
                    accept: 'image/gif, image/jpeg, image/png, image/jpg',
                },
                position: 'default',
                toastText: '',
                toastType: 'text',
                showPositionValue: false
            }
        },
        props: {
            popInfo: Object,
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
            add_img (uploadType) {
                let reader = new FileReader()
                let img1 = event.target.files[0]
                let type = img1.type//文件的类型，判断是否是图片
                let size = img1.size//文件的大小，判断图片的大小
                if (this.imgData.accept.indexOf(type) == -1) {
                    this.showPosition('top', '请选择正确图片格式', 'text')
                    return false
                }
                if (size > 1048576) {
                    this.showPosition('top', '请选择1M以内的图片', 'text')
                    return false
                }
                var uri = ''
                let form = new FormData()
                form.append('file', img1, img1.name)
                console.log(img1, img1.name, this.popInfo)

                this.$http.post(`/api/uploadFile`, form, {
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then(response => {
                    console.log(response.data)
                    if (response.data.code == 200) {
                        this.showPosition('top', '上传成功', 'text')
                        uri = response.data.data
                        if (uploadType == 1) {
                            this.popInfo.market_image = []
                            this.popInfo.market_image.push(uri)
                        } else if (uploadType == 2) {
                            this.popInfo.image.push(uri)
                        }
                    } else {
                        this.showPosition('top', '上传失败', 'text')
                    }
                }).catch(error => {
                    alert(error, '上传图片出错！')
                })
            },
            showPosition (position, text, type) {
                this.position = position
                this.toastText = text
                this.toastType = type
                this.showPositionValue = true
            },
        },
        directives: {
            TransferDom
        },
        components: {
            Toast,
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