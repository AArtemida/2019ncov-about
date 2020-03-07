<template>
  <div class="rumor_list_box">
    <swiper :options="swiperOpt" class="swiper-wrap" ref="rumorlist" v-if="list.length>0">
      <swiper-slide v-for="item in list" :key="item._id">
        <div class="rumor_item">
            <div class="rumor_item_top">
                <h2>{{item.title}}</h2>
            </div>
            <div class="rumor_item_content">
                <h3>{{item.mainSummary}}</h3>
                <p>{{item.body}}</p>
            </div>
        </div>
      </swiper-slide>
      <!-- 常见的小圆点 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  data() {
    return {
        swiperOpt:{
            loop: true,
            //初始索引
            initialSlide: 0,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                type: "bullets"
            },
            spaceBetween : 12,
        }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/colors.scss";
$radius: $font_10;
.rumor_list_box {
    text-align: left;
  .rumor_item {
    @include blockcard;
    padding: 0;
    border-radius: $radius;
    // height: 25rem;
    .rumor_item_top{
        height: 9rem;
        background: $primaryColor;
        border-top-left-radius: $radius;
        border-top-right-radius: $radius;
        position: relative;
        padding: $font_10;
        background: url(../assets/img/rumor.jpg) no-repeat;
        background-size: 100% 100%;
        h2{
            position: absolute;
            bottom: 0;
            color: $white;
            margin-bottom: .4rem;
        }
    }
    .rumor_item_content{
        padding: $font_10;
        h3{
            margin: .5rem 0;
        }
        p{
            font-size: $font_12;
            color: $black_6;
            word-break: break-word;
            line-height: 1.3rem;
        }
    }
  }
}
</style>
