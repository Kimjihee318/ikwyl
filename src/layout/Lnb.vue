<template>
  <div>
    <div class="logo"></div>
    <div class="account_info">
      <div class="user">
        <div class="user_img"></div>
        <div class="user_name">{{ userUpperCase }}</div>
      </div>
      <div class="card_style">
        <div class="card_style_red"></div>
        <div class="card_style_blue"></div>
      </div>
      <div class="building">
        <div class="building_name">{{ userInfo.buildingName }}</div>
        <div class="building_unit">
          {{ `${userInfo.buildingNo}동 ${userInfo.unit}호` }}
        </div>
      </div>
    </div>
    <button class="">Add</button>
    <Chart :Canvas="canvas" :FloorInfo="floorInfo" :Unit="unit" :User="user" :DataItems="dataItems" />
  </div>
</template>

<script>
// import Logo from '../assets/icons/smoke_free-24px.svg'
import __C from '@/primitives/_constants_.js'
import _ChartData from '@/primitives/chartFloorPlan_Lnb'
import Chart from '@/lib/d3/chart/floorPlan/SvgStructure.vue'
import { mapState } from 'vuex'

export default {
  name: 'left-navigation-bar',
  components: {
    Chart
    // Logo,
  },
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user', 'userInfo']),
    userUpperCase() {
      return this.user.toUpperCase()
    },
    canvas() {
      return _ChartData.canvas
    },
    dataItems() {
      return _ChartData.dataItems
    },
    floorInfo() {
      return _ChartData.floorInfo
    },
    unit() {
      return _ChartData.unit
    }
  }
  // components: { }
}
</script>
<style lang="scss" scoped>
.logo {
  height: 3rem;
}
.account_info {
  position: relative;
  display: flex;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #2d519f;
  border: 1px solid #81a8e3;
  color: #ffffff;

  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 0.4rem;
    padding-right: 0.8rem;
    border-right: 1px solid #8ea3ea;
    &_img {
      width: 2rem;
      height: 2rem;
      margin-bottom: 0.2rem;
      border: 2px solid #8ea3ea;
      border-radius: 50%;
    }
    &_name {
      width: 4rem;
      overflow: hidden;
      text-align: center;
      word-wrap: break-word;
    }
  }
  .card_style {
    position: absolute;
    top: 1.2rem;
    left: 0.8rem;
    > div {
      width: 0.6rem;
      height: 0.6rem;
    }

    &_red {
      margin-bottom: 0.3rem;
      background-color: #b6b6dc;
    }

    &_blue {
      background-color: #7dafee;
    }
  }
  .building {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1rem;
    > div {
      width: 8rem;
      overflow: hidden;
      word-wrap: break-word;
    }

    &_name {
      margin-bottom: 0.5rem;
    }
  }
}

.today_summary {
  border: 1px solid #c0ddff;
}
</style>
