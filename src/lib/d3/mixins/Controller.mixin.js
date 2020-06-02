import * as d3 from 'd3'

export default {
  data: () => ({
    svg: null,
  }),
  methods: {
    clear() {
      if (!d3.select(`#${this.localId}`).empty())
        d3.select(`#${this.localId}`).html('')
      this.svg = d3.select(`#${this.localId}`).append('svg')
    },
    complete() {
      setTimeout(() => {
        this.$emit('complete', this.localId)
        this.$emit('to-xml-string', this.toXmlString())
      }, 1000)
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
      return (
        // this.DataItems.length > 0 &&
        Object.keys(this.Canvas).length > 0
      )
    },
  },
}
