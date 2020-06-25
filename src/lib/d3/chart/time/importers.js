import { SafeIdMixin } from '../../mixins/SafeId.mixin'
import Controller from '../../mixins/Controller.mixin'
import RealtimeMonitor from './realtimeMonotir'

// Chart
import Canvas from '../../mixins/DrawCanvas.mixin'
import TimeChart from '../../mixins/DrawTimeChart.mixin'
import Filters from '../../mixins/DrawFilters.mixin'

export default {
  mixins: [SafeIdMixin, Controller, Canvas, Filters, RealtimeMonitor, TimeChart]
}
