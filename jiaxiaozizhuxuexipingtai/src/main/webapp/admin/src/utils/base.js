const base = {
    get() {
        return {
            url : "http://localhost:8080/jiaxiaozizhuxuexipingtai/",
            name: "jiaxiaozizhuxuexipingtai",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/jiaxiaozizhuxuexipingtai/front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "驾考自主学习预约平台"
        } 
    }
}
export default base
