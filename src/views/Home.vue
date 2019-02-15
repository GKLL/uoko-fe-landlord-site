<!--
  /*
  * @Description: 首页
  * @Author: LiuZhen
  * @Date: 2018-09-17 17:20:01
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-15 14:41:27
  */
-->
<template>
  <section class="home">
    <main class="home-comp_list">
      <section class="header-img">
        <img src="../assets/images/home_bg.png" alt=""/>
      </section>
      <hr-title title="星空产品服务群"></hr-title>
      <section class="star-home">
        <img v-for="img in startHomeImg" :key="img.alt" alt="img.alt" :src="img.src"/>
      </section>
      <hr-title title="优客逸家" dec="连续四年最具影响力品牌"></hr-title>
      <section class="info-plant">
        <div class="info-header">
          <img class="logo" src="../assets/images/uoko.png" alt="优客逸家"/>
          <img class="right-icon" src="../assets/images/icon/icon_arrow.png" alt="right"/>
        </div>
        <div class="info-body">
          <h4>房源类型&委托服务</h4>
          <p>
            如果您有一套毛坯、老旧、简单装修的房子<br/>
            准备自持几年后售卖增值<br/>
            或一直出租收取令人愉快的租金<br/>
            最省心、简单的变现方式<br/>
            就是交给优客逸家<br/>
          </p>
        </div>
        <div class="info-footer">
          <a href="tel:10105288">
            <div class="call-number">
              <span>1010-5288</span>
              <img  src="../assets/images/icon/icon_call.png" alt="电话"/>
            </div>
          </a>
        </div>
      </section>
      <hr-title title="智能硬件"></hr-title>
      <section class="smart-lock">
          <h3>UOKO | 智能门锁</h3>
          <p class="lock-dec">
            星空业主尊享
            <span>200元</span>
            优惠
          </p>
          <p class="lock-price">
            <i>￥</i>
            1299
            <span>￥1499</span>
          </p>
          <a href={SMART_LOCK_LINK}>
            <button type="button">优惠购买</button>
          </a>
          <p class="lock-footer">
            高端精致 | 性能卓越 | 工艺精良 | 安全可靠 | 实用主义
          </p>
      </section>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Icon } from 'vant';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import HrTitle from '@/components/HrTitle.vue';
import {START_HOME_IMG} from '@/config/config';

// 声明引入的组件
@Component({
  components: {
    [Icon.name]: Icon,
    HrTitle
  }
})
// 类方式声明当前组件
export default class Home extends CommonMixins {
  private startHomeImg: any[] = START_HOME_IMG;
  @State('version') private version: string;
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'

.home
  .header-img
    img 
      display inline-block
      width 100%
  .star-home
    padding vw(20)
    display flex
    flex-wrap wrap
    justify-content space-between
    img 
      margin-bottom 10px
      width 162px
      height 100px
      vertical-align bottom
  .info-plant
    margin vw(20) 0 vw(20)
    padding 0 vw(20)
    .info-header
      width 100%
      padding 13px 15px
      border-radius 8px 8px 0 0 /* no */
      background $main-color
      background: -ms-linear-gradient(left ,$main-color 0%, $color-main-light 100%);
      background: -webkit-linear-gradient(left ,$main-color 0%, $color-main-light 100%);
      display flex
      justify-content space-between
      align-items center
      .logo
        display inline-block
        width 76px
        height 48px
      .right-icon
        display inline-block
        width 16px
    .info-body
      padding vw(20)
      background-color: $global-background
      h4
        font-size 16px; /* no */
        line-height 42px
      p
        margin-top 4px
        color $next-text-color
        font-size 13px /* no */
        line-height 18px
        letter-spacing 1px /* no */
    .info-footer
      padding: 0 vw(20)
      background-color: $global-background;
      border-top 1px solid $bg-color-default /* no */  
      border-radius 0 0 8px 8px /* no */
      .call-number
        color: $main-color
        font-size 15px /* no */
        line-height 44px
        display flex
        justify-content: space-between
        align-items center
        img {
          display inline-block
          width 24px
        }
  .smart-lock
    background-image url('../assets/images/ad_bg.png');
    background-repeat no-repeat
    background-size cover
    background-position center
    width 100%
    height 595px
    margin-top vw(20)
    color #fff
    text-align: center;
    position relative
    h3
      font-size 28px /* no */
      line-height 60px
      background-image -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(rgba(255, 255, 255, 1)),
        to(rgba(255, 255, 255, 0.2))
      )
      -webkit-background-clip text
      -webkit-text-fill-color transparent
    button
      width 100px
      height 30px
      margin vw(10) 0
      color #b8b8b8
      background-color transparent
      border 1px solid /* no */
      font-size 14px /* no */
    .lock-dec
      margin-top 10px
      color $color-gray-light
      font-size 12px /* no */
      font-weight lighter
      span
        color #fff
    .lock-price
      font-size 30px /* no */
      i
        position relative
        left 4px /* no */
        font-style normal
      span
        font-size 12px /* no */
        color $color-gray-light
        text-decoration line-through
    .lock-footer
      position: absolute
      left 50%
      bottom vw(10)
      width 100%
      font-size 10px /* no */
      color $next-text-color
      transform translateX(-50%)
</style>
