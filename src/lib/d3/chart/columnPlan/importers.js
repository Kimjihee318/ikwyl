import { SafeIdMixin } from '../../mixins/SafeId.mixin'
import Controller from '../../mixins/Controller.mixin'
import RealtimeMonitor from './realtimeMonotir'
// Chart
import Canvas from '../../mixins/DrawCanvas.mixin'
import Column from '../../mixins/ColumnStructure.mixin'
import Filter from '../../mixins/DrawFilters.mixin'

export default {
  mixins: [Canvas, Column, Controller, Filter, RealtimeMonitor, SafeIdMixin]
}
