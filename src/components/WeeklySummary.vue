<template>
  <div>
    <ui-card>
      <h3>Weekly</h3>
      <chart-stack
        :Canvas="stackedCanvas"
        :Chart="stackedChart"
        :Circle="stackedCircle"
        :DataItems="stackedDataItems"
      />
      <div v-for="(item, i) in cumulativeSHS.quantity" class="report_today" :key="`report_c_q${i}`">
        <div class="report_title">{{ item.title }}</div>
        <div class="report_contents">{{ item.value }}</div>
      </div>
      <chart-time :Canvas="timeCanvas" :Chart="timeChart" :Circle="timeCircle" :DataItems="timeDataItems" />
      <div v-for="(item, i) in cumulativeSHS.time" class="report_today" :key="`report_c_t${i}`">
        <div class="report_title">{{ item.title }}</div>
        <div class="report_contents">{{ item.value }}</div>
      </div>
    </ui-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import __C from '@/primitives/_constants_.js'
import __F from '@/primitives/_function_'
import _ChartStackedData from '@/primitives/chartStacked'
import _ChartTimeData from '@/primitives/chartTime'
import ChartStack from '@/lib/d3/chart/stack/StackedChart.vue'
import ChartTime from '@/lib/d3/chart/time/TimeChart.vue'
import UiCard from '@/components/ui/Card.vue'

export default {
  name: 'weekly-summary',
  components: {
    ChartStack,
    ChartTime,
    UiCard
  },
  data: () => ({
    cumulativeSHS: {
      quantity: {
        shs: {
          title: '평균 간접 흡연 량',
          value: ''
        },
        shsFloor: {
          title: '같은층 간접 흡연 량',
          value: ''
        },
        shsSurround: {
          title: '주위 간접 흡연 량',
          value: ''
        }
      },
      time: {
        daily: {
          title: '평균 감지 시간',
          value: ''
        },
        weekend: {
          title: '주말 평균 감지 시간',
          value: ''
        }
      }
    },
    userWeeklySHS: [],
    weeklySHS: []
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['userInfo']),
    ...mapState(__C.STORE.NAMESPACE.REPORT, ['joinedSHSWithUserInfo']),

    stackedCanvas() {
      return _ChartStackedData.canvas
    },
    stackedChart() {
      return _ChartStackedData.chart
    },
    stackedCircle() {
      return _ChartStackedData.circle
    },
    stackedDataItems() {
      return this.userWeeklySHS
    },
    timeCanvas() {
      return _ChartTimeData.canvas
    },
    timeDataItems() {
      return this.userWeeklySHS
    },
    timeCircle() {
      return _ChartTimeData.circle
    },
    timeChart() {
      return _ChartTimeData.chart
    }
  },
  watch: {
    userWeeklySHS: {
      handler(val) {
        if (!val || val.length === 0) return
      },
      deep: true
    }
  },
  mounted() {
    this.getJoinedSHS()
  },
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.REPORT, ['getJoinedSHSFromServer']),

    async getJoinedSHS() {
      console.log(`[FUNC WEEKLY JOINED]`)
      let isData = await this.getJoinedSHSFromServer()
      if (!isData) return
      this.setCumulativeSHS()
    },
    setCumulativeSHS() {
      let unit = this.userInfo.unit
      this.weeklySHS = __F.filterDatesByCurrentWeek(this.joinedSHSWithUserInfo, 'date')
      this.userWeeklySHS = this.weeklySHS.filter(d => d.useremail === this.userInfo.useremail)
      this.userWeeklySHS.forEach(d => (d.date = new Date(d.date)))
      let weeklyFloorSHS = this.weeklySHS.filter(d => d.floor === this.userInfo.floor)
      let weeklySurroundingSHS = weeklyFloorSHS.filter(d => {
        return d.unit === unit + 1 || d.unit === unit - 1 || d.unit === unit
      })
      // calc avg
      let avgWeeklyUserSHSQauntity = __F.propertyMean(this.userWeeklySHS, 'quantity')
      let avgUserFloorSHS = __F.propertyMean(weeklyFloorSHS, 'quantity')
      let avgSurroundingSHS = __F.propertyMean(weeklySurroundingSHS, 'quantity')
      // set Quantity
      this.cumulativeSHS.quantity.shs.value = avgWeeklyUserSHSQauntity
      this.cumulativeSHS.quantity.shsFloor.value = avgUserFloorSHS
      this.cumulativeSHS.quantity.shsSurround.value = avgSurroundingSHS
      // set Time
      let weeklySHSTime = this.weeklySHS.map(d => new Date(d.date))
      let weekendSHSTime = weeklySHSTime.filter(d => d.getDay() <= 5)

      let avgWeeklySHSTime = `${Math.floor(__F.mean(weeklySHSTime.map(d => d.getHours())))}:${Math.floor(
        __F.mean(weeklySHSTime.map(d => d.getMinutes()))
      )}` // !FIX AM / PM 추가
      let avgWeekendSHSTime =
        weekendSHSTime.length !== 0
          ? `${Math.floor(__F.mean(weekendSHSTime.map(d => d.getHours())))}: ${Math.floor(
              __F.mean(weekendSHSTime.map(d => d.getMinutes()))
            )}`
          : ''
      this.cumulativeSHS.time.daily.value = avgWeeklySHSTime
      this.cumulativeSHS.time.weekend.value = avgWeekendSHSTime
    }
  }
}
</script>

<style lang="scss" scoped></style>
