export default {
  methods: {
    drawCanvas() {
      // In the modal window, class name 'canvas' need to be set.
      // And its border should be applied by style 'border', if not,
      // it could be caused that the border style of the lines are
      // thickened.
      this.svg
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
        .attr('version', '1.2')
        .attr('id', `${this.localId}_svg`)
        .attr('class', 'canvas')
        .attr('width', this.Canvas.CanvasWidth)
        .attr('height', this.Canvas.CanvasHeight)
        .style(
          'border',
          `solid ${this.Canvas.CanvasBorderWeight}px ${this.Canvas.CanvasBorderColor}`,
        )
        .style('background-color', '#fff')

      // Note. ViewBox makes some lines antialiasing.
      // .attr('viewBox', `0 0 ${this.Canvas.CanvasWidth} ${this.Canvas.CanvasHeight}`)

      // 'opacity' of the svg is affected to all elements too.
      // .style('background-color', this.Canvas.CanvasFillColor)
      // .style('opacity', this.Canvas.CanvasOpacity)
      // -------------------------------------------------- Canvas
      this.svg
        .append('rect')
        .attr('class', `_canvas_border_background__${this.localId}`)
        .attr('width', this.Canvas.CanvasWidth)
        .attr('height', this.Canvas.CanvasHeight)
        .attr('stroke-width', 0)
        .attr('fill', this.Canvas.CanvasFillColor)
        .attr('fill-opacity', this.Canvas.CanvasOpacity)

      // -------------------------------------------------- CHART
      if (this.Canvas.CanvasChartAreaAllowed != 'Y') return

      this.chartArea = this.svg
        .append('g')
        .attr('id', `chart_area___${this.localId}`)
        .attr(
          'transform',
          `translate(${this.Canvas.CanvasChartX},${this.Canvas.CanvasChartY})`,
        )

      // For the border & background of the Chart Area.
      this.chartArea
        .append('rect')
        .attr('class', '_chart_area_border_background__')
        .attr('width', this.Canvas.CanvasChartWidth)
        .attr('height', this.Canvas.CanvasChartHeight)
        .attr('stroke', this.Canvas.CanvasChartBorderColor)
        .attr('stroke-width', this.Canvas.CanvasChartBorderWeight)
        .attr('fill', this.Canvas.CanvasChartFillColor)
        .attr('fill-opacity', this.Canvas.CanvasChartOpacity)
    },
  },
}
