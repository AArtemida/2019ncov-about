<template>
  <div class="map_tabs">
    <span
      v-for="(text,tab) in tabs"
      :key="'maptab_'+tab"
      :class="{'select':select===tab}"
      @click="clickTab(tab)"
    >{{text}}</span>
  </div>
</template>

<script>
export default {
  props: {
      tabs: [Object,Array],
      select: [String,Number]
  },
  methods: {
      clickTab(tab){
          this.$emit("change-tab", tab)
      }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/colors.scss";
.map_tabs{
    $radius:.75rem;
    text-align: left;
    margin-bottom: .5rem;
    span{
        border: 1px solid $primaryColor;
        font-size: $font_13;
        padding: 5px 10px;
        display: inline-block;
        cursor: pointer;
        &:first-child{
        border-right:0;
        border-top-left-radius: $radius;
        border-bottom-left-radius: $radius;
        }
        &:last-child{
        border-top-right-radius: $radius;
        border-bottom-right-radius: $radius;
        }
        &.select{
        background: $primaryColor;
        color: $white;
        }
    }
}
</style>
