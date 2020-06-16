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
          <div v-for="(item, i) in reportToday.quantity" class="report_today" :key="`report_t_q${i}`">
            <div class="report_title">{{ item.title }}</div>
            <div class="report_contents">{{ item.value }}</div>
          </div>
          <div v-for="(item, i) in reportToday.time" class="report_today" :key="`report_t_t${i}`">
            <div class="report_title">{{ item.title }}</div>
            <div class="report_contents">{{ item.value }}</div>
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
          <div v-for="(item, i) in reportCumulative.quantity" class="report_today" :key="`report_c_q${i}`">
            <div class="report_title">{{ item.title }}</div>
            <div class="report_contents">{{ item.value }}</div>
          </div>
          <chart-time :Canvas="timeCanvas" :Chart="timeChart" :Circle="timeCircle" :DataItems="timeDataItems" />
          <div v-for="(item, i) in reportCumulative.time" class="report_today" :key="`report_c_t${i}`">
            <div class="report_title">{{ item.title }}</div>
            <div class="report_contents">{{ item.value }}</div>
          </div>
        </ui-card>
      </div>
      <div class="main_right">
        <div class="main_right_chart_wapper">
          <chart-floor
            v-for="(dataItem, i) in floorDataItems"
            :key="`chart__${i}`"
            :Canvas="floorCanvas"
            :FloorInfo="floorFloorInfo"
            :Unit="floorUnit"
            :User="user"
            :DataItems="dataItem"
          />
        </div>
        <div class="main_right_card_wapper">
          <ui-card
            v-for="(item, i) in floorSummaries"
            :card-style="propStyle"
            :style="styleCard(item)"
            :key="`floor_summary_${i}`"
          >
            <template>
              <div class="card_contents_floor">{{ item.floor }} 층</div>
              <div v-for="(_item, _i) in item.values" class="card_contents_report" :key="`rep_${_i}`">
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
import __C from '@/primitives/_constants_.js'
import mainMixin from '@/mixins/main.mixins'

export default {
  name: 'main-page',
  mixins: [mainMixin],

  data: () => ({
    floorSummaries: [],
    reportToday: {
      quantity: {
        shs: {
          title: '평균 간접 흡연 량',
          value: ''
        },
        shsFloor: {
          title: '같은층 간접 흡연 량',
          value: ''
        },
        shs4Room: {
          title: '주위 간접 흡연 량',
          value: ''
        }
      },
      time: [
        {
          title: '감지 시간',
          value: [new Date().getHours(), new Date(new Date().setHours(15)).getHours()]
        }
      ]
    },
    reportCumulative: {
      quantity: [
        {
          title: '평균 간접 흡연 량',
          value: 9
        },
        {
          title: '같은층 간접 흡연 량',
          value: 7
        },
        {
          title: '주위 간접 흡연 량',
          value: 3
        }
      ],
      time: [
        {
          title: '평균 감지 시간',
          value: new Date().getHours()
        },
        {
          title: '주말 평균 감지 시간',
          value: new Date().getHours()
        }
      ]
    }
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.REPORT, ['dailySHS'])
  },
  created() {
    // !FIX change database data
    this.floorSummaries = [
      {
        floor: 8,
        values: [
          { title: '평균 간접 흡연량', value: 7 },
          { title: '평균 감지 시간', value: 18 },
          { title: '평균 주말 감지 시간', value: 18 },
          { title: '흡연자 있을 가능성', value: 100 }
        ]
      },
      {
        floor: 9,
        values: [
          { title: '평균 간접 흡연량', value: 7 },
          { title: '평균 감지 시간', value: 18 },
          { title: '평균 주말 감지 시간', value: 18 },
          { title: '흡연자 있을 가능성', value: 80 }
        ]
      },
      {
        floor: 10,
        values: [
          { title: '평균 간접 흡연량', value: 7 },
          { title: '평균 감지 시간', value: 18 },
          { title: '평균 주말 감지 시간', value: 18 },
          { title: '흡연자 있을 가능성', value: 18 }
        ]
      }
    ]
  },
  mounted() {
    this.setSHS()
  },
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.REPORT, ['getReportFromServer', 'getJoinedReportFromServer']),
    async setSHS() {
      let isSHS = await this.getReportFromServer()
      if (!isSHS) return
      let today = new Date()
      let todaySHSKey = Object.keys(this.dailySHS).filter(d => {
        return (
          new Date(d).getFullYear() === today.getFullYear() &&
          new Date(d).getMonth() === today.getMonth() &&
          new Date(d).getDate() === today.getDate()
        )
      })

      let todaySHS = this.dailySHS[todaySHSKey]

      let avgSHSDegree =
        todaySHS.reduce((c, v) => {
          return c + v.quantity
        }, 0) / todaySHS.length

      this.reportToday.quantity.shs.value = avgSHSDegree
    },
    async setFloorSHS() {}
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
