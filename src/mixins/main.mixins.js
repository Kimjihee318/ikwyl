import { mapState } from 'vuex'
import __C from '@/primitives/_constants_.js'
import _ChartFloorData from '@/primitives/chartFloorPlan'
import Calendar from '@/components/ui/Calendar.vue'
import ChartFloor from '@/lib/d3/chart/floorPlan/SvgFloorStructure.vue'
import UiCard from '@/components/ui/Card.vue'

export default {
  components: {
    Calendar,
    ChartFloor,
    UiCard
  },
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user', 'userInfo']),

    floorCanvas() {
      return _ChartFloorData.canvas
    },
    floorUserInfo() {
      return this.userInfo
    },
    floorUnit() {
      return _ChartFloorData.unit
    }
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
