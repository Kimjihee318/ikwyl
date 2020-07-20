import * as d3 from 'd3'
import __F from '@/primitives/_function_'

export default {
  data: () => ({
    circleGroup: null, // * Selection
    dataItems: [],
    extentTime: [],
    monthMap: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    scaleVBand: () => {},
    scaleTime: () => {},
    timeGroup: null // * Selection
  }),
  methods: {
    drawCircle() {
      this.setScale()
      this.drawAxis()
      if (this.dataItems.length === 0) return

      this.drawCircles()
    },
    setScale() {
      this.dataItems = JSON.parse(JSON.stringify(this.DataItems))
      this.extentTime = __F.getWeekDates(this.SelectedDate)

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

      this.chartArea
        .append('g')
        .attr('class', 'stack_header')
        .attr('transform', `translate(${this.Chart.ChartHPadding / 2 + 10}, ${17})`)
        .append('text')
        .text(`${this.monthMap[this.SelectedDate.getMonth()]}`)
        .attr('fill', '#c0ddff')
        .style('text-anchor', 'middle')
    },
    drawCircles() {
      this.setLinearGradient(
        this.chartArea,
        this.Rect.RectColorTypeGradient,
        90,
        this.Rect.RectFillType,
        null,
        [0, 50],
        'circle'
      )

      this.timeGroup = this.chartArea
        .append('g')
        .attr('class', `stack_chart_group`)
        .style('fill', 'url(#circle_gradient_linear)')
        .selectAll('g')
        .data(this.dataItems)
        .enter()

      this.timeGroup
        .append('g')
        .append('text')
        .attr('class', (d, i) => `stack_text stack_text_${i}`)
        .attr('transform', d => {
          return `translate(${this.scaleTime(new Date(d.date)) +
            this.Chart.ChartHPadding / 2}, ${-this.scaleVBand.bandwidth() + 6})`
        })
        .attr('x', 8 + 6)
        .attr('y', d => {
          return this.Canvas.CanvasHeight - this.Chart.ChartVPadding - 3 * d.quantity
        })
        .text(d => d.quantity)
        .attr('fill', this.Rect.RectTextColor)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'center')
        .attr('opacity', 0)

      this.timeGroup
        .append('g')
        .attr('class', (d, i) => `stack_date_group stack_date_${i}`)
        .attr('transform', d => {
          return `translate(${this.scaleTime(new Date(d.date)) +
            this.Chart.ChartHPadding / 2}, ${-this.scaleVBand.bandwidth()})`
        })
        .append('circle')
        .attr('cx', 0)
        .attr('cy', d => {
          return this.Canvas.CanvasHeight - this.Chart.ChartVPadding - 3 * d.quantity
        })
        .attr('r', 3)
        .attr('stroke', this.Rect.RectTextColor)
        .attr('fill', this.Rect.RectTextColor)
        .attr('opacity', 0.7)
        .on('mouseover', (d, i) =>
          d3
            .select(`.stack_text_${i}`)
            .transition()
            .duration(100)
            .attr('opacity', 1)
        )
        .on('mouseout', (d, i) =>
          d3
            .select(`.stack_text_${i}`)
            .transition()
            .duration(100)
            .attr('opacity', 0)
        )
    }
  }
}
