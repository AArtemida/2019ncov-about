<template>
  <div id="app">
    <div class="top_img_box" @click="linkIndex"></div>
    <router-view :areajson="areaData"></router-view>
  </div>
</template>

<script>
// import areaJson from "@/assets/js/area.json";
export default {
  name: 'App',
  data() {
    return {
      // areaJson: areaJson,
      areaData: [],
    }
  },
  methods:{
      //获取区域数据
      getnCovArea(){
        // this.areaData = areaJson.results
        this.$axios.get(
          'https://lab.isaaclin.cn/nCoV/api/area',
          {params:{}},
        ).then((response) => {
          this.areaData = response.results
        }).catch((errorlog) =>{
          console.log(errorlog)
        })
      },
      linkIndex(){
        this.$router.push({path:'/'})
      },
  },
  created(){
    this.getnCovArea()
  }
}
</script>

<style>

</style>
