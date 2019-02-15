/*
 * @Description: 登陆页面
 * @Author: chenmo
 * @Date: 2019-02-15 13:42:19
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-15 16:55:50
 */
<template>
  <section class="login">
    <h1>登录</h1>
    <section class="el-input">
      <p class="tip">手机号<span>(*新用户初次登录将自动注册)</span></p>
      <div style="marginBottom: 20px">
        <van-field
          v-model="phone"
          placeholder="请输入手机号"
          class="phone"
          type="number"
          clearable
        />
        <p class="error-info" ref="phoneErrorInfo"></p>
      </div>
      <p class="tip">验证码</p>
      <section class="code-box">
        <van-field
          v-model="code"
          type="number"
          placeholder="验证码"
          class="code"
          clearable
        />
        <van-button slot="button" size="normal" type="default" class="btn" v-if="!isphoneErr">发送验证码</van-button>
        <van-button slot="button" size="normal" type="default" class="btn active" v-else @click="getCode">发送验证码</van-button>
      </section>
      <van-button slot="button" size="large" type="default" class="login-btn">登录</van-button>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col, Button } from 'vant';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'login',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
  }
})
// 类方式声明当前组件
export default class Login extends CommonMixins {
   public $refs!: {
    [key: string]: any,
    phoneErrorInfo: HTMLFormElement,
  };

  private phone: string = '';
  private code: string = '';
  private isphoneErr: boolean = false; // 校验手机号
  private time: number = 60;
  private isDisabledVerfiyCodeBtn: boolean = false; // 验证码是否发送

  /**
   * @description 获取验证码
   * @returns void
   * @author chenmo
   */
  private async getCode() {
    try {
      const res: any = await this.axios.get(api.getCode + `/${this.phone}`)
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }
  /**
   * @description // 显示倒计时
   * @params phone 手机号
   * @return void
   * @author chenmo
   */
  private startCountdown() {
    this.isDisabledVerfiyCodeBtn = true;
    const timer = setInterval(() => {
      this.time--;
      if (this.time === 0) {
        this.isDisabledVerfiyCodeBtn = false;
        this.time = 60;
        clearInterval(timer);
      }
    }, 1000);
  }

  // Watch
  @Watch('phone')
  private handlerPhone(newVal: string) {
    if (newVal && /^1[345789]\d{9}$/.test(newVal)) {
      this.$refs.phoneErrorInfo.innerHTML = '';
      this.isphoneErr = true;
    } else {
      this.isphoneErr = false;
      this.$refs.phoneErrorInfo.innerHTML = '请输入正确的手机号';
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.login
  padding vw(20)
  min-height 100%
  background $global-background
  h1
    font-size 34px
    color $next-text-color
    margin-bottom vw(20)
  .el-input
    .tip
      font-family PingFang-SC-Medium
      font-size 12px
      color $tip-text-color
      margin-bottom 6px
      span
        color $main-color
    .error-info
      color $warning-color
      font-size 12px
    .phone
      flex 1
      -webkit-appearance none
      border none
      outline none
      height 56px
      line-height 56px
      font-size 14px /* no */
      color #474747
      background #f8f8f8
      border 1px solid #f8f8f8
      padding 0 24px
      width 100%
      border-radius 4px
    .code-box
      display -webkit-flex
      display flex
      justify-content space-between
      .code 
        display inline-block
        flex 1
        -webkit-appearance none
        border none
        outline none
        height 56px
        line-height 56px
        font-size 14px /* no */
        color #474747
        background #f8f8f8
        border 1px solid #f8f8f8
        padding 0 24px
        width 50%
        border-radius 4px
        margin-bottom 20px
        margin-right vw(20)
      .btn 
        height 56px
        line-height 56px
        color #fff
        background-color rgb(216, 216, 216)
        border-radius 4px
        padding 0 30px
      .active
        background $main-color
    .login-btn
      color #fff
      background rgb(216, 216, 216)
      border-radius 4px
</style>
