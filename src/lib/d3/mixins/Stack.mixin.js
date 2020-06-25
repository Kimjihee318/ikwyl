import * as d3 from 'd3'
import __F from '@/primitives/_function_'

export default {
  data: () => ({
    dataItems: [],
    extentTime: [],
    timeGroup: null, // * Selection
    circleGroup: null, // * Selection
    scaleVBand: () => {},
    scaleTime: () => {}
  }),
  methods: {
    drawStacked() {
      this.setScale()
      this.drawAxis()
      this.drawRects()
    },
    setScale() {
      this.dataItems = JSON.parse(JSON.stringify(this.DataItems))
      this.extentTime = __F.getWeekDates()

      this.scaleTime = d3
        .scaleTime()
        .domain(this.extentTime)
        .range([0, this.Canvas.CanvasWidth - this.Chart.ChartHPadding])

      this.scaleVBand = d3
        .scaleBand()
        .domain(d3.range(10))
        .range([0, this.Canvas.CanvasHeight - this.Chart.ChartVPadding])
        .round(true)
    },
    drawAxis() {
      let xAxis = d3
        .axisBottom()
        .scale(this.scaleTime)
        .tickFormat(d => `${d3.timeFormat('%d')(d)}일`)
        .ticks(8)
        .tickSize(3)
        .tickPadding(10)

      this.chartArea
        .append('g')
        .attr('class', 'xAxis')
        .attr(
          'transform',
          `translate(${this.Chart.ChartHPadding / 2}, ${this.Canvas.CanvasHeight - this.Chart.ChartVPadding})`
        )
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'middle')
    },
    drawRects() {
      if (this.Rect.RectFillType !== 'Fill')
        this.setClipPath(
          this.chartArea,
          this.Canvas.CanvasWidth - this.Chart.ChartHPadding,
          this.Canvas.CanvasHeight - this.Chart.ChartVPadding,
          this.scaleVClippath
        )

      this.timeGroup = this.chartArea
        .append('g')
        .attr('class', `chart_group`)
        .append('clipPath')
        .attr('id', 'clip-bar-rects')
        .selectAll('g')
        .data(this.dataItems)
        .enter()

      const clipPath = this.chartArea.append('g').attr('clip-path', `url(#clip-bar-rects)`)

      clipPath
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.Canvas.CanvasWidth - this.Chart.ChartHPadding)
        .attr('height', this.Canvas.CanvasHeight - this.Chart.ChartVPadding)
        .style('fill', 'url(#bg-gradient)')

      this.timeGroup
        .append('g')
        .attr('class', (d, i) => `date_${i}`)
        .attr('transform', d => {
          return `translate(${this.scaleTime(new Date(d.date)) +
            this.Chart.ChartHPadding / 2}, ${-this.scaleVBand.bandwidth() - 5})`
        })
        .each((d, i, j) => {
          let _self = d3.select(j[i])

          _self
            .selectAll('rect')
            .data(Array.from({ length: d.quantity }, () => null))
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', (d, i) => {
              return this.Canvas.CanvasHeight - this.Chart.ChartVPadding - (2 + 4) * i
            })
            .attr('width', 100)
            .attr('height', 100)
            .attr('fill', this.Rect.RectFillType !== 'Fill' ? `url(#gradient_linear_${0})` : this.Rect.RectFillColor)
        })
    }
  }
}
