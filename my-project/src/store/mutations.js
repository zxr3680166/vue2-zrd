const INITIALIZE_DATA = 'INITIALIZE_DATA'
import axios from 'axios'

export default {
    /*
    初始化信息，
     */
    [INITIALIZE_DATA](state) {
        // 接口：获取用户数据
        // let url = `/api/get_userinfo`
        // //fetch请求
        // fetch(url, {
        //     method: 'GET',
        // }).then(response => response.json()).then(json => {
        //     state.userInfo = json.data.user
        //     console.log('初始化用户信息',state.userInfo)
        // })
        axios.get(`/api/get_userinfo`).then(res => {
            // console.log(res.data)
            if (res.data.code == 200) {
                state.userInfo = res.data.data.user
                console.log('初始化用户信息',state.userInfo)
            }
        })
    },
}