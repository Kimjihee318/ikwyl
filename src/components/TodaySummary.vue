<template>
  <div class="comp_td_summary" :class="{ no_data: isNoData }">
    <ui-card>
      <h3 class="light title type_english_font ui_card_title">Daily <br />Secondhand Smoke</h3>
      <div v-if="isNoData" class="msg_nodata">
        <span>{{ todaySHSInfo }}</span>
      </div>
      <div v-for="(item, i) in todaySHS.quantity" class="report_today" :key="`report_t_q${i}`">
        <div class="report_title ">{{ item.title }}</div>
        <div class="report_contents">{{ item.value }}</div>
      </div>
      <div v-for="(item, i) in todaySHS.time" class="report_today" :key="`report_t_t${i}`">
        <div class="report_title">{{ item.title }}</div>
        <div class="report_contents">
          <span v-for="(_item, _i) in item.value" :key="`shs_time_${_i}`">{{ _item }}</span>
        </div>
      </div>
    </ui-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import __C from '@/primitives/_constants_.js'
import __F from '@/primitives/_function_'
import UiCard from '@/components/ui/Card.vue'

export default {
  name: 'today-summary',
  components: {
    UiCard
  },
  data: () => ({
    todaySHS: {
      quantity: {
        shs: {
          title: '평균 간접 흡연 량',
          value: ''
        },
        shsFloor: {
          title: '같은 층 간접 흡연 량',
          value: ''
        },
        shsSurround: {
          title: '주위 간접 흡연 량',
          value: ''
        }
      },
      time: {
        dailyAvg: {
          title: '감지 시간',
          value: []
        }
      }
    },
    todaySHSInfo: '',
    todaySHSMode: '',
    todayUserFloorSHS: []
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['userInfo']),
    ...mapState(__C.STORE.NAMESPACE.REPORT, ['dailySHS', 'joinedSHSWithUserInfo']),
    isNoData() {
      return this.todaySHSMode === 'NO_DATA'
    }
  },
  mounted() {
    this.setSHS()
    this.getJoinedSHS()
  },
  methods: {
    // * getJoined 를 중복해서 부르고 있음
    ...mapActions(__C.STORE.NAMESPACE.REPORT, ['getReportFromServer', 'getJoinedSHSFromServer']),
    async getJoinedSHS() {
      let isData = await this.getJoinedSHSFromServer()
      if (!isData) return
      this.setFloorSHS()
      this.setSurroundingRoomsSHS()
    },
    setFloorSHS() {
      this.todayUserFloorSHS = this.joinedSHSWithUserInfo.filter(d => {
        return d.floor === this.userInfo.floor && __F.expressionCheckToday(new Date(d.date))
      })
      // ! FIX FUNC NAME
      let avgUserFloorSHS = __F.propertyMean(this.todayUserFloorSHS, 'quantity')
      this.todaySHS.quantity.shsFloor.value = __F.integer(avgUserFloorSHS)
    },
    // [ Surround SHS ]
    setSurroundingRoomsSHS() {
      console.log(`[SET SURROUNDING]`)
      if (this.todayUserFloorSHS.length === 0) return
      let unit = this.userInfo.unit
      this.todaySurroundingSHS = this.todayUserFloorSHS.filter(d => {
        return d.unit === unit + 1 || d.unit === unit - 1 || d.unit === unit
      })
      let avgSurroundingSHS = __F.propertyMean(this.todaySurroundingSHS, 'quantity')
      this.todaySHS.quantity.shsSurround.value = __F.integer(avgSurroundingSHS)
    },
    // [ Daily SHS ]
    async setSHS() {
      let isSHS = await this.getReportFromServer()
      if (!isSHS) return
      let todaySHSKey = Object.keys(this.dailySHS).filter(d => __F.expressionCheckToday(new Date(d)))
      if (!todaySHSKey || todaySHSKey.length === 0) {
        this.todaySHSMode = 'NO_DATA'
        this.todaySHSInfo = 'Please Add Today Record'
        return
      }

      let todaySHS = this.dailySHS[todaySHSKey]
      let avgSHSQauntity = __F.propertyMean(todaySHS, 'quantity')
      let avgSHSTime = todaySHS.map(d => __F.timeFormat('%H:%M %p', d.date))
      // set Quantity
      this.todaySHS.quantity.shs.value = __F.integer(avgSHSQauntity)
      // set Time
      this.todaySHS.time.dailyAvg.value = avgSHSTime
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/_summary.scss';
</style>
