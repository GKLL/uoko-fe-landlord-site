/*
 * @Description: 订单详情
 * @Author: chenmo
 * @Date: 2019-02-20 09:29:37
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 11:23:13
 */

<template>
  <section class="order-detils">
    <div class="order-info">
      <h2>服务包订单信息</h2>
      <div class='serviceName'>
        <span>服务包名称：{{orderInfo.servicePackage || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>服务包订单号：{{orderInfo.servicePackageOrderNo || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>下单时间：{{orderInfo.createTime|| '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>实付款：{{orderInfo.price || 0 }}元</span>
      </div>
    </div>
    <div class="order-info">
      <h2>服务包订单信息</h2>
      <div class='order-type' v-for="(item, index) in orderInfo.serviceItems" :key="index">
        <div class="order-item">
          <span>订单号：{{item.orderNo || '无'}}</span>
          <div :class="item.status === 7 ? '' : 'order-item-type'">{{getOrderStatusName(item.status)}}</div>
        </div>
        <div class="order-item">
          <span>产品类型：{{item.serviceType || '无'}}</span>
        </div>
        <div class="order-item">
          <span>产品名称：{{item.serviceName || '无'}}</span>
        </div>
      </div>
    </div>
    <div class="order-info">
      <h2>其他信息</h2>
      <div class='serviceName'>
        <span>服务房源：{{orderInfo.serviceHouseName || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>联系人：{{orderInfo.houseContact || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>联系电话：{{orderInfo.houseContactPhone|| '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>备      注：{{orderInfo.remark }}</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { getQueryString } from '@/utils/utils';

import { STATUS_NAME } from '@/config/config';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'ServiceDetile',
})
// 类方式声明当前组件
export default class ServiceOrder extends CommonMixins {
  private servicePackageId: string = ''; // 订单id
  private orderInfo: any = {}; // 服务订单详情

  private mounted() {
    this.servicePackageId = String(this.$route.query.servicePackageId);
    this.getServiceOrder(this.servicePackageId); // 获取订单列表
  }

  /**
   * @description 获取订单详情
   * @params servicePackageId 订单id
   * @returns void
   * @author chenmo
   */
  private async getServiceOrder(servicePackageId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getOrderDetils + `/${servicePackageId}`);
      if (res && res.code === '000') {
        this.orderInfo = res.data || [];
      } else {
        this.$toast.fail(`获取订单详情失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }

  /**
   * @description 获取订单状态
   * @params status 状态枚举
   * @returns string
   * @author chenmo
   */
  private getOrderStatusName(status: number) {
    return STATUS_NAME[status];
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.order-detils
  .order-info
    padding 0 vw(15) vw(12)
    background $global-background
    margin-bottom vw(10)
  h2
    padding vw(12) 0
    font-size 16px
    color $text-color
    border-bottom 1px solid $border-color-light
  .serviceName
    font-size 15px
    color $text-color
    padding-top vw(10)
  .order-type
    padding-bottom vw(10)
    border-bottom 1px solid $bg-color-default
    .order-item
      display -webkit-flex /* Safari */
      display flex
      flex-direction row
      flex-wrap nowrap
      justify-content space-between
      align-items center
      font-size 15px
      color $text-color
      padding-top vw(10)
      .order-item-type
        color $main-color

</style>
