# taokeapp

> 根据Psd UI原型文件构建单页面应用App——"找肉单"   

## 开发说明

>  开发环境 macOS 10.13.4 + Chrome 66 + nodejs 9.3.0 + iPhone 6s  

## 技术栈

>  vue2 + vuex + vue-router + vux + webpack + ES6/7 + fetch + scss   

## 项目进度
- [x] 前端框架搭建 -- 完成
- [x] 后端服务器搭建 -- 完成
- [x] 首页 -- 完成
- [x] 肉单页 -- 完成
- [x] 采集群页 -- 完成
- [x] 个人中心 -- 完成
- [x] 页脚tabbar -- 完成
- [x] 前后端数据对接 -- 完成
- [x] 上拉加载更多 -- 完成
- [x] 返回顶部 -- 完成
- [ ] 其他 -- 待开发

## 项目布局

```
.  
├── build                                       // webpack配置文件  
├── config                                      // 项目打包路径  
├── dist                                        // 上线项目文件，放在服务器即可正常访问 
│    
├── src                                         // 源码目录  
│   ├── assets                                  // 素材库  
│   │   ├── css                                 // 公共css文件夹  
│   │   │   ├── reset.css                       // style重置  
│   │   │   ├── common.css                      // 总样式文件  
│   │   │   ├── mixin.scss                      // 样式公用属性和方法
│   │   │   └── px2rem.scss                     // rem公用方法  
│   │   ├── images                              // 公共img文件夹  
│   │   │   ├── icons                           // 图标文件夹  
│   │   └── js                                  // 公共js文件  
│   │       ├── mUtils.js                       // 公用js方法
│   │       ├── mixin.js                        // 自定义mixin
│   │       └── rem.js                          // 淘宝rem解决方案
│   │    
│   ├── components                              // 组件  
│   │   ├── common
│   │   │   ├── backToTop.vue                   // 返回顶部
│   │   │   ├── Uploader.vue                    // 商品上传
│   │   │   ├── Uploader_2.vue                  // 个人中心上传
│   │   │   ├── goodslist.vue                   // 商品列表
│   │   │   └── grouplist.vue                   // 采集群列表
│   │   ├── footer
│   │   │   └── footerNav.vue                   // 页脚（废弃）
│   │   ├── header
│   │   │   ├── head.vue                        // 首页头
│   │   │   └── head_2.vue                      // 采集群头
│   │   └── index.js                            // 组件管理
│   │  
│   ├── page
│   │   ├── group
│   │   │   └── index.vue                       // 采集群
│   │   ├── home
│   │   │   └── index.vue                       // 首页
│   │   ├── meat
│   │   │   └── index.vue                       // 肉单
│   │   └── mine
│   │       └── index.vue                       // 个人中心
│   │  
│   ├── router
│   │   └── router.js                           // 路由配置
│   │  
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── mutations.js                        // 配置mutations
│   │   └── index.js                            // vuex总管理文件 **
│   │  
│   ├── App.vue                                 // 页面入口文件
│   └── main.js                                 // 程序入口文件，加载各种公共组件
│  
├── index.html                                  // 入口html文件
.
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## License

[GPL](https://github.com/bailicangdu/vue2-elm/blob/master/COPYING)