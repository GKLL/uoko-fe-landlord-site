/*
 * @Description 底部按钮
 * @Author: QingTong 
 * @Date: 2018-11-27 11:15:10 
 * @Last Modified by: QingTong
 * @Last Modified time: 2018-11-27 11:15:48
 */
<template>
  <div class="bottom-btn">
    <div class="item" :class="item.value === btn ? 'on' : ''" v-for="(item,index) in btnLists" :key="index">
      <router-link :to="item.route">
        <p class="theme-btn-p"><i class="uk-icon-sm" :class="'uk-icon-sm-'+item.icon"></i></p>
        <p class="theme-btn-label">{{item.label}}</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  @Component
  export default class BottomBtn extends Vue {
    @Prop({ type: String, default: 'businessOpa' })
    private btn: string;
    private btnLists: any[] = [{
          label: '经营指标',
          value: 'businessOpa',
          route: '/businessOpa',
          icon: 'yewu',
        },
        // {
        //   label: '线上运营',
        //   value: 'mainFlow',
        //   route: '/mainFlow',
        //   icon: 'liuliang',
        // },
        {
          label: '报表主题',
          value: 'reportTopic',
          route: '/home',
          icon: 'zhuti',
        }];
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/main.styl'
  .uk-icon-sm
    width vw(23)
    height vw(23)
    display block
    margin vw(6) auto vw(2) auto
    background-size cover
    background-repeat no-repeat
    &.uk-icon-sm-yewu
      background-image url('../assets/images/icon/icon_jingying_unselected.png')
    &.uk-icon-sm-liuliang
      background-image url('../assets/images/icon/icon_yunying_unselected.png')
    &.uk-icon-sm-zhuti
      background-image url('../assets/images/icon/icon_baobiao_unselected.png')
  .bottom-btn
    position fixed
    bottom 0
    left 0
    width 100%
    height vw(54)
    color #fff
    text-align center
    font-size vw(12)
    display flex
    justify-content center
    border-top 1px solid #ccc
    z-index 999
    background #fff
  .item
    width 33%
    cursor pointer
    a
      color #5d656b
      display block
    &.on a
      color #01B3A9
      .uk-icon-sm-yewu
        background-image url('../assets/images/icon/icon_jingying_select.png')
      .uk-icon-sm-liuliang
        background-image url('../assets/images/icon/icon_yunying_select.png')
      .uk-icon-sm-zhuti
        background-image url('../assets/images/icon/icon_baobiao_select.png')
</style>