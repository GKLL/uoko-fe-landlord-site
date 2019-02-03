<!--
/*
 * @Description 主题组件
 * @Author: QingTong 
 * @Date: 2018-11-27 11:18:16 
 * @Last Modified by: LiuZhen
 * @Last Modified time: 2019-01-23 11:43:12
 */
-->
<template>
  <section class="item-wrap">
    <div :class="data.length > 1 ? 'item-controls' : 'item-control'"
         v-for="(item,index) in data" 
         :key="index"
         :style="{ backgroundColor: backgroundColor }">
      <p class="item-tit">{{item.label}}</p>
      <p class="item-cont"><span class="num">{{item.number}}</span><span class="unit">{{item.unit}}</span></p>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  @Component
  export default class ReportItem extends Vue {
    @Prop({ type: Array, default: () => [] })
    private data: any[];
    @Prop({ type: String, default: '#0099CC' })
    private backgroundColor: string;
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/main.styl'
  .item-controls
    width vw(165)
    height vw(100)
    display inline-block
    color #fff
    padding-top vw(16)
    padding-left vw(15)
    margin-bottom vw(10)
    border-radius vw(5)
    font-size vw(18)
    &:nth-child(2n+1)
      margin-right vw(8)
  .item-tit 
    font-size vw(14)
  .item-cont
    text-align left
    margin-top vw(15)
    span.num
      font-size vw(20)
      font-weight 600
    span.unit
      margin-left vw(5)
      font-size vw(14)
  .item-control
    width 100%
    height vw(100)
    color #fff
    padding vw(10)
    border-radius vw(5)
    margin-bottom vw(10)
</style>