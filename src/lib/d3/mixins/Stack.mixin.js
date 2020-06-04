import * as d3 from 'd3'

export default {
  data: () => ({
    dataItems: {},
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
      this.drawCircles()
    },
    setScale() {
      this.dataItems = JSON.parse(JSON.stringify(this.DataItems)).dates
      // ! FIX : modify to date type
      this.extentTime = d3.extent(this.dataItems, d => new Date(d.time))

      this.scaleTime = d3
        .scaleTime()
        .domain(this.extentTime)
        .range([0, this.Canvas.CanvasWidth - this.Chart.ChartHPadding])

      this.scaleVBand = d3
        .scaleBand()
        .domain(d3.range(10))
        .range([0, this.Canvas.CanvasHeight - this.Chart.ChartVPadding])
        .round(true)
        .paddingInner(0.5)
        .paddingOuter(0.1)
    },
    drawAxis() {
      let xAxis = d3
        .axisBottom()
        .scale(this.scaleTime)
        .tickFormat(d => `${d3.timeFormat('%d')(d)}`)
        .ticks(7)
        .tickSize(0)
        .tickPadding(10)

      this.chartArea
        .append('g')
        .attr('class', 'xAxis')
        .attr('transform', `translate(0, ${this.Canvas.CanvasHeight - this.Chart.ChartVPadding})`)
        .call(xAxis)
    },
    drawCircles() {
      this.timeGroup = this.chartArea
        .append('g')
        .attr('class', `chart_group`)
        .selectAll('g')
        .data(this.dataItems)
        .enter()

      this.timeGroup
        .append('g')
        .attr('class', (d, i) => `date_${i}`)
        .attr('transform', d => {
          // ! FIX : modify to date type
          return `translate(${this.scaleTime(new Date(d.time)) +
            Math.floor(this.scaleVBand.bandwidth() / 2)}, ${-this.scaleVBand.bandwidth() - 5})`
        })
        .each((d, i, j) => {
          let _self = d3.select(j[i])

          _self
            .selectAll('rect')
            .data(Array.from({ length: d.smell }, () => null))
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', (d, i) => {
              return this.Canvas.CanvasHeight - this.Chart.ChartVPadding - (2 + 4) * i
            })
            .attr('width', this.scaleVBand.bandwidth())
            .attr('height', 2)
            .attr('fill', '#ffffff')
        })
    }
  }
}
