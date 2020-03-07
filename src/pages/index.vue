<template>
  <!-- content -->
  <div>
    <ul class="tab_list" :data-json="scrollTop" :class="{'fixedtab':scrollTop>200}">
      <li
        v-for="(tab,index) in tabs"
        :key="'tabs'+index"
        :class="{'select':activeTab===index}"
        @click="changeTab(index)"
      >
        <a :href="'#linktobox'+index">{{tab}}</a>
      </li>
    </ul>
    <div class="content">
      <!-- <tab-button :tabs="placeTabs" :select="selectPlace" @change-tab="changePlaceTab"></tab-button> -->
      <!--统计-->
      <data-grid :list="statisticNum"></data-grid>
      <!--地图-->
      <div id="linktobox0">
        <sub-title title="疫情地图">
          <router-link slot="right" :to="{ path: '/world' }">
            <span class="my_button">世界</span>
          </router-link>
        </sub-title>
        <!-- <div class="map_tabs">
            <span v-for="(text,tab) in mapTabs" :key="'maptab_'+tab" :class="{'select':mapTabSelect===tab}"
              @click="mapTabSelect=tab">{{text}}</span>
        </div>-->
        <tab-button :tabs="mapTabs" :select="mapTabSelect" @change-tab="changeMapTab"></tab-button>
        <china-map :data="chinaMapData" :title="mapTabs[mapTabSelect]" dom-id="chinaMap"></china-map>
      </div>
      <!--表格-->
      <div>
        <sub-title title="各地数据"></sub-title>
        <data-table :data="chinaData"></data-table>
      </div>
      <!--辟谣-->
      <div id="linktobox1">
        <sub-title title="辟谣"></sub-title>
        <rumor-list :list="rumors"></rumor-list>
      </div>
      <!--其他-->
      <div id="linktobox2">
        <sub-title title="实时动态"></sub-title>
        <news-list :list="newslist"></news-list>
      </div>
      <div id="linktobox3">
        <sub-title title="疾病知识"></sub-title>
        <div class="remark_box">
          <p v-for="(line,key) in remarkList" :key="'remark_'+key">{{line}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subtitle from "@/components/subtitle";
import tabButton from "@/components/tabButton";

import chinaMap from "@/components/chinaMap";
import newsList from "@/components/newsList";
import myTable from "@/components/table";
import myGrid from "@/components/grids";
import rumorList from "@/components/rumorList";

import dataMixin from "@/assets/js/dataMixin";
/* eslint-disable */
export default {
  props: {
    areajson: Array
  },
  mixins: [dataMixin],
  data() {
    return {
      activeTab: 0,
      tabs: ["疫情地图", "辟谣与防护", "实时动态", "疾病知识"],
      //实时播报
      newslist: [],
      //谣言
      hasRumors:false,
      rumors: [],
      scrollTop:0,
      remarkList:{},
      
      placeTabs:{china:'中国',world:'世界'},
      selectPlace: 'china',
    };
  },
  computed: {
    chinaData() {
      let data = this.areajson;
      if(!data || data.length === 0) return [];
      let res = data.filter(item => {
        return item.countryName === "中国";
      });
      res.sort(function(a, b) {
        return b.currentConfirmedCount - a.currentConfirmedCount;
      });
      return res;
    },
    //地图数据
    chinaMapData() {
      let data = this.chinaData;
      let feild = this.mapTabSelect || "currentConfirmedCount";
      let res = data.map(item => {
        return {
          locationId: item.locationId,
          name: item.provinceShortName,
          eName: item.provinceEnglishName,
          value: item[feild]
        };
      });
      return res;
    },
  },
  components: {
    "china-map": chinaMap,
    "sub-title": subtitle,
    "tab-button": tabButton,
    "news-list": newsList,
    "data-table": myTable,
    "data-grid": myGrid,
    "rumor-list": rumorList
  },
  watch:{
    scrollTop(n){
      if(n > 1500 && !this.hasRumors){
        this.getRumors();
      }
    }
  },
  methods: {
    changeTab(index) {
      this.activeTab = index;
    },
    changePlaceTab(index){
      this.selectPlace = index;
    },
    //获取列表
    getList() {
      this.$axios.get(
        'http://api.tianapi.com/txapi/ncov/index?key=cbb99def625d2c6a609edf04c25d92ab',
        {params:{}},
      ).then((response) => {
        if (response && response.newslist && response.newslist.length > 0) {
          let data = response.newslist[0];
          this.newslist = data.news;
          if (data.desc) {
            this.getStatisticNum(data.desc);
            this.getRemark(data.desc)
          }
        }
      }).catch((errorlog) =>{
        console.log(errorlog)
      })
    },
    //获取概览
    getOverall() {},
    getRemark(data){
      for(let key in data){
        if((key.indexOf('remark')>-1||key.indexOf('Remark')>-1||key.indexOf('note')>-1)&&data[key]){
          this.$set(this.remarkList,key,data[key])
        }
      }
    },
    //获取新闻
    getnCovNews() {},
    //获取辟谣
    getRumors() {
      this.hasRumors = true
      this.$axios.get(
        'https://lab.isaaclin.cn/nCoV/api/rumors',
        {params:{}},
      ).then((response) => {
        if(response && response.results){
          this.rumors = response.results;
        }
      }).catch((errorlog) =>{
        console.log(errorlog)
        this.hasRumors = false
      })
    },
    getHoverScrollTop(){
      var scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {// 滚动高度
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
  },
  created() {},
  mounted() {
    this.getList();

    document.addEventListener("scroll",(e)=>{
      this.scrollTop = this.getHoverScrollTop()
    })
  }
};
</script>

<style scoped lang="scss">
@import "@/style/colors.scss";
.tab_list {
  display: flex;
  padding: 1rem 0.5rem 0 0.5rem;
  background: $white;
  margin-bottom: 0.8rem;
  &.fixedtab{
      background: $primaryColor;
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 99;
      left: 0;
      margin:0;
      color:$white;
      li.select{
        a{
          color:$white;
        }
        &:after{
          background: $white;
        }
      }
  }
  li {
    flex: 1 auto;
    cursor: pointer;
    transition: all 0.3s ease;
    a {
      color: inherit;
      font-size: 0.9rem;
      font-weight: bold;
    }
    &.select {
      a {
        color: $primaryColor;
      }
      &:after {
        content: "";
        display: block;
        background: $primaryColor;
        height: 0.25rem;
        margin-top: 0.5rem;
      }
    }
    &:hover {
      a {
        color: $primaryColor;
      }
    }
  }
}
.remark_box{
  @include blockcard;
  word-break: break-word;
  text-align: left;
  padding: .5rem .8rem;
  p{
    font-size: $font_14;
    text-indent: $font_14 * 2;
    border-bottom: 1px dashed rgba($black_9,.5);
    padding-bottom: .4rem;
    &:last-child{
      border: 0;
    }
  }
}
</style>