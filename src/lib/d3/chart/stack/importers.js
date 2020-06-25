import { SafeIdMixin } from '../../mixins/SafeId.mixin'
import Controller from '../../mixins/Controller.mixin'
import RealtimeMonitor from './realtimeMonotir'
// Chart
import Canvas from '../../mixins/DrawCanvas.mixin'
import Stack from '../../mixins/Stack.mixin'
import Filters from '../../mixins/DrawFilters.mixin'

export default {
  mixins: [Canvas, Controller, Filters, RealtimeMonitor, SafeIdMixin, Stack]
}
