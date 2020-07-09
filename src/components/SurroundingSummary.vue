<template>
  <div class="wrap__card wrap__card_surrounding" :class="{ no_data: isNoData }">
    <ui-card class="card_surrounding">
      <chart-surrounding
        :Canvas="surroundingCanvas"
        :Rect="surroundingRect"
        :Scale="surroundingScale"
        :Unit="surroundingUnit"
        :UserInfo="userInfo"
        :DataItems="surroundingDataItems"
        @emit="setQuantity"
      />
      <div class="card_surrounding_rightside">
        <div class="card_surrounding_rightside_h_row">
          <div>같은 층 간접 흡연 평균</div>
          <div>
            <span>{{ avgHRow }}</span>
          </div>
        </div>
        <div class="card_surrounding_rightside_v_row">
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
    avgVRow: '',
    isNoData: null
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['userInfo']),
    surroundingCanvas() {
      return _ChartSurroundingData.canvas
    },
    surroundingDataItems() {
      return this.dataItems
    },
    surroundingRect() {
      return _ChartSurroundingData.rect
    },
    surroundingScale() {
      return _ChartSurroundingData.scale
    },
    surroundingUnit() {
      return _ChartSurroundingData.unit
    }
  },
  watch: {
    dataItems: {
      handler(val) {
        if (!val || val.length === 0) {
          this.isNoData = true
          this.init()
          return
        }
        this.isNoData = false
      },
      deep: true
    }
  },
  methods: {
    init() {
      this.avgHRow = ''
      this.avgVRow = ''
    },
    setQuantity({ hRow, vRow }) {
      this.avgHRow = __F.mean(hRow)
      this.avgVRow = __F.mean(vRow)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap__card_surrounding {
  vertical-align: bottom;
}
.card_surrounding {
  display: flex;
  justify-content: space-around;

  &_rightside {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
