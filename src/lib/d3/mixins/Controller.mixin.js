import * as d3 from 'd3'

export default {
  data: () => ({
    execRequested: [],
    svg: null,
    svg2: null
  }),
  methods: {
    clear() {
      if (!d3.select(`#${this.localId}`).empty()) d3.select(`#${this.localId}`).html('')
      this.svg = d3.select(`#${this.localId}`).append('svg')
      if (this.needsSecondSvg) {
        d3.select(`#${this.localId}_second_svg`).html('')
        this.svg2 = d3
          .select(`#${this.localId}`)
          .append('svg')
          .attr('class', `${this.localId}_second_svg`)
      }
    },
    complete() {
      setTimeout(() => {
        this.$emit('complete', this.localId)
        this.$emit('to-xml-string', this.toXmlString())
      }, 1000)
    },
    exec(requested) {
      if (requested.num != this.execRequested.length) return

      this.execRequested = []
      requested.drawer()
    },
    // Drawing Common
    noDataFound() {
      let text_NoDataFound = this.svg
        .append('text')
        .attr('class', '_nodatafound__')
        .style('font-size', 14)
        .style('font-style', 'italic')
        .style('fill', '#f0f')
        .text('___ No data found. ___')

      let boxW_ = this.getNodeElValue('._nodatafound__', 'width')
      let boxH_ = this.getNodeElValue('._nodatafound__', 'height')
      let boxX_ = Math.round(this.Canvas.CanvasWidth / 2 - boxW_ / 2)
      let boxY_ = Math.round(this.Canvas.CanvasHeight / 2 - boxH_ / 2)

      text_NoDataFound.attr('transform', `translate(${boxX_},${boxY_})`)
    },
    ready2draw() {
      return this.DataItems.length > 0 && Object.keys(this.Canvas).length > 0
    },
    ready2draw4NoDataItems() {
      return Object.keys(this.Canvas).length > 0
    },
    ready2draw4FloorStructure() {
      return Object.keys(this.BackgroundItem).length > 0 && Object.keys(this.Canvas).length > 0
    },
    ready2draw4SurroundingStructure() {
      return Object.keys(this.UserInfo).length > 0 && Object.keys(this.Canvas).length > 0
    },
    register(drawer) {
      let requested = {
        num: this.execRequested.length + 1,
        time: new Date().getTime(),
        drawer: () => {
          drawer()
        }
      }
      this.execRequested.push(requested)
      setTimeout(() => {
        this.exec(requested)
      }, 250)
    }
  }
}
