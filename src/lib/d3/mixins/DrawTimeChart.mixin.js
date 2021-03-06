import * as d3 from 'd3'

export default {
  data: () => ({
    dataItems: [],
    rearrangedArr: [],
    extentTime: [],
    scaleTime: () => {}
  }),
  methods: {
    drawTimeChart() {
      this.rearrangeData()
      this.setScale()
      this.drawAxis()
      if (this.DataItems === 0) return
      this.drawChart()
    },
    drawAxis() {
      let xAxis = d3
        .axisBottom()
        .scale(this.scaleTime)
        .tickFormat(d => {
          return `${d}시`
        })
        .ticks(12)
        .tickSize(0)
        .tickPadding(10)

      this.chartArea
        .append('g')
        .attr('class', 'xAxis')
        .attr(
          'transform',
          `translate(${this.Chart.ChartHPadding / 2}, ${this.Canvas.CanvasHeight - this.Chart.ChartVPadding / 2})`
        )
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'middle')
    },
    drawChart() {
      // this.chartArea
      //   .append('rect')
      //   .attr('x', 0)
      //   .attr('y', 25)
      //   .attr('width', this.Canvas.CanvasWidth - this.Chart.ChartHPadding)
      //   .attr('height', 10)
      //   .attr('transform', () => `translate(${this.Chart.ChartHPadding / 2},${0})`)
      //   .attr('fill', this.Circle.CircleBackgroundColor)

      let timeGroup = this.chartArea
        .append('g')
        .attr('class', `chart_group`)
        .attr(
          'transform',
          () => `translate(${this.Chart.ChartHPadding / 2},${this.Canvas.CanvasHeight - this.Chart.ChartVPadding / 2})`
        )
        .selectAll('g')
        .data(this.dataItems)
        .enter()

      let circleG = timeGroup.append('g').attr('class', (d, i) => `circle_group_${i}`)

      if (this.Circle.CircleFillType !== 'Fill') this.setRadialGradient(circleG, this.Circle.CircleColorTypeGradient)

      // circleG
      // .append('text')
      // .attr('class', (d, i) => `text_unit_${i}`)
      // .attr('x', d => this.scaleTime(d.time))
      // .attr('y', -10)
      // .text(d => d.time)
      // .attr('fill', this.Circle.CircleBorderColor)
      // .attr('text-anchor', 'middle')

      circleG
        .append('circle')
        .attr('class', (d, i) => `circle_unit_${i}`)
        .attr('cx', d => this.scaleTime(d.time))
        .attr('cy', 0)
        .attr('r', this.Circle.CircleRadius)
        .attr('fill', (d, i) =>
          this.Circle.CircleFillType !== 'Fill' ? `url(#gradient_radial_${i})` : this.Circle.CircleFillColor
        )
        .attr('stroke-width', 1)
        .attr('stroke', this.Circle.CircleBorderColor)
      // .on('mouseover', (_, i, a) => {
      //   d3.select(a[i]).style('cursor', 'pointer')
      // })
      // .on('mouseout', (_, i, a) => {
      //   d3.select(a[i]).style('cursor', 'default')
      // })
    },
    rearrangeData() {
      let copiedData = JSON.parse(JSON.stringify(this.DataItems))
      this.dataItems = copiedData.forEach(d => {
        Object.assign(d, { ['time']: new Date(d.date).getHours() })
      })
      this.dataItems = copiedData
    },
    setScale() {
      this.scaleTime = d3
        .scaleLinear()
        .domain([0, 24])
        .range([0, this.Canvas.CanvasWidth - this.Chart.ChartHPadding])
    }
  }
}
