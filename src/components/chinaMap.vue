<template>
  <div :id="domId" class="map_chart"></div>
</template>

<script>
import echarts from "echarts"
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)
/* eslint-disable */
export default {
  props: {
    data: Array,
    title: {
      type: String,
      default: '现存确诊'
    },
    domId:{
      type: String,
      default: 'mapDom'
    },
    place:{
      type: String,
      default:'china'
    }
  },
  watch:{
    data:{
      handler: function (n) {
        this.$nextTick(()=>{
            this.getChinaMap()
        })
      },
      deep: true
    }
  },
  methods: {
    getOption(){
      let place = this.place
      let option = {
        geo: {
          map: place,
          top: 12,
          bottom: 40,
          label: {
            normal: {
              show: place!=='world',
              fontSize: 7,
              color: "rgba(0,0,0,0.6)"
            }
          },
          roam: 'move',
        	itemStyle: {
            normal: {
              areaColor: '#fff',
              borderColor: '#888'
            },
            emphasis: {
              areaColor: '#39A7F0'
            }
          }
        },
        visualMap: {
          min: 0,
          left: 10,
          bottom: 10,
          itemWidth: 10,
          itemHeight: 8,
          textGap: 8,
          itemGap: 7,
          showLabel: true,
          show: true,
          textStyle: {
            fontSize: 9,
          }
        },
      }
      let _this = this;
			option.tooltip = {
				triggerOn: "click",
        formatter: function(e){
          let html = `<div class="tooltip_box"><div class="tooltip_content">
            ${e.name}<br>${e.seriesName} : ${e.value}
          </div>
          `;
          if(place === 'china'){
            html += `<div class="tooltip_detail" onclick="${_this.linkToChild(e)}">详情</div>`
          }
          html+='</div>'
          // e.name + '<br>'+ e.seriesName + ' : ' + e.value
          return html
        },
        backgroundColor: 'rgba(10,10,10,.7)',
        textStyle: {
          fontSize: 12,
        },
        enterable:true,
      }
      // 标注
      option.visualMap.pieces = this.getMaxValue()
      option.series = [{
        name: this.title,
        type: "map",
        geoIndex: 0,
        data: this.data
      }]
      return option
		},
		getChinaMap(){
			if(this.place === 'china'){
        this.drawMap()
      }else{
        this.getChildMap(this.place);
      }
    },
    drawMap(){
      this.chart.clear()
      let opt = this.getOption()
			this.chart.setOption(opt);
    },
    linkToChild(param){
     this.$router.push({path:'/province', query: {id: param.data.locationId, name:param.data.name,ename:param.data.eName}})
    },
    getChildMap(place){
      this.$axios.get('/map/'+place+'.json').then((res)=>{
        if(res){
          echarts.registerMap(place, res)
          this.drawMap();
        }
      })
    },
    initChart(){
      // 初始化
      let chartDom = document.getElementById(this.domId)
      this.chart = echarts.init(chartDom)
    },
    getMaxValue(){
      let arr = this.data.map(val=>{return val.value})
      let max = Math.max.apply(null,arr);
      let zero = max.toString().length - 1;
      let res = [{
              gt: 10,
              lt: 99,
              label: "10 - 99",
              color: "#F59E83"
          }, {
              gt: 0,
              lt: 9,
              label: "1 - 9",
              color: "#FDEBCF"
          }, {
              value: 0,
              color: "#ffffff"
          }]
      if(max > 99){
        res.unshift({
              gt: 100,
              lt: 499,
              label: "100 - 499",
              color: "#E55A4E"
          })
      }
      if(max > 499){
        res.unshift({
              gte: 500,
              lt: 999,
              label: "500 - 999",
              color: "#CB2A2F"
          })
      }
      if(max > 999){
        res.unshift({
              gte: 1000,
              lte: 10000,
              label: "1000 - 10000",
              color: "#811C24"
          })
      }
      if(max > 10000){
        res.unshift({
              gt: 10000,
              label: "> 10000",
              color: "#4F070D"
          })
      }
      return res
    },
	},
	mounted(){
    this.initChart()
    // 调用绘图方法
    this.getChinaMap()

		//this.getChinaMap()
		window.onresize = () => {
			if(this.chart) this.chart.resize()
    }
    // document.
	}

}
</script>

<style lang="scss">
.map_chart{
  height: 30%;
	width: 100%;
  min-height: 20rem;
  background: #FCFAFA;
  margin: 0 auto;
  .tooltip_box{
    text-align: left;
    display: flex;
    align-items: center;
    .tooltip_content{
      padding-right: .625rem;
    }
    .tooltip_detail{
      position: relative;
      padding-left: .5rem;
      &:before{
        content:'';
        display: block;
        width: 1px;
        height: 100%;
        background: #fff;
        position: absolute;
        top: 8%;
        left: 0;
      }
    }
  }
}
</style>