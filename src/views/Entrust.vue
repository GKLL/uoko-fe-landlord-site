/*
 * @Description: 提交房源
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-15 14:44:07
 */

<template>
  <section class="entrust">
    
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col, Button } from 'vant';
import {START_HOME_IMG} from '@/config/config';

// 声明引入的组件
@Component({
  name: 'entrust',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
  }
})
// 类方式声明当前组件
export default class Login extends CommonMixins {
  private phone: string = '';
  private code: string = '';

  /**
   * @description 清空手机号
   * @returns void
   * @author chenmo
   */
  private resectPhone() {
    this.phone = '';
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'

</style>
