import { SafeIdMixin } from '../../mixins/SafeId.mixin'
import Controller from '../../mixins/Controller.mixin'
import RealtimeMonitor from './realtimeMonotir'
// Chart
import Canvas from '../../mixins/DrawCanvas.mixin'
import Stack from '../../mixins/Stack.mixin'

export default {
  mixins: [Canvas, Controller, RealtimeMonitor, SafeIdMixin, Stack]
}
