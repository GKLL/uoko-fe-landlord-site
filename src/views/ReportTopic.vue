<!--
/*
 * @Description 主题报表
 * @Author: QingTong 
 * @Date: 2018-11-27 11:13:23 
 * @Last Modified by: LiuZhen
 * @Last Modified time: 2019-01-22 17:51:34
 */
-->
 <template>
  <div class="theme-bj">
    <Bubble title="报表主题"></Bubble>
    <div class="theme-wrap">
      <ul class="theme-list clearfix">
        <router-link :to="item.route" v-for="(item, index) in routeLists" :key="index">
          <li class="theme-item">
            <div class="li-inner">
              <p class="theme-p"><i class="uk-icon" :class="'uk-icon-'+item.icon"></i></p>
              <p class="theme-label">{{ item.label }}</p>
            </div>
          </li>
        </router-link>
      </ul>
    </div>
    <BottomBtn btn="reportTopic"></BottomBtn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import commonMixins from '@/utils/mixins/commonMixins';
import Bubble from '@/components/Bubble.vue';
import BottomBtn from '@/components/BottomBtn.vue';
import { routeList } from '@/config/routeList';
import { RouteList } from '@/interface/routeList.interface';

@Component({
  components: {
    Bubble,
    BottomBtn
  }
})
export default class ReportTopic extends commonMixins {
  private routeLists: RouteList[]  = routeList;
  private created(): void {
    this.scrollToTop();
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/main.styl'
  .uk-icon
    width vw(60)
    height vw(60)
    display block
    margin 0 auto
    background-size cover
    background-repeat no-repeat
    &.uk-icon-yewu
      background-image url('../assets/images/icon/baobiaopage_icon_jingyingzhibiao.png')
    &.uk-icon-liuliang
      background-image url('../assets/images/icon/baobiaopage_icon_xianshangyunying.png')
    &.uk-icon-zhuti
      background-image url('../assets/images/icon/baobiaopage_icon_shujuzhiliang.png')
  ul,li
    box-sizing border-box
  .theme-bj
    background #f5f5f5
    height 100%
    position fixed
    width 100%
  .theme-wrap
    padding-top vw(24)
    padding-bottom vw(50)
  .theme-list
    width 100%
  .theme-item
    float left
    width 41%
    height vw(140)
    margin-left 6%
    text-align center
    background #fff
    color #474747
    border-radius vw(6)
    margin-bottom vw(20)
    position relative
  .li-inner
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
  .theme-p i
    font-size vw(26)
  .theme-label
    margin-top vw(6)
    font-size vw(14)
</style>