/*
 * @Description echarts item封装
 * @Author: QingTong 
 * @Date: 2018-11-27 11:16:20 
 * @Last Modified by: QingTong
 * @Last Modified time: 2018-12-19 13:59:51
 */
<template>
  <div>
    <div class="title-box">
      <h2 class="item-h2">{{model.title}}</h2>
      <span class="end-time">{{model.date}}</span>
    </div>
    <ReportItem :data="operationData" :backgroundColor="backgroundColor" v-if="showOperationData"></ReportItem>
    <div class="item-echarts">
      <slot name="title"></slot>
      <slot name="comparePV"></slot>
      <custom-echarts :data="echartsData" :width="width" :height="height"></custom-echarts>
      <slot name="compareUV"></slot>
      <custom-echarts :data="echartsDataPie" :width="width" :height="height" v-if="!showOperationData"></custom-echarts>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import ReportItem from '@/components/ReportItem.vue';
  import CustomEcharts from '@/components/Echarts.vue';
  @Component({
    components: {
      ReportItem,
      'custom-echarts': CustomEcharts
    }
  })
  export default class EchartsItem extends Vue {
    @Prop({
      type: Object,
      default: () => {
        return { title: '', date: '' };
      }
    })
    private model: object;
    @Prop({
      type: Array,
      default: () => {
        return [];
      }
    })
    private operationData: any[];
    @Prop({ type: String, default: '#0099CC' })
    private backgroundColor: string;
    @Prop({ type: Object })
    private echartsData: object;
    @Prop({ type: Object })
    private echartsDataPie: object;
    @Prop({ type: String, default: '100%' })
    private width: string;
    @Prop({ type: String, default: '300px' })
    private height: string;
    private showOperationData: boolean = !this.echartsDataPie;
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/main.styl'
  .item-echarts
    margin-left auto 
    margin-right auto
  .title-box
    margin-bottom vw(15)
    display flex
    justify-content space-between
    align-items flex-end
    .item-h2
      font-size vw(20)
      color #474747
    .end-time
      font-size: vw(10)
      color: #999999
</style>