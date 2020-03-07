<template>
  <div class="content">
    <!--统计-->
    <data-grid :list="statisticNum" location="world"></data-grid>
    <!--地图-->
    <div id="linktobox0">
      <sub-title title="世界疫情地图">
        <router-link slot="right" :to="{ path: '/' }">
          <span class="my_button">国内</span>
        </router-link>
      </sub-title>
      <tab-button :tabs="mapTabs" :select="mapTabSelect" @change-tab="changeMapTab"></tab-button>
      <china-map :data="worldMapData" dom-id="worldMap" place="world"></china-map>
    </div>
    <!--表格-->
    <div>
      <sub-title title="各地数据"></sub-title>
      <data-table :data="worldTableData" place="world"></data-table>
    </div>
  </div>
</template>

<script>
import subtitle from "@/components/subtitle";
import tabButton from "@/components/tabButton";

import chinaMap from "@/components/chinaMap";
import myTable from "@/components/table";
import myGrid from "@/components/grids";

import dataMixin from "@/assets/js/dataMixin";
export default {
  props: {
    areajson: Array
  },
  mixins: [dataMixin],
  data() {
    return {
      types:["currentConfirmedCount","confirmedCount","curedCount","deadCount"]
    };
  },
  components: {
    "china-map": chinaMap,
    "sub-title": subtitle,
    "tab-button": tabButton,
    "data-table": myTable,
    "data-grid": myGrid
  },
  computed: {
    worldData() {
      let data = this.worldTableData;
      if (data.length === 0) return [];
      let res = [];
      data.forEach(item => {
        res.push(...item.cities);
      });
      return res;
    },
    //地图数据
    worldMapData() {
      let data = this.worldData;
      let feild = this.mapTabSelect || "currentConfirmedCount";
      let res = data.map(item => {
        return {
          locationId: item.locationId,
          name: item.countryEnglishName,
          eName: item.countryEnglishName,
          value: item[feild]
        };
      });
      return res;
    },
    worldTableData() {
      let data = this.areajson;
      if (data.length === 0) return [];
      let continent = [];
      let continentChilds = {};
      let chinaList = [];
      data.forEach(item => {
        if (item.countryName != "中国") {
          if (!continentChilds[item.continentName]) {
            continentChilds[item.continentName] = [];
            continent.push({
              locationId: item.continentEnglishName,
              continentName: item.continentName,
              continentEnglishName: item.continentEnglishName
            });
          }
          continentChilds[item.continentName].push(item);
        } else {
          chinaList.push(item);
        }
      });
      let types = this.types
      //中国总数
      let chinadata = {
        locationId: "China",
        continentName: "亚洲",
        continentEnglishName: "Asia",
        countryName: "中国",
        countryEnglishName: "China",
      }
      types.forEach(type=>{
        let count = chinaList.reduce((acc, cur) => {
          return acc + cur[type];
        }, 0);
        chinadata[type] = count
      })
      //大洲总数 排序
      continent.forEach(item=>{
        let childs = continentChilds[item.continentName]
        childs.sort(function(a, b) {
          return b['currentConfirmedCount'] - a['currentConfirmedCount'];
        });
        item.cities = childs
        if(item.continentName === '亚洲'){
          item.cities.unshift(chinadata)
        }
        //计算总数
        types.forEach(type=>{
          let count = childs.reduce((acc, cur) => {
            return acc + cur[type];
          }, 0);
          item[type] = count
        })
      })
      //排序
      continent.sort(function(a, b) {
        return b['currentConfirmedCount'] - a['currentConfirmedCount'];
      });
      return continent;
    }
  },
  methods:{
    getStatistic(){
      let obj = {}
      this.types.forEach(type=>{
        let count = this.worldTableData.reduce((acc, cur) => {
          return acc + cur[type];
        }, 0);
        obj[type] = count
      })
      this.getStatisticNum(obj)
    }
  },
  mounted() {
    this.getStatistic()
    // console.log("continent", this.worldTableData);
  }
};
</script>

<style scoped lang="scss">
/deep/ .grid_box .grid_item{
  padding: 1rem .5rem;
}
</style>
