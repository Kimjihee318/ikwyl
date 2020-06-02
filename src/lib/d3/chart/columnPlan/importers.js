import { SafeIdMixin } from '../../mixins/SafeId.mixin'
import Controller from '../../mixins/Controller.mixin'
// Chart
import Canvas from '../../mixins/DrawCanvas.mixin'
import Column from '../../mixins/ColumnStructure.mixin'

export default {
  mixins: [SafeIdMixin, Controller, Canvas, Column]
}
