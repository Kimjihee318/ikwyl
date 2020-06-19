import { SafeIdMixin } from '../../mixins/SafeId.mixin'
import Controller from '../../mixins/Controller.mixin'
import RealtimeMonitor from './realtimeMonotir'

// Chart
import Canvas from '../../mixins/DrawCanvas.mixin'
import Floor from '../../mixins/FloorStructure.mixin'

export default {
  mixins: [Canvas, Controller, Floor, RealtimeMonitor, SafeIdMixin]
}
