/*
 * @Description: Echarts二次封装
 * @Author: LiuZhen
 * @Date: 2018-09-30 13:51:03
 * @Last Modified by: LiuZhen
 * @Last Modified time: 2018-10-26 14:43:25
 */
<template>
  <div :id="id" :style="{width: width, height: height}" class="echarts-wrap"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { getRandomString } from '@/utils/utils';
import echarts from 'echarts/lib/echarts';

require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

@Component
export default class Eacharts extends Vue {
  private id: string = getRandomString(16);
  private lineChart: any = null;

  @Prop({ type: String, default: '100%' })
  private width: string;
  @Prop({ type: String, default: '300px' })
  private height: string;
  @Prop({ type: Object })
  private data: object;

  // mounted
  private mounted(): void {
    this.lineChart = echarts.init(document.getElementById(`${this.id}`));
    this.lineChart.setOption(this.data);
  }
  @Watch('data')
  private dataChange(val: any, oldVal: any): void {
    if (!(JSON.stringify(val) === '{}' || !val)) {
      this.lineChart.clear();
      this.lineChart.setOption(val, true);
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
