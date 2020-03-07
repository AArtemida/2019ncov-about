<template>
  <div class="data_table_box">
    <table>
      <thead>
        <tr>
          <th v-for="(title,key) in titles" :key="title+key" :class="'th_'+key">{{title}}</th>
        </tr>
      </thead>
      <tbody v-if="!place||place=='world'">
        <template v-for="item in data">
          <tr :key="'provinceTr_'+item.locationId" class="province_tr" :class="{'open_tr':openIds.indexOf(item.locationId)>-1}"
               @click="addOpenIds(item.locationId)">
            <td v-for="(title,key) in titles" :key="item.locationId+key">
              <span>{{getParentName(item,key)}}</span>
            </td>
          </tr>
          <template v-if="openIds.indexOf(item.locationId)>-1">
            <tr v-for="city in item.cities" :key="'citytr_'+item.locationId+city.locationId" class="city_tr">
              <td v-for="(title,key) in titles" :key="city.locationId+key">
                <span>{{getChildName(city,key)}}</span>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
      <tbody v-else>
        <tr v-for="(city,idx) in data" :key="'citytr_'+city.locationId+idx" class="city_tr">
          <td v-for="(title,key) in titles" :key="city.locationId+key">
            <span>{{key==='provinceShortName'?city['cityName']:city[key]}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import json from "@/assets/area.json";
export default {
  props: {
    data: Array,
    place:String,
  },
  data() {
    return {
      titles: {
        provinceShortName: "地区",
        currentConfirmedCount: "现存确诊",
        confirmedCount: "累计确诊",
        deadCount: "死亡",
        curedCount: "治愈"
      },
    //   json: json,
      openIds: []
    };
  },
  computed: {

  },
  methods: {
    addOpenIds(id) {
      if (this.openIds.indexOf(id) > -1) {
        this.openIds.splice(this.openIds.indexOf(id), 1);
      } else {
        this.openIds.push(id);
      }
    },
    getParentName(item,key){
      return this.place=='world'&&key==='provinceShortName'?item['continentName']:item[key]
    },
    getChildName(item,key){
      return key==='provinceShortName'?(this.place=='world'?item['countryName']:item['cityName']):item[key]
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/colors.scss";
.data_table_box {
  font-size: 0.875rem;
  table {
    width: 100%;
    background: $tableBg;
    th {
      background: $tableTh;
    }
    td {
      background: $tableTd;
      position: relative;
    }
    th,
    td {
      padding: 0.5rem 0;
    }
    .th_currentConfirmedCount {
      background: $currentConfirmedTh;
    }
    .th_confirmedCount {
      background: $confirmedTh;
    }
    .th_deadCount {
      background: $deadTh;
    }
    .th_curedCount {
      background: $curedTh;
    }
    .province_tr {
      font-weight: bold;
      td:first-child{
          min-width: 4.5rem;
          &:before {
            content: "";
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            border-top: .31rem solid transparent;
            border-bottom: .31rem solid transparent;
            border-left: .45rem solid $primaryColor;
            top: 40%;
            left: 3px;
            transition: all .1s ease;
        }
      }
      &.open_tr td:first-child:before{
        border-left: .31rem solid transparent;
        border-right: .31rem solid transparent;
        border-top: .45rem solid $primaryColor; 
      }
    }
  }
}
</style>
