<template>
  <div>
    <ui-card>
      <h3>Daily</h3>
      <div>
        {{ todaySHSInfo }}
      </div>
      <div v-for="(item, i) in todaySHS.quantity" class="report_today" :key="`report_t_q${i}`">
        <div class="report_title">{{ item.title }}</div>
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
export default {
  name: 'today-summary',
  data: () => ({
    todaySHS: {
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
        dailyAvg: {
          title: '감지 시간',
          value: []
        }
      }
    },
    todaySHSInfo: ''
  }),
  mounted() {
    this.setSHS()
  },
  methods: {
    // [ Daily SHS ]
    async setSHS() {
      let isSHS = await this.getReportFromServer()
      if (!isSHS) return
      let todaySHSKey = Object.keys(this.dailySHS).filter(d => __F.expressionCheckToday(new Date(d)))
      if (!todaySHSKey || todaySHSKey.length === 0) {
        this.todaySHSMode = 'NO_DATA'
        this.todaySHSInfo = 'Please Add Data'
        return
      }

      let todaySHS = this.dailySHS[todaySHSKey]
      let avgSHSQauntity = __F.propertyMean(todaySHS, 'quantity')
      let avgSHSTime = todaySHS.map(d => __F.timeFormat('%H:%M %p', d.date))
      // set Quantity
      this.todaySHS.quantity.shs.value = avgSHSQauntity
      // set Time
      this.todaySHS.time.dailyAvg.value = avgSHSTime
    }
  }
}
</script>

<style lang="scss" scoped></style>
