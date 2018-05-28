import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home')), 'home')
const meat = r => require.ensure([], () => r(require('../page/meat')), 'meat')
const group = r => require.ensure([], () => r(require('../page/group')), 'group')
const mine = r => require.ensure([], () => r(require('../page/mine')), 'mine')


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //  地址为空时跳转home页面 => 首页
        {
            path : '/',
            component : home
        },
        //  肉单
        {
            path : '/meat',
            component : meat
        },
        //  采集群
        {
            path : '/group',
            component : group
        },
        //  我的
        {
            path: '/mine',
            component: mine
        }
    ]
}]
