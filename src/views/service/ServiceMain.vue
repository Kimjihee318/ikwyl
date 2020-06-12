<template>
  <div class="main">
    <div class="main_top calendar_wrapper">
      <Calendar />
    </div>
    <div class="main_body">
      <div class="main_left">
        <div class="main_left_chart_wapper">
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
        <div class="main_left_card_wapper">
          <ui-card
            v-for="(item, i) in floorSummaries"
            :card-style="propStyle"
            :style="styleCard(item)"
            :key="`floor_summary_${i}`"
          >
            <!-- // * slot -->
            <div class="card_contents_floor">{{ item.floor }} 층</div>
            <div v-for="(_item, _i) in item.values" class="card_contents_report" :key="`rep_${_i}`">
              <div class="card_contents_report_title">{{ _item.title }}</div>
              <div class="card_contents_report_val">{{ _item.value }}</div>
            </div>
          </ui-card>
        </div>
      </div>
      <div class="main_right fixed_width">
        <chart-column
          :Canvas="columnCanvas"
          :FloorInfo="columnFloorInfo"
          :Unit="columnUnit"
          :User="user"
          :DataItems="columnDataItems"
        />
        <!-- <Stack :Canvas="stackedCanvas" :Chart="stackedChart" :Circle="stackedCircle" :DataItems="stackedDataItems" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import __C from '@/primitives/_constants_.js'
import _ChartFloorData from '@/primitives/chartFloorPlan'
import _ChartColumnData from '@/primitives/chartColumnPlan'
import UiCard from '@/components/ui/Card.vue'
import Calendar from '@/components/ui/Calendar.vue'
import ChartColumn from '@/lib/d3/chart/columnPlan/SvgColStructure'
import ChartFloor from '@/lib/d3/chart/floorPlan/SvgFloorStructure.vue'

import { mapState } from 'vuex'
export default {
  name: 'main-page',
  components: {
    UiCard,
    Calendar,
    ChartColumn,
    ChartFloor
  },
  data: () => ({
    floorSummaries: []
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user', 'userInfo']),
    columnCanvas() {
      return _ChartColumnData.canvas
    },
    columnFloorInfo() {
      return _ChartColumnData.floorInfo
    },
    columnDataItems() {
      return _ChartColumnData.dataItems
    },
    columnUnit() {
      return _ChartColumnData.unit
    },
    floorCanvas() {
      return _ChartFloorData.canvas
    },
    floorDataItems() {
      return _ChartFloorData.dataItems
    },
    floorFloorInfo() {
      return _ChartFloorData.floorInfo
    },
    floorUnit() {
      return _ChartFloorData.unit
    },
    propStyle() {
      return {
        marginBottom: `${0.75}rem`
      }
    }
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

  methods: {
    styleCard(item) {
      return {
        backgroundColor: `${item.floor === this.userInfo.floor ? _ChartFloorData.canvas.CanvasBgPointColor : null}`,
        height: `${_ChartFloorData.canvas.CanvasHeight}px`
      }
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

    .main_left {
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
    .main_right {
      &.fixed_width {
        width: 20rem;
      }
    }
  }
}
</style>
