import { SafeIdMixin } from '../../mixins/SafeId.mixin'
import Controller from '../../mixins/Controller.mixin'
// Chart
import Canvas from '../../mixins/DrawCanvas.mixin'
import TimeChart from '../../mixins/DrawTimeChart.mixin'
import Gradient from '../../mixins/DrawGradients.mixin'

export default {
  mixins: [SafeIdMixin, Controller, Canvas, Gradient, TimeChart]
}
