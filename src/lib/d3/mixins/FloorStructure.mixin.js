import * as d3 from 'd3'

export default {
  data: () => ({
    // SELECTION
    chartBoxGroup: null,
    unitSelection: null,
    // GRID
    grid: {
      h: 7, // FIX
      v: 2 // FIX
    },
    maxUnitNo: 14, // FIX
    emptyUnitNo: 2, // FIX
    // SCALE
    scaleHBand: null,
    scaleVBand: null
    // UNIT INFO
  }),
  methods: {
    drawFloor() {
      this.setScale()
      this.drawBoxGroup()
      this.drawUnit()
    },
    drawBoxGroup() {
      let dataItems = JSON.parse(JSON.stringify(this.DataItems.units))

      this.chartBoxGroup = this.chartArea
        .selectAll('g')
        .data(dataItems)
        .enter()

      this.unitSelection = this.chartBoxGroup
        .append('g')
        .attr('class', (d, i) => `unit_box_${this.maxUnitNo - i - this.emptyUnitNo}`)
        .attr('transform', (d, i) => {
          let inverseNo = this.maxUnitNo - i
          let rowNo = Math.floor((inverseNo - this.emptyUnitNo - 1) / this.grid.h)
          return `translate(${this.scaleHBand(
            (rowNo === 1
              ? i + this.emptyUnitNo
              : // * FIX Used Magic No.
                inverseNo + this.emptyUnitNo + 2) % this.grid.h
          )}, 
          ${this.scaleVBand(rowNo)})`
        })
    },
    drawUnit() {
      this.unitSelection.each((d, i, j) => {
        let _self = d3.select(j[i])

        _self
          .append('rect')
          .attr('x', 10)
          .attr('y', 20)
          .attr('width', this.Unit.UnitWidth)
          .attr('height', this.Unit.UnitHeight)
          .attr(
            'fill',
            this.FloorInfo.Userfloor === this.DataItems.floor ? this.Unit.UnitFillPointColor : this.Unit.UnitFillColor
          )
          .attr('stroke', d => (d.userName === this.User ? '#ffffff' : this.Unit.UnitStroke))
          .attr('stroke-width', d => (d.userName === this.User ? 2 : this.Unit.UnitStrokeWidth))

        _self
          .append('text')
          .attr('x', 10)
          .attr('y', 10)
          .style('font-size', this.Unit.UnitTextSize)
          .style('fill', this.Unit.UnitTextColor)
          .text(`${d.unitNo}호`)

        _self
          .append('g')
          .attr('class', 'group_smell')
          .selectAll('rect')
          .data(Array.from({ length: d.smell }, () => null))
          .enter()
          .append('rect')
          .attr('x', (d, i) => 10 + i * 4)
          .attr('y', 30 + this.Unit.UnitWidth)
          .attr('width', this.Unit.UnitSmellRectWidth)
          .attr('height', this.Unit.UnitSmellRectHeight)
          .attr('fill', this.Unit.UnitSmellRectColor)
      })
    },
    setScale() {
      this.scaleHBand = d3
        .scaleBand()
        .domain(d3.range(this.grid.h))
        .range([0, this.Canvas.CanvasWidth])
        .round(true)
        .paddingInner(0.1)
        .paddingOuter(0.1)

      this.scaleVBand = d3
        .scaleBand()
        .domain(d3.range(this.grid.v))
        .range([0, this.Canvas.CanvasHeight])
        .round(true)
        .paddingInner(0.4)
        .paddingOuter(0.1)
    }
  }
}
