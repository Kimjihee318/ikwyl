import { SafeIdMixin } from '../../mixins/SafeId.mixin'
import Controller from '../../mixins/Controller.mixin'

// Chart
import Canvas from '../../mixins/DrawCanvas.mixin'
import UserImage from '../../mixins/DrawUserImage.mixin'

export default {
  mixins: [SafeIdMixin, Controller, Canvas, UserImage]
}
