/*
 * @Description echarts 骨架
 * @Author: QingTong 
 * @Date: 2018-11-27 11:16:51 
 * @Last Modified by:   QingTong 
 * @Last Modified time: 2018-11-27 11:16:51 
 */
<template>
  <div>
    <h2 class="item-h2">{{ isError ? '数据加载失败' : '数据加载中...' }}</h2>
    <section class="item-wrap">
      <div class="item-control" v-for="i in 4" :key="i"></div>
      <p class="tit"></p>
      <p class="cont"><span></span></p>
    </section>
    <div class="item-echarts">
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  @Component
  export default class EchartsItemSkeleton extends Vue {
    @Prop({ type: Boolean, default: false })
    private isError: boolean;
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../assets/stylus/main.styl'
  .item-h2
    margin-bottom vw(20)
    font-size vw(20)
  .item-control
    width vw(165)
    height vw(100)
    display inline-block
    background #EBE8E8
    padding vw(10)
    margin-bottom vw(10)
    &:nth-child(2n+1)
      margin-right vw(8)
    .tit 
      font-size vw(14)
    .cont
      margin-top vw(14)
      span 
        margin-left vw(10)
  .item-echarts
    margin-top vw(20)
    width 100%
    height 300px
    background #EBE8E8
</style>