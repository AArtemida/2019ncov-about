<template>
  <div class="chart_box" :id="domId"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    domId: String,
    type: { type: String, default: "bar" },
    data: { type: Array },
    custom: {
        type:Object,
        default:function(){
            return {}
        }
    }
  },
  data() {
    return {
      colorList: ["#f98d7c", "#ffbf63","#af8781", "#f75137", "#5cbd91","#8aa0c5"]
    };
  },
  watch: {
    data: {
      handler: function() {
        this.$nextTick(() => {
          this.getChartsById();
        });
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      // 初始化
      let chartDom = document.getElementById(this.domId);
      this.chart = echarts.init(chartDom);
    },
    getChartsById() {
      this.chart.clear();
      if (!this.data || this.data.length == 0) {
        return;
      }
      let opt = this.getOption();
      this.chart.setOption(opt);
    },
    getOption() {
      let custom = this.custom;
      let type = this.type;
      let color = custom.color || this.colorList;
      let options = {
        color: color,
        tooltip: {
          //提示框
          trigger: type == "pie" ? "item" : "axis",
          axisPointer: {
            type: "shadow"
          },
          backgroundColor: "rgba(255,255,255,0.9)",
          textStyle: { color: "#666" }
        }
      };
      //是否显示图例
      if (custom.showLegend) {
        options.legend = this.getLegend();
      }
      if (type === "bar" || type === "line") {
          options.series = []
      } else if (type === "pie") {
        options.series = this.getPieSeries(color);
      }
      return options;
    },
    //图例
    getLegend() {
      let legendData = [];
      //饼图
      if (this.type === "pie") {
        legendData = this.data.map(val => val.name);
      }
      //获取组合图的类型
      else if (this.custom.dataTypes) {
        for (let t in this.custom.dataTypes) {
          legendData.push(this.custom.dataTypes[t]);
        }
      }
      let legend = {
        data: legendData,
        itemHeight: 10,
        itemWidth: 12,
        orient: "horizontal",
        right: 0,
        textStyle: {
          color: "#666"
        }
      };
      return legend;
    },
    getPieSeries(color) {
      //初始的饼图
      let pieSeries = {
        name: this.custom.name || "",
        type: "pie",
        center: ["50%", "50%"], // 位置
        radius: [0, "68%"], // 半径
        selectedMode: true,
        hoverAnimation: true,
        data: this.data,
        color: color,
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: function(idx) {
          return Math.random() * 100 * idx;
        }
      };
      //显示圆环图
      this.custom.showRing && (pieSeries.radius = ["37%", "68%"]);
      return pieSeries;
    },
    getxAxis() {},
    getBarOrLineItem(type = this.type, title, stack) {
      //单个样式
      let chartItem = {
        name: title || this.custom.name,
        type: type
      };
      if (this.type === "bar") {
        chartItem.barMinHeight = 1;
        chartItem.barMaxWidth = this.custom.barMaxWidth || 20; //柱子最大宽度
      } else {
        chartItem.symbolSize = 9;
        chartItem.symbol = this.custom.lineSymbol || "emptyCircle";
      }
      //堆叠图
      stack && (chartItem.stack = stack);
      return chartItem;
    },
    getBarOrLineSeries() {}
  },
  mounted() {
    this.initChart();
    // 调用绘图方法
    this.getChartsById();

    window.onresize = () => {
      if (this.chart) this.chart.resize();
    };
  }
};
</script>

<style scoped lang="scss">
.chart_box {
  min-height: 180px;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 4px;
  margin:0 auto;
}
</style>
