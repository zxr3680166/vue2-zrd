const INITIALIZE_DATA = 'INITIALIZE_DATA'

export default {
    /*
    初始化信息，
     */
    [INITIALIZE_DATA](state) {
        // 接口：获取微信接口数据
        let url = 'http://www.51bmonster.com/api/getMemberInfo?id=' + state.memberId
        //fetch请求
        fetch(url, {
            method: 'GET',
        }).then(response => response.json()).then(json => {
            state.memberInfo = json.data
            // console.log(url,'state.memberInfo',json,state.memberInfo)
        })

    },
}