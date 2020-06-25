<template>
  <div class="surrounding_card_wrapper">
    <ui-card class="surrounding_card">
      <chart-surrounding
        :Canvas="surroundingCanvas"
        :FloorInfo="surroundingFloorInfo"
        :Scale="surroundingScale"
        :Unit="surroundingUnit"
        :UserInfo="userInfo"
        :DataItems="surroundingDataItems"
        @emit="setQuantity"
      />
      <div class="surrounding_card_rightside">
        <div class="surrounding_card_rightside_h_row">
          <div>같은 층 간접 흡연 평균</div>
          <div>
            <span>{{ avgHRow }}</span>
          </div>
        </div>
        <div class="surrounding_card_rightside_v_row">
          <div>위 아래층 간접 흡연 평균</div>
          <div>
            <span>{{ avgVRow }}</span>
          </div>
        </div>
      </div>
    </ui-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import __C from '@/primitives/_constants_'
import __F from '@/primitives/_function_'
import _ChartSurroundingData from '@/primitives/chartColumnPlan'
import ChartSurrounding from '@/lib/d3/chart/columnPlan/SvgColStructure'
import UiCard from '@/components/ui/Card.vue'

export default {
  name: 'surrounding-summary',
  components: {
    ChartSurrounding,
    UiCard
  },
  props: {
    dataItems: { type: Array, default: () => [] }
  },
  data: () => ({
    avgHRow: '',
    avgVRow: ''
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['userInfo']),
    surroundingCanvas() {
      return _ChartSurroundingData.canvas
    },
    surroundingDataItems() {
      return this.dataItems
    },
    surroundingFloorInfo() {
      return _ChartSurroundingData.floorInfo
    },
    surroundingScale() {
      return _ChartSurroundingData.scale
    },
    surroundingUnit() {
      return _ChartSurroundingData.unit
    }
  },
  mounted() {},
  methods: {
    setQuantity({ hRow, vRow }) {
      this.avgHRow = __F.mean(hRow)
      this.avgVRow = __F.mean(vRow)
    }
  }
}
</script>

<style lang="scss" scoped>
.surrounding_card {
  display: flex;
  justify-content: space-around;

  &_wrapper {
    vertical-align: bottom;
  }
  &_rightside {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    &_h_row {
    }
    &_v_row {
    }
  }
}
</style>
