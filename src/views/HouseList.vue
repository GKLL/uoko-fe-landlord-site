/*
 * @Description: 提交房源
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-15 16:55:42
 */

<template>
  <section class="house">
    <section v-if="tableData.length == 0">
      <div class="list">
        <h2>仁和春天国际花园</h2>
        <p class="item-desc">
          <a> 提交成功，请保持手机畅通，资产管家将尽快与您联系，您也可以直接拨打电话咨询：<i class="call-icon"></i><i class="mobile">13550223963</i></a>
        </p>
      </div>
      <div class="list">
        <h2>仁和春天国际花园</h2>
        <p class="item-desc">
          <a> 提交成功，请保持手机畅通，资产管家将尽快与您联系，您也可以直接拨打电话咨询：<i class="call-icon"></i><i class="mobile">13550223963</i></a>
        </p>
      </div>
    </section>
    <section class="no-house" v-else>
      <img src="../assets/images/illustration_blank.png" alt="图标"/>
      <p>您尚未提交意向资源，您可以<a>立即增加</a></p>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col } from 'vant';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'HouseList',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
  }
})
// 类方式声明当前组件
export default class Login extends CommonMixins {
  private tableData: any[] = []; // 委托房源列表

  private mounted() {
    this.getHouseList(); // 获取房源列表
  }

  private async getHouseList() {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getHouseList);
      if (res && res.code === '200') {
        this.tableData = res.data || [];
      } else {
        this.$toast(res.message);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.no-house
  text-align center
  img 
    display inline-block
    width 100px
    margin-top vw(80)
  p
    margin-top 20px
    font-size 14px
    color $text-color
    a
      display inline-block
      color $main-color
.house
  .list
    width 100%
    margin-bottom vw(20)
    background $global-background
    h2 
      font-size 18px
      border-bottom 1px solid $bg-color-default
      line-height: 1;
      padding: 20px 10px 20px 20px;
    .item-desc
      a
        display inline-block
        padding 20px 20px
        color $next-text-color
        font-size 12px
        line-height 1.5
      .call-icon
        width 18px
        height 18px
        background-image url('../assets/images/icon/call_2.png')
        background-repeat no-repeat
        background-position 0px -2px
        background-size contain
        display inline-block
        vertical-align: middle
      .mobile
        display inline-block
        line-height 1.5
        color $main-color
        font-size 16px
</style>
