<template>
  <div class="main">
    <div class="main_top calendar_wrapper">
      <Calendar />
    </div>
    <div class="main_body">
      <div class="main_left">
        <chart-column
          :Canvas="columnCanvas"
          :FloorInfo="columnFloorInfo"
          :Unit="columnUnit"
          :User="user"
          :DataItems="columnDataItems"
        />
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
      <div class="main_right">
        <div class="main_right_chart_wapper">
          <chart-floor
            v-for="(bgItem, key) in floorBgItems"
            :class="`key_${key}`"
            :key="`chart__${key}`"
            :Canvas="floorCanvas"
            :FloorInfo="floorFloorInfo"
            :BackgroundItem="bgItem"
            :Unit="floorUnit"
            :User="user"
            :DataItems="getfloorDataItem(key)"
          ></chart-floor>
        </div>
        <div class="main_right_card_wapper">
          <ui-card
            v-for="(item, i) in floorSummary"
            :card-style="propStyle"
            :style="styleCard(item)"
            :key="`floor_summary_${i}`"
          >
            <template>
              <div class="card_contents_floor">{{ item.floor }} 층</div>
              <div v-for="(_item, _i) in item" class="card_contents_report" :key="`rep_${_i}`">
                <div class="card_contents_report_title">{{ _item.title }}</div>
                <div class="card_contents_report_val">{{ _item.value }}</div>
              </div>
            </template>
          </ui-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
import __F from '@/primitives/_function_'
import mainMixin from '@/mixins/main.mixins'

export default {
  name: 'main-page',
  mixins: [mainMixin],

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
    floorBgStructure: {},
    floorSummary: [],
    formattedJoinedSHS: {},
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
    todaySHSInfo: '',
    todaySHSMode: '',
    todaySurroundingSHS: [],
    todayFloorSHS: [],
    todayUserFloorSHS: [],
    userWeeklySHS: [],
    weeklySHS: []
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['userInfo']),
    ...mapState(__C.STORE.NAMESPACE.REPORT, ['dailySHS', 'joinedSHSWithUserInfo']),
    floorBgItems() {
      return this.floorBgStructure
    },
    floorDataItems() {
      let today = new Date()
      let propertyToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      return this.formattedJoinedSHS[propertyToday]
    },
    stackedDataItems() {
      return this.userWeeklySHS
    },
    timeDataItems() {
      return this.userWeeklySHS
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
    this.setSHS()
    this.getJoinedSHS()
  },
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.REPORT, ['getReportFromServer', 'getJoinedSHSFromServer']),
    // [ JOINED SHS ]
    async getJoinedSHS() {
      console.log(`[SET JOINED]`)
      let isData = await this.getJoinedSHSFromServer()
      if (!isData) return
      this.setFloorSHS()
      this.setSurroundingRoomsSHS()
      this.setCumulativeSHS()
      this.formatJoinedSHS()
      this.setFloorBgStructure()
      this.setSurroundingFloorSHS(new Date())
    },
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
    },
    formatJoinedSHS() {
      let copied = JSON.parse(JSON.stringify(this.joinedSHSWithUserInfo))

      copied.forEach(d => {
        let date = new Date(d.date)
        Object.assign(d, {
          ['formatedDate']: new Date(date.getFullYear(), date.getMonth(), date.getDate())
        })
      })
      let result = copied.reduce((c, v) => {
        c[v.formatedDate] = c[v.formatedDate] || {} //Init if company property does not exist
        c[v.formatedDate][v.floor] = c[v.formatedDate][v.floor] || [] //Add employee property with null value
        c[v.formatedDate][v.floor].push(v)
        return c
      }, {})

      this.formattedJoinedSHS = result
    },
    getfloorDataItem(item) {
      return this.floorDataItems && Object.keys(this.floorDataItems).length > 0 ? this.floorDataItems[item] : []
    },
    // [ Cumulated SHS ]
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
    },
    // [ Floor SHS ]
    setFloorBgStructure() {
      let floors = []
      switch (this.userInfo.floor) {
        case this.userInfo.maxfloor:
          floors = [this.userInfo.floor - 1, this.userInfo.floor]
          break
        case 1:
          floors = [this.userInfo.floor, this.userInfo.floor + 1]
          break
        default:
          floors = [this.userInfo.floor - 1, this.userInfo.floor, this.userInfo.floor + 1]
          break
      }

      floors.forEach(f => {
        Object.assign(this.floorBgStructure, {
          [f]: Array.from({ length: 12 }, (u, i) => {
            let idx = i + 1
            return { unit: i + 1 >= 10 ? `${f}${idx}` : `${f}0${idx}` }
          })
        })
      })
    },
    setFloorSHS() {
      this.todayUserFloorSHS = this.joinedSHSWithUserInfo.filter(d => {
        return d.floor === this.userInfo.floor && __F.expressionCheckToday(new Date(d.date))
      })
      // ! FIX FUNC NAME
      let avgUserFloorSHS = __F.propertyMean(this.todayUserFloorSHS, 'quantity')
      this.todaySHS.quantity.shsFloor.value = avgUserFloorSHS
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
      this.todaySHS.quantity.shsSurround.value = avgSurroundingSHS
    },
    setSurroundingFloorSHS(date) {
      // ! FIX DATA NAME
      let dateKey = Object.keys(this.formattedJoinedSHS).filter(d => {
        return (
          new Date(d).getFullYear() === date.getFullYear() &&
          new Date(d).getMonth() === date.getMonth() &&
          new Date(d).getDate() === date.getDate()
        )
      })[0]
      let selectedSHS = this.formattedJoinedSHS[dateKey]
      let floorKeys = Object.keys(this.formattedJoinedSHS[dateKey])
      let result = []
      floorKeys.forEach(d => {
        result.push({
          floor: Number(d),
          avgQuantity: { title: '층 평균 간접 흡연 량', value: __F.propertyMean(selectedSHS[d], 'quantity') },
          noOfMembers: { title: '층별 오늘 데이터 입력자 수', value: selectedSHS[d].length },
          noOfTotalMembers: { title: '층별 총 이용자 수', value: selectedSHS[d].length }
        })
      })

      this.floorSummary = result
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 1rem;
  .calendar_wrapper {
    padding-bottom: 1rem;
  }
  .main_body {
    display: flex;
    justify-content: space-between;

    .main_right {
      display: flex;
      justify-content: space-between;

      &_chart_wapper {
        margin-right: 1rem;
      }

      &_card_wapper {
        .card_contents_report {
          display: flex;
          justify-content: space-between;
          width: 13rem;
        }
      }
    }
    .main_left {
      &.fixed_width {
        width: 20rem;
      }
    }
  }
  .today_summary {
    border: 1px solid #c0ddff;
  }
  .report_today,
  .report_cumulative {
    display: flex;
    justify-content: space-between;
    &_title {
      width: 10rem;
    }
  }
}
</style>
