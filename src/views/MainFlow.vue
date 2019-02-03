<!--
/*
 * @Description 主站流量
 * @Author: QingTong 
 * @Date: 2018-11-27 11:12:55 
 * @Last Modified by: QingTong
 * @Last Modified time: 2018-12-19 14:38:01
 */
-->
<template>
  <div class="main-wrap">
    <Bubble title="线上运营"></Bubble>
    <div class="main-section main-section-echarts">
      <div class="main-select">
        <h2 class="item-h2">主站流量</h2>
        <div class="radio-cus-wrap">
          <label v-for="item in selectList" :key="item.value" @click="changeFilter(item.value)">
            <i :class="item.value === mainFlowFilter ? 'on' : ''"></i>
            <span>{{ item.label }}</span>
          </label>
        </div>
      </div>
      <lazy-component :datas="showFlowData"
                      @change-title="changeTitle('主站流量')"
                      @before-init="beforeInit">
        <echarts-item :echartsData="showFlowData.PVflowData"
                      :echartsDataPie="showFlowData.UVflowData"
                      :width="echartWidth"
                      height="300px">
          <FlowItem slot="comparePV" :data="showFlowData.compareData" title="pv"/>
          <FlowItem slot="compareUV" :data="showFlowData.compareData" title="uv"/>
        </echarts-item>
        <echarts-item-skeleton slot="skeleton" :isError="!!mainFlowIsError"/>
      </lazy-component>
    </div>
    <BottomBtn btn="mainFlow"></BottomBtn>
</div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import commonMixins from '@/utils/mixins/commonMixins';
  import { Toast } from 'vant';
  import Bubble from '@/components/Bubble.vue';
  import BottomBtn from '@/components/BottomBtn.vue';
  import EchartsItem from '@/components/EchartsItem.vue';
  import LazyComponent from '@/components/LazyComponent.vue';
  import EchartsItemSkeleton from '@/components/EchartsItemSkeleton.vue';
  import FlowItem from '@/components/FlowItem.vue';
  import { getDimention, transformVwToPx } from '@/utils/utils';
  import { Getter, Action, Mutation } from 'vuex-class';
  import { selectList } from '@/config/selectList';
  import { SelectList } from '@/interface/selectList.interface';

  const namespace: string = 'echarts';
  @Component({
    components: {
      Bubble,
      BottomBtn,
      FlowItem,
      'lazy-component': LazyComponent,
      'echarts-item': EchartsItem,
      'echarts-item-skeleton': EchartsItemSkeleton,
    }
  })
  export default class MainFlow extends commonMixins {
    private activeNames: string = '主站流量';
    private selectList: SelectList[]  = selectList;
    private winHeight: number = (getDimention() as any).h - 50;
    private echartWidth: string = (getDimention() as any).w - transformVwToPx(2.6) + 'px';
    private winDpr: number = (getDimention() as any).dpr;
    private flowData: object = {};

    @Getter('mainFlowIsError', { namespace }) private mainFlowIsError: boolean|string;
    // 当前显示的filter
    @Getter('mainFlowFilter', { namespace }) private mainFlowFilter: string;
    @Getter('mainFlowData', { namespace }) private mainFlowData: any;
    @Getter('showFlowData', { namespace }) private showFlowData: any;
    // 获取主站流量
    @Action('getMainFlow', { namespace }) private getMainFlow: any;
    @Mutation('setMainFlowFilter', { namespace }) private setMainFlowFilter: any;
    @Mutation('setMainFlowError', { namespace }) private setMainFlowError: any;
    // computed
    // get testData() {
    //     return this.showFlowData;
    // }

    private created(): void {
      this.scrollToTop();
    }

    /**
     * @description 改变顶部title
     * @param {*} title 字符串
     * @author qingtong
     */
    private changeTitle(title: string): void {
      this.activeNames = title;
    }

    /**
     * @description 到达视口发送请求获取数据
     * @author qingtong
     */
    private beforeInit(): void {
      const data = this.mainFlowData[this.mainFlowFilter];
      if ((JSON.stringify(data) === '{}' || !data) && !this.mainFlowIsError) {
        this.getMainFlow();
      }
    }

    /**
     * @description 切换来源filter all website mobile
     * @author qingtong
     */
    private changeFilter(value: string): void {
      this.setMainFlowFilter({ value });
      this.beforeInit();
    }

    private beforeDestroy(): void {
      this.setMainFlowError('');
    }
    @Watch('mainFlowIsError')
    private isErrorChange(val: any, oldVal: any): void {
      if (this.mainFlowIsError) {
        Toast('' + this.mainFlowIsError);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/main.styl'
  .main-section-echarts .echarts-wrap
    top vw(-34)
  .main-wrap
    padding-bottom vw(20)
  .main-section
    padding vw(10) vw(18) vw(20) vw(18)
    .section-item
      height vw(600)
      background #ccc
      margin-bottom vw(30)
    img 
      width 100%
  .radio-cus-wrap
    label 
      margin-right vw(20)
    i 
      width vw(16)
      height vw(16)
      border-radius 100%
      background #ffffff
      border  1px solid #cccccc
      display inline-block
      position relative
      top vw(3)
      margin-right vw(6)
      &.on
        border vw(5) solid #0DB2A5
</style>