export default {
  data: () => ({
    chartArea: null,
    secondChartArea: null
  }),
  methods: {
    drawCanvas() {
      this.svg
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
        .attr('version', '1.2')
        .attr('id', `${this.localId}_svg`)
        .attr('class', 'canvas')
        .attr('width', this.Canvas.CanvasWidth)
        .attr('height', this.Canvas.CanvasHeight)
        .style('border', `solid ${this.Canvas.CanvasBorderWeight}px ${this.Canvas.CanvasBorderColor}`)
        .style(
          'background-color',
          this.FloorInfo && this.FloorInfo.Userfloor === this.DataItems.floor
            ? this.Canvas.CanvasBgPointColor
            : this.Canvas.CanvasBgColor
        )

      this.chartArea = this.svg
        .append('g')
        .attr('id', `chart_area___${this.localId}`)
        .attr('transform', `translate(${this.Canvas.CanvasChartX},${this.Canvas.CanvasChartY})`)

      if (!this.needsSecondSvg) return

      this.svg2
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
        .attr('version', '1.2')
        .attr('id', `${this.localId}_second_svg`)
        .attr('class', 'canvas')
        .attr('width', this.Canvas.CanvasSecondSvgWidth)

        .attr('height', this.Canvas.CanvasSecondSvgHeight)
        .style('border', `solid ${this.Canvas.CanvasSecondSvgBorderWeight}px ${this.Canvas.CanvasSecondSvgBorderColor}`)
        .style(
          'background-color',
          this.FloorInfo && this.FloorInfo.Userfloor === this.DataItems.floor
            ? this.Canvas.CanvasSecondSvgBgPointColor
            : this.Canvas.CanvasSecondSvgBgColor
        )

      this.secondChartArea = this.svg2
        .append('g')
        .attr('id', `second_chart_area___${this.localId}`)
        .attr('transform', `translate(${this.Canvas.CanvasSecondSvgChartX},${this.Canvas.CanvasSecondSvgChartY})`)
    }
  }
}
