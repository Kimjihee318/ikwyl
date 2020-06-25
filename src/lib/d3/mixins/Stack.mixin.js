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
        .attr('class', 'stack_xAxis')
        .attr(
          'transform',
          `translate(${this.Chart.ChartHPadding / 2}, ${this.Canvas.CanvasHeight - this.Chart.ChartVPadding})`
        )
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'middle')
    },
    drawRects() {
      this.setLinearGradient4AllChart(this.chartArea, this.Rect.RectColorTypeGradient)

      this.timeGroup = this.chartArea
        .append('g')
        .attr('class', `stack_chart_group`)
        .style('fill', 'url(#gradient_linear)')
        .selectAll('g')
        .data(this.dataItems)
        .enter()

      this.timeGroup
        .append('g')
        .attr('class', (d, i) => `stack_date_group stack_date_${i}`)
        .attr('transform', d => {
          return `translate(${this.scaleTime(new Date(d.date)) +
            this.Chart.ChartHPadding / 2}, ${-this.scaleVBand.bandwidth()})`
        })
        .each((d, i, j) => {
          let _self = d3.select(j[i])

          _self
            .selectAll('rect')
            .data(Array.from({ length: d.quantity }, () => null))
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', (_d, _i) => {
              return this.Canvas.CanvasHeight - this.Chart.ChartVPadding - (3 + 4) * _i
            })
            .attr('width', 10)
            .attr('height', 4)

          _self
            .append('text')
            .attr('class', `stack_text stack_text_${i}`)
            .attr('x', 5)
            .attr('y', this.Canvas.CanvasHeight - this.Chart.ChartVPadding - 50)
            .text(d => d.quantity)
            .attr('fill', this.Rect.RectTextColor)
            .attr('text-anchor', 'middle')
            .attr('opacity', 0)
        })
      d3.select(`#${this.localId}`)
        .on('mouseover', () =>
          d3
            .selectAll(`.stack_text`)
            .transition()
            .duration(100)
            .attr('opacity', 1)
        )
        .on('mouseout', () =>
          d3
            .selectAll(`.stack_text`)
            .transition()
            .duration(100)
            .attr('opacity', 0)
        )
    }
  }
}
