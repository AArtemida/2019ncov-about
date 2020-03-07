let dataMixin = {
    data() {
        return {
            //地图
            mapTabs: {currentConfirmedCount: "现存确诊",confirmedCount: "累计确诊"},
            mapTabSelect: 'currentConfirmedCount',
            areaData: [],
            statisticNum: {
                currentConfirmedCount: {
                    value: 0,
                    incr: 0,
                    text: '现存确诊',
                },
                suspectedCount: {
                    value: 0,
                    incr: 0,
                    text: '现存疑似'
                },
                seriousCount: {
                    value: 0,
                    incr: 0,
                    text: '现存重症'
                },
                confirmedCount: {
                    value: 0,
                    incr: 0,
                    text: '累计确诊'
                },
                curedCount: {
                    value: 0,
                    incr: 0,
                    text: '累计治愈'
                },
                deadCount: {
                    value: 0,
                    incr: 0,
                    text: '累计死亡'
                },
            },
        }
    },
    computed: {
        
    },
    methods: {
        changeMapTab(index) {
            this.mapTabSelect = index
        },
        // //地图数据
        // changeMapData() {
        //     return this['chinaMapData_' + this.mapTabSelect]
        // },
        getStatisticNum(res){
            for(let key in this.statisticNum){
                let type = key.replace("Count",'')
                this.$set(this.statisticNum[key],'value',res[key])
                this.statisticNum[key].incr = res[type+'Incr']
            }
        },
    }
}
export default dataMixin