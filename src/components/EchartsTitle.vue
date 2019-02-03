/*
 * @Description: echarts title
 * @Author: QingTong
 * @Date: 2018-12-19 11:24:28
 * @Last Modified by: QingTong
 * @Last Modified time: 2018-12-19 11:35:52
 */

<template>
  <div class="chart-tit">
    <i class="chart-icon"></i>
    {{ title }}
  </div> 
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class EchartsTitle extends Vue {
  @Prop({ type: String, default: '图表数据' })
  private title: string;
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/main.styl'
  .chart-tit
    font-size vw(16)
    color #474747
  .chart-icon 
    display inline-block
    width vw(20)
    height vw(20)
    background-size cover
    background-repeat no-repeat
    background-image url('../assets/images/icon/icon_data.png')
    position relative
    top vw(4)
</style>