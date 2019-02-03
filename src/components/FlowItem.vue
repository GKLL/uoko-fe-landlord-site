<!--
/*
 * @Description 主站流量组件
 * @Author: QingTong 
 * @Date: 2018-11-27 11:17:11 
 * @Last Modified by: LiuZhen
 * @Last Modified time: 2019-01-23 11:44:16
 */
-->
<template>
  <div class="flow-wrap">
    <div class="flow clearfix">
      <!-- <i class="triangle-down"></i> -->
      <div class="flow-left fl">
        <span>{{ title | upperCase}}</span>
      </div>
      <div class="flow-center fl">
        <p class="flow-number fl">{{ flowData.number }}</p>
        <div class="flow-label fl">
          <p :class="flowData.range >= 0 ? 'show-red' : 'show-green'">
            <i :class="flowData.range >= 0 ? 'triangle-up' : 'triangle-down'" class="triangle"></i>
            {{ flowData.range | int }}%
          </p>
          <p class="compare">相比于7天前</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  @Component({
    filters: {
      upperCase(value: string) {
        return value.toUpperCase();
      },
      int(value: any) {
        return Math.abs(value);
      }
    }
  })
  export default class EchartsItem extends Vue {
    @Prop({ type: Object })
    private data: any;
    @Prop({ type: String, default: 'PV' })
    private title: string;
    private flowData: any = {};

    // mounted
    private mounted(): void {
        this.flowData = this.data[this.title];
    }
    @Watch('data')
    private dataChange(val: any, oldVal: any): void {
      if (!(JSON.stringify(val) === '{}' || !val)) {
        this.flowData = this.data[this.title];
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/main.styl'
  .show-red 
    color #C23531
  .show-green
    color #3FB58E
  .flow-wrap 
    margin-top vw(10)
    // margin-bottom vw(-30)
  .flow-left
    width 30%
    padding-top vw(10)
    font-weight 600
  .flow-center
    width 67%
    color #474747
  .flow-number
    position relative
    top vw(2)
    font-size vw(22)
    transform scale(0.9,1.28)
  .flow-label
    font-size vw(12)
    margin-left vw(4)
  .compare
    color #999999
  .triangle
    width 0
    height 0
    border-style solid
    position relative
    margin-right vw(3)
    &.triangle-up
      border-width 0 vw(4) vw(6)
      border-color transparent transparent #C23531
      top vw(-10)
    &.triangle-down
      border-width vw(6) vw(4) 0
      border-color #3FB58E transparent transparent 
      top vw(10)
</style>