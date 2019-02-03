<!--
  /*
  * @Description: 首页
  * @Author: LiuZhen
  * @Date: 2018-09-17 17:20:01
 * @Last Modified by: LiuZhen
 * @Last Modified time: 2019-01-03 15:45:19
  */
-->
<template>
  <section class="home">
    <header class="header">
      <a href="javascript:;" class="aside-link" @click="popupShow=true">
        <van-icon name="wap-nav" class="aside-btn" />
      </a>
    </header>
    <section class="home-logo">
      <van-row class="logo-wrapper">
        <van-col span="9" class="logo-img"><img :src="logoPath" alt=""></van-col>
        <van-col span="15">UOKO Mobile Web</van-col>
      </van-row>
    </section>
    <main class="home-comp_list">
      <router-link to="/businessOpa">数据平台</router-link>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Icon } from 'vant';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';

// 声明引入的组件
@Component({
  components: {
    [Icon.name]: Icon
  }
})
// 类方式声明当前组件
export default class Home extends CommonMixins {
  private activeNames: string[] = ['0'];
  private popupShow: boolean = false;
  private logoPath = require('../assets/images/Logo.svg') as string;

  @State('version') private version: string;
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'

.home
  .header
    position relative
    background-color #efefef
    width 100%
    height vw(40)
    line-height vw(40)
    padding 0 vw(20)
    a
      display inline-block
      width vw(40)
      height 100%
      .aside-btn
        position absolute
        top 50%
        left vw(20)
        transform translate3d(0, -50%, 0)
  .home-logo
    width 100%
    padding vw(20) 0
    .logo-wrapper
      height 80px
      line-height 80px
      color #333
      font-weight 600
      font-size vw(16)
      img
        width 80px
        height 80px
      .logo-img
        text-align right
    .home-descriptions
      color #666
      font-size vw(14)
      text-align center
      p
        line-height 1.6
  .home-comp_list
    margin-top vw(30)
    text-align center
    .menu-item-p
      position relative
      width 100%
      height vw(45)
      line-height vw(45)
      font-size vw(14)
      border-bottom 1px solid #efefef
      a
        display block
        width 100%
        height 100%
      .menu-item-p-arrow
        position absolute
        top 50%
        right 0
        transform translate3d(0, -50%, 0)
        color #c5c5c5
        font-size vw(10)
  .van-popup
    width 50%
    height 100%
    padding vw(20) 0
    text-align center
</style>
