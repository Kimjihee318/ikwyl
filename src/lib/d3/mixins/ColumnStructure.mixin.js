import * as d3 from 'd3'

export default {
  data: () => ({
    dataItems: {},
    filteredData: [],
    // GRID
    grid: {
      h: 3, // FIX
      v: 3 // FIX
    },
    scaleHBand: () => {},
    scaleVBand: () => {}
  }),
  methods: {
    drawColumnPlan() {
      this.filterData()
      this.setScale()
      this.drawCols()
    },
    // TODO find correct func name
    filterData() {
      this.dataItems = JSON.parse(JSON.stringify(this.DataItems))
      this.dataItems.forEach(d => {
        if (d.floor === this.FloorInfo.Userfloor) {
          // *                                                              unitNo index | before Index | nums to get
          let filteredArrIndex = Array.from({ length: 3 }, (_d, _i) => this.FloorInfo.UserUnitNo - 1 - 1 + _i)
          filteredArrIndex.forEach((_d, _i) => {
            let filteredItem = d.units[_d]
            if (filteredItem) filteredItem.coordinate = [_i, 1]
            return this.filteredData.push(filteredItem)
          })
        } else {
          let filteredItem = d.units[this.FloorInfo.UserUnitNo - 1]
          let floorIndex = d.floor - this.FloorInfo.Userfloor > 0 ? 0 : 2
          if (filteredItem) filteredItem.coordinate = [1, floorIndex]
          this.filteredData.push(filteredItem)
        }
      })

      this.filteredData = this.filteredData.filter(d => !!d)
    },
    setScale() {
      this.scaleHBand = d3
        .scaleBand()
        .domain(d3.range(this.grid.h))
        .range([0, this.Canvas.CanvasWidth])
        .round(true)
        .paddingInner(0.1)
        .paddingOuter(0)

      this.scaleVBand = d3
        .scaleBand()
        .domain(d3.range(this.grid.v))
        .range([0, this.Canvas.CanvasHeight])
        .round(true)
        .paddingInner(0.1)
        .paddingOuter(0)
    },
    drawCols() {
      let boxGroup = this.chartArea
        .selectAll('g')
        .data(this.filteredData)
        .enter()

      boxGroup
        .append('g')
        .attr('class', (d, i) => `box_${i}`)
        .attr('transform', d => {
          return `translate(${this.scaleHBand(d.coordinate[0])}, ${this.scaleVBand(d.coordinate[1])})`
        })
        .append('rect')
        .attr('width', this.scaleHBand.bandwidth())
        .attr('height', this.scaleVBand.bandwidth())
        .attr(
          'fill',
          this.FloorInfo.Userfloor === this.DataItems.floor ? this.Unit.UnitFillPointColor : this.Unit.UnitFillColor
        )
        .attr('stroke', d => (d.userName === this.User ? '#ffffff' : this.Unit.UnitStroke))
        .attr('stroke-width', d => (d.userName === this.User ? 2 : this.Unit.UnitStrokeWidth))
    }
  }
}
