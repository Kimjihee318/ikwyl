import * as d3 from 'd3'

export default {
  data: () => ({
    dataItems: {},
    rearrangedArr: [],
    extentTime: [],
    scaleTime: () => {}
  }),
  methods: {
    drawTimeChart() {
      this.rearrangeData()
      this.setScale()
      this.drawChart()
    },
    rearrangeData() {
      this.dataItems = JSON.parse(JSON.stringify(this.DataItems))
      this.dataItems.forEach((d, i) => {
        let today = new Date()
        let createdDates = new Date(
          new Date(today.setDate(today.getDate() - (this.dataItems.length - i))).setHours(
            Math.floor(Math.random() * 23)
          )
        )
        d.date = createdDates
        d.units.forEach(d => {
          d.time = createdDates.getHours()
        })
      })
    },
    setScale() {
      this.scaleTime = d3
        .scaleTime()
        .domain([0, 23])
        .range([0, this.Canvas.CanvasWidth - this.Chart.ChartHPadding])
    },
    drawChart() {
      let timeGroup = this.chartArea
        .append('g')
        .attr('class', `chart_group`)
        .attr('transform', () => `translate(${0},${30})`)
        .selectAll('g')
        .data(this.dataItems)
        .enter()

      timeGroup
        .append('rect')
        .attr('x', 0)
        .attr('y', -10)
        .attr('width', this.Canvas.CanvasWidth - this.Chart.ChartHPadding)
        .attr('height', 10)
        .attr('fill', this.Circle.CircleBackgroundColor)

      let circleG = timeGroup.append('g').attr('class', (d, i) => `circle_group_${i}`)

      if (this.Circle.CircleFillType !== 'Fill') this.setRadialGradient(circleG, this.Circle.CircleColorTypeGradient)

      circleG
        .append('text')
        .attr('class', (d, i) => `text_unit_${i}`)
        .attr('x', d => this.scaleTime(new Date(d.units[0].time)))
        .attr('y', -10)
        .text(d => d.units[0].time)
        .attr('fill', this.Circle.CircleBorderColor)

      circleG
        .append('circle')
        .attr('class', (d, i) => `circle_unit_${i}`)
        .attr('cx', d => this.scaleTime(new Date(d.units[0].time)))
        .attr('cy', 0)
        .attr('r', 1)
        .attr('fill', (d, i) =>
          this.Circle.CircleFillType !== 'Fill' ? `url(#gradient_radial_${i})` : this.Circle.CircleFillColor
        )
        .attr('stroke-width', 1)
        .attr('stroke', this.Circle.CircleBorderColor)
        .on('mouseover', (_, i, a) => {
          d3.select(a[i]).style('cursor', 'pointer')
        })
        .on('mouseout', (_, i, a) => {
          d3.select(a[i]).style('cursor', 'default')
        })
    }
  }
}
