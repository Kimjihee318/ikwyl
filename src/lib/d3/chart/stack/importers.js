import { SafeIdMixin } from '../../mixins/SafeId.mixin'
import Controller from '../../mixins/Controller.mixin'
// Chart
import Canvas from '../../mixins/DrawCanvas.mixin'
import Stack from '../../mixins/Stack.mixin'
import RealtimeMonitor from './realtimeMonotir'

export default {
  mixins: [Canvas, Controller, RealtimeMonitor, SafeIdMixin, Stack]
}
