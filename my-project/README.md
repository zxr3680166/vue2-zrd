# taokeapp

> 复刻淘客文案App  
> 增加外部接口数据  
> 调用酷Q采集数据  

## 开发说明

>  开发环境 macOS 10.13.4 + Chrome 66 + nodejs 9.3.0 + iPhone 6s  

## 技术栈

>  vue2 + vuex + vue-router + vux + webpack + ES6/7 + fetch + scss   

## 项目进度
- [x] 前端框架搭建 -- 完成
- [ ] 后端服务器搭建 -- 进行中
- [ ] 首页
- [ ] 找券页
- [ ] 个人中心
- [ ] 页脚 -- 进行中 
- [ ] 登录
- [ ] 搜索
- [ ] 外网数据接口
- [ ] 酷Q数据接口
- 其他

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
│   │   │   └── px2rem.scss                     // rem公用方法  
│   │   ├── images                              // 公共img文件夹  
│   │   │   ├── icons                           // 图标文件夹  
│   │   └── js                                  // 公共js文件  
│   │       └── rem.js                          // px转换rem
│   │    
│   ├── components                              // 组件  
│   │   ├── findCoupons                         // 找券相关组件
│   │   ├── footer                      
│   │   │   └── footGuide.vue                   // 底部公共组件
│   │   ├── home                                // 首页相关组件
│   │   ├── index.js                            // 组件总管理文件 **
│   │   └── personalCenter                      // 个人中心相关组件
│   │  
│   ├── page
│   │   ├── findCoupons
│   │   │   └── index.vue                       // 找券
│   │   ├── home
│   │   │   └── index.vue                       // 首页
│   │   └── personalCenter
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