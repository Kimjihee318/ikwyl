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
        <div class="building_name">{{ userInfo.buildingname }}</div>
        <div class="building_unit">
          {{ `${userInfo.buildingno}동 ${userInfo.unit}호` }}
        </div>
      </div>
    </div>
    <button class="add" @click="onAdd">Add Record</button>
    <ui-modal v-if="modalOpened" v-model="modalOpened">
      <template #slot_title>Today Second Hand Smoking Upload</template>
      <template #slot_contents><form-smoke-today /></template>
    </ui-modal>
    <div class="chart"></div>
    <ui-card>
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
    <!-- <img src="@/assets/ref.jpg" alt="reference" /> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import __C from '@/primitives/_constants_.js'
import _ChartStackedData from '@/primitives/chartStacked'
import _ChartTimeData from '@/primitives/chartTime'
import ChartStack from '@/lib/d3/chart/stack/StackedChart.vue'
import ChartTime from '@/lib/d3/chart/time/TimeChart.vue'
import UiCard from '@/components/ui/Card.vue'
import UiModal from '@/components/ui/Modal.vue'
import FormSmokeToday from '@/components/form/FormSmokeToday.vue'

export default {
  name: 'left-navigation-bar',
  components: {
    ChartStack,
    ChartTime,
    FormSmokeToday,
    UiCard,
    UiModal
    // Logo,
  },
  data: () => ({
    modalOpened: false,
    reportToday: {
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
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user', 'userInfo']),
    userUpperCase() {
      return this.user.toUpperCase()
    },
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
      return _ChartStackedData.dataItems[0]
    },
    timeCanvas() {
      return _ChartTimeData.canvas
    },
    timeCircle() {
      return _ChartTimeData.circle
    },
    timeChart() {
      return _ChartTimeData.chart
    },
    timeDataItems() {
      return _ChartTimeData.dataItems
    }
  },
  mounted() {
    this.getUserInfoFromServer()
  },
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.ACCOUNT, ['getUserInfoFromServer']),

    onAdd() {
      this.modalOpened = true
    }
  }
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
.add {
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 0.4rem;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 0.2rem;
  color: #1a2157;
  font-weight: bold;
}
.chart {
  > div {
    margin-bottom: 1rem;
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
</style>
