<template>
  <div class="news_list_box">
    <ul class="news_list">
      <li v-for="item in list" :key="'news'+item.id">
        <div class="news_time">
          <b>{{item.pubDateStr}}</b> - {{getNormalTime(item.dataInfoTime)}}
        </div>
        <div class="news_content">
          <h3><a target="_blank" :href="item.sourceUrl">{{item.title}}</a></h3>
          <p align="left">{{item.summary}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    list: Array
  },
  data(){
    return {

    }
  }  
}
</script>

<style scoped lang="scss">
@import '@/style/colors.scss';
.news_list_box{
  position: relative;
  &:before {
    content: '';
    display: block;
    height: 100%;
    width: .06rem;
    background: #bcbfc0;
    position: absolute;
    left: 1.05rem;
  }
}
.news_list{
  li{
    position: relative;
    margin-bottom: 1rem;
    margin-left: 2.1rem;
    &::before {
      content: '';
      display: block;
      height: .625rem;
      width: .625rem;
      border: 1px solid $primaryColor - #111;
      background: $primaryColor;
      position: absolute;
      border-radius: 50%;
      top: 0.1rem;
      left: -1.4rem;
    }
    .news_time{
      width: 3rem;
      position: relative;
      white-space: nowrap;
      font-size: .7rem;
      color: $black_9;
      margin-bottom:.3rem;
      b{color: $black_3;font-size: .8rem;}
    }
    .news_content{
      @include blockcard;
      position: relative;
      word-break: break-all;
      color: $black_3;
      h3{
        font-weight: 700;
        font-size: .9rem;
        text-overflow: ellipsis;
        margin: .6rem auto;
        text-align: left;
        a{
          color: $black_3;
          &:hover{
            color:$primaryColor;
          }
        }
      }
      p{
        color: $black_9;
        font-size: .7rem;
        line-height: 1.3rem;
      }
    }
  }
}
</style>
