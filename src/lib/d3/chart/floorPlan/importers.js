import { SafeIdMixin } from '../../mixins/SafeId.mixin'
import Controller from '../../mixins/Controller.mixin'
// Chart
import Canvas from '../../mixins/DrawCanvas.mixin'
import Floor from '../../mixins/FloorStructure.mixin'

export default {
  mixins: [SafeIdMixin, Controller, Canvas, Floor]
}
