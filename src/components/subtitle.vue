<template>
  <div class="subtitle">
    <span>{{title}}</span>
    <slot name="right"></slot> 
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
@import "@/style/colors.scss";
.subtitle {
  margin: 0.8rem 0;
  text-align: left;
  position: relative;
  padding-left: 1rem;
  font-size: 1rem;
  font-weight: bold;
  &:before {
    display: inline-block;
    content: "";
    width: 0.3rem;
    height: 1.5rem;
    background: $primaryColor;
    position: absolute;
    left: 0;
  }
}
</style>
