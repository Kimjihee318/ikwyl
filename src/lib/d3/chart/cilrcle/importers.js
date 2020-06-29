import { SafeIdMixin } from '../../mixins/SafeId.mixin'
import Controller from '../../mixins/Controller.mixin'
import RealtimeMonitor from './realtimeMonotir'
// Chart
import Canvas from '../../mixins/DrawCanvas.mixin'
import Circle from '../../mixins/DrawCircleChart.mixin'
import Filters from '../../mixins/DrawFilters.mixin'

export default {
  mixins: [Canvas, Circle, Controller, Filters, RealtimeMonitor, SafeIdMixin]
}
