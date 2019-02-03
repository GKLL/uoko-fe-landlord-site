/*
 * @Description 业务经营
 * @Author: QingTong 
 * @Date: 2018-11-27 11:13:16 
 * @Last Modified by: QingTong
 * @Last Modified time: 2018-12-19 14:54:32
 */
<template>
  <div class="main-wrap"> 
    <Bubble title="经营指标"/>
    <div ref="wrapper">
      <div class="main-section">
        <div class="main-section-echarts">
          <lazy-component :datas="operationDatas"
                          @before-init="beforeInit('getOperationData')">
            <echarts-item :model="operationDatas.model"
                          :operationData="operationDatas.seriesList"
                          :echartsData="operationDatas.chartsList"
                          :width="echartWidth"
                          height="260px">
              <EchartsTitle slot="title" :title="operationDatas.title"/>           
            </echarts-item>
            <echarts-item-skeleton slot="skeleton"/>
          </lazy-component>
          <div class="place-holder"></div>
        </div>
        <div>
          <lazy-component :datas="vacantDatas"
                          @before-init="beforeInit('getVacantData')">
            <echarts-item :model="vacantDatas.model"
                          backgroundColor="#66CC99"
                          :operationData="vacantDatas.seriesList"
                          :echartsData="vacantDatas.chartsList"
                          :width="echartWidth"
                          height="300px">
              <EchartsTitle slot="title" :title="vacantDatas.title"/>
            </echarts-item>
            <echarts-item-skeleton slot="skeleton"/>
          </lazy-component>
          <div class="place-holder"></div>
        </div>
        <div>
          <lazy-component :datas="takeHouseData"
                          @before-init="beforeInit('getTakeHouseData')">
            <echarts-item :model="takeHouseData.model"
                          backgroundColor="#FF9900"
                          :operationData="takeHouseData.seriesList"
                          :echartsData="takeHouseData.chartsList"
                          :width="echartWidth"
                          height="300px">
              <EchartsTitle slot="title" :title="takeHouseData.title"/>
            </echarts-item>
            <echarts-item-skeleton slot="skeleton"/>
          </lazy-component>
          <div class="place-holder"></div>
        </div>
        <div class="main-section-echarts">
            <lazy-component :datas="dataStatusResign"
                            @before-init="getDataStatusFrom('R_C_RESIGN')">
              <echarts-item :model="dataStatusResign.model"
                            :operationData="dataStatusResign.seriesList"
                            :echartsData="dataStatusResign.chartsList"
                            :width="echartWidth"
                            height="260px">
                <EchartsTitle slot="title" :title="dataStatusResign.title"/>
              </echarts-item>
              <echarts-item-skeleton slot="skeleton"/>
            </lazy-component>
            <div class="place-holder"></div>
        </div>
        <div class="main-section-echarts">
          <lazy-component :datas="dataStatusApplyFailure"
                          @before-init="getDataStatusFrom('R_C_FINANCIAL_PAYMENT_FAILED')">
            <echarts-item :model="dataStatusApplyFailure.model"
                          backgroundColor="#99CC33"
                          :operationData="dataStatusApplyFailure.seriesList"
                          :echartsData="dataStatusApplyFailure.chartsList"
                          :width="echartWidth"
                          height="260px">
              <EchartsTitle slot="title" :title="dataStatusApplyFailure.title"/>
            </echarts-item>
            <echarts-item-skeleton slot="skeleton"/>
          </lazy-component>
          <div class="place-holder"></div>
        </div>
        <div class="main-section-echarts">
          <lazy-component :datas="dataStatusMismatch"
                          @before-init="getDataStatusFrom('ROOM_UNMATCHED')">
            <echarts-item :model="dataStatusMismatch.model"
                          backgroundColor="#FF6600"
                          :operationData="dataStatusMismatch.seriesList"
                          :echartsData="dataStatusMismatch.chartsList"
                          :width="echartWidth"
                          height="260px">
              <EchartsTitle slot="title" :title="dataStatusMismatch.title"/>
            </echarts-item>
            <echarts-item-skeleton slot="skeleton"/>
          </lazy-component>
        </div>
      </div>
    </div>
    <BottomBtn btn="businessOpa"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import commonMixins from '@/utils/mixins/commonMixins';
  import Bubble from '@/components/Bubble.vue';
  import BottomBtn from '@/components/BottomBtn.vue';
  import EchartsItem from '@/components/EchartsItem.vue';
  import EchartsTitle from '@/components/EchartsTitle.vue';
  import EchartsItemSkeleton from '@/components/EchartsItemSkeleton.vue';
  import { component as VueLazyComponent } from '@xunlei/vue-lazy-component';
  import { getDimention, transformVwToPx } from '@/utils/utils';
  import LazyComponent from '@/components/LazyComponent.vue';
  import { State, Getter, Action } from 'vuex-class';
  import BScroll from 'better-scroll';
  import { getRandomString } from '@/utils/utils';
  const namespace: string = 'echarts';
  @Component({
    components: {
      Bubble,
      BottomBtn,
      [EchartsTitle.name]: EchartsTitle,
      'lazy-component': LazyComponent,
      'echarts-item': EchartsItem,
      'echarts-item-skeleton': EchartsItemSkeleton,
      'vue-lazy-component': VueLazyComponent,
    }
  })
  export default class BusinessOpa extends commonMixins {
    [key: string]: any;
    private id: string = getRandomString(16);
    // private activeNames: string = '';
    private winHeight: number = (getDimention() as any).h - 50;
    private echartWidth: string = (getDimention() as any).w - transformVwToPx(2.6) + 'px';
    private winDpr: number = (getDimention() as any).dpr;

    // operationDatas: 运营数据
    @Getter('operationData', { namespace }) private operationDatas: {};
    // vacantData: 空置数据
    @Getter('vacantData', { namespace }) private vacantDatas: any;
    // takeHouseData: 拿房数据
    @Getter('takeHouseData', { namespace }) private takeHouseData: any;
    // dataStatus: 数据状态
    @Getter('dataStatus', { namespace }) private dataStatus: any;

    // dataStatus: 数据状态-打回重签数据
    @Getter('dataStatusResign', { namespace }) private dataStatusResign: any;
    // dataStatus: 数据状态-金融支付失败申请数据
    @Getter('dataStatusApplyFailure', { namespace }) private dataStatusApplyFailure: any;
    // dataStatus: 数据状态-不匹配数据
    @Getter('dataStatusMismatch', { namespace }) private dataStatusMismatch: any;

    // 获取运营数据
    @Action('getOperationData', { namespace }) private getOperationData: any;
    // 获取空置数据
    @Action('getVacantData', { namespace }) private getVacantData: any;
    // 获取累计拿房数据
    @Action('getTakeHouseData', { namespace }) private getTakeHouseData: any;
    // 获取数据状态
    @Action('getDataStatus', { namespace }) private getDataStatus: any;

    private created(): void {
      this.scrollToTop();
    }

    // private mounted(): void {
    //   this.$nextTick(() => {
    //     const scroll: object = new BScroll(this.$refs.wrapper, {
    //       scrollY: true,
    //       scrollbar: false,
    //       eventPassthrough: 'horizontal',
    //     });
    //   });
    // }

    /**
     * @description 改变顶部title
     * @param {*} title 字符串
     * @author qingtong
     */
    // private changeTitle(model: any): void {
    //   this.activeNames = model.title;
    // }

    /**
     * @description 到达视口发送请求
     * @param {*} sendUrlTitle string
     * @author qingtong
     */
    private beforeInit(sendUrlTitle: string): void {
      this[sendUrlTitle]();
    }

    /**
     * @description 到达视口发送请求 多点数据
     * @param {*} sendUrlTitle string
     * @author qingtong
     */
    private getDataStatusFrom(from: string): void {
      this.getDataStatus(from);
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/main.styl'
  .main-section-echarts .echarts-wrap
    top vw(-34)
  .main-wrap
    padding-bottom vw(20)
    .place-holder
      height vw(10)
      background #F7F7F7
      position relative
      margin vw(10) 0
      &:after, &:before 
        position absolute
        content ''
        width vw(18)
        height vw(10)
        top 0
        background #F7F7F7
      &:after
        right vw(-18)
      &:before
        left vw(-18)

  .main-section
    padding vw(15) vw(18) vw(40) vw(18)
    .section-item
      height vw(600)
      background #ccc
      margin-bottom vw(30)
      margin-left vw(-15)
      margin-right vw(-15)
    img 
      width 100%
</style>