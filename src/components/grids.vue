<template>
  <div class="statistic_num_box">
    <p align="left" class="static_title">
      截至
      <b>{{getToday()}}</b> 全国数据统计
      <span class="my_button" @click="showTable = !showTable" v-text="showTable?'统计图':'数据'"></span>
    </p>
    <div class="grid_box" v-show="showTable">
      <div class="grid_item" v-for="(item,type) in list" :key="type+location" v-show="item.value||item.incr">
        <p class="small_text" v-if="item.incr">
          较昨日
          <span :class="type">{{item.incr.toString().indexOf("-")>-1?item.incr:'+'+item.incr}}</span>
        </p>
        <strong :class="type">{{item.value}}</strong>
        <p>
          <b>{{item.text}}</b>
        </p>
      </div>
    </div>
    <my-chart class="pie_box" v-if="!showTable" dom-id="statisticPie" type="pie" :data="chartData"></my-chart>
  </div>
</template>

<script>
import myChart from "@/components/chart";
export default {
  props: {
      list: [Array,Object],
      location:String
  },
  components:{
    'my-chart': myChart,
  },
  data() {
    return {
      showTable:true,
    };
  },
  computed:{
    chartData(){
      let res = []
      for(let type in this.list){
        let item = this.list[type]
        res.push({
          name: item.text,
          value: item.value
        })
      }
      return res
    }
  },
  methods: {
      getToday(){
        let d = new Date()
        let today = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
        return today
      },
      changeSelect(index){
        this.selectTab = index
      },
  }
};
</script>

<style scoped lang="scss">
@import "@/style/colors.scss";
.grid_box {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding: .5rem 0;
    .grid_item {
        position: relative;
        box-sizing: border-box;
        flex: 1 auto;
        min-width: 16%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        height: 100%;
        padding: .2rem 1rem;
        justify-content: center;
        align-items: center;
    }
}
.statistic_num_box{
  font-size: .9rem;
  .static_title{
    font-size: 12px;
    color: $black_7;
    position: relative;
  }
  .currentConfirmedCount{color: $currentConfirmedCount;}
  .suspectedCount{color: $suspectedCount;}
  .seriousCount{color: $seriousCount;}
  .confirmedCount{color: $confirmedCount;}
  .curedCount{color: $curedCount;}
  .deadCount{color: $deadCount;}

  strong{
    font-weight: 800;
    font-size: 1.2rem;
  }
  .pie_box{
    padding: 1.44rem 0;
  }
}
</style>
