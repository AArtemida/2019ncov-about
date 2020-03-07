<template>
  <div class="content">
    <!--统计-->
    <data-grid :list="statisticNum" :location="name"></data-grid>
    <!--地图-->
    <div id="linktobox0">
      <sub-title :title="name">
        <router-link slot="right" :to="{ path: '/' }">
          <span class="my_button">国内</span>
        </router-link>
      </sub-title>
      <tab-button :tabs="mapTabs" :select="mapTabSelect" @change-tab="changeMapTab"></tab-button>
      <china-map
        :data="chinaMapData"
        :title="mapTabs[mapTabSelect]"
        dom-id="provinceMap"
        :place="ename.toLowerCase()"
      ></china-map>
    </div>
    <!--表格-->
    <div>
      <sub-title title="各地数据"></sub-title>
      <data-table :data="chinaData" :place="name"></data-table>
    </div>
  </div>
</template>

<script>
import subtitle from "@/components/subtitle";
import tabButton from '@/components/tabButton'

import chinaMap from "@/components/chinaMap";
import myTable from "@/components/table";
import myGrid from "@/components/grids";

import dataMixin from '@/assets/js/dataMixin'
export default {
  props: {
    areajson: Array,
  },
  mixins:[dataMixin],
  data() {
    return {
      id: this.$route.query.id||'',
      name: this.$route.query.name||'',
      ename: this.$route.query.ename||'china',
    };
  },
  components: {
    "china-map": chinaMap,
    "sub-title": subtitle,
    'tab-button': tabButton,
    "data-table": myTable,
    "data-grid": myGrid
  },
  computed:{
      chinaData() {
        let data = this.areajson;
        let obj = data.filter(item => {
          return item.locationId == this.id;
        });
        if(obj.length === 0) return [];
        let res = obj[0].cities
        return res;
      },
     //地图数据
      chinaMapData() {
        let data = this.chinaData
        let feild = this.mapTabSelect || "currentConfirmedCount";
        let res = data.map(item => {
          let cityname = item.cityName
          let cityname_last = cityname.substr(cityname.length-1,1)
          if(cityname_last.indexOf("市")===-1 && cityname_last.indexOf("区")===-1 && cityname_last.indexOf("县")===-1){
            cityname += '市'
          }
          return {
              locationId: item.locationId,
              name: cityname,
              eName: item.cityEnglishName,
              value: item[feild],
          }
        })
        return res
      },
  },
  methods: {
    getStatistic(){
      let data = this.areajson;
      let obj = data.filter(item => {
        return item.locationId == this.id;
      });
      let res = obj[0]
      this.getStatisticNum(res)
    },
  },
  created(){
  },
  mounted(){
    this.getStatistic()
  }
};
</script>

<style scoped lang="scss">
/deep/ .grid_box .grid_item {
  padding: 1rem 0.5rem;
}
</style>
