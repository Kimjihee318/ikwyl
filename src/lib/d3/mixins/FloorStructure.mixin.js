import * as d3 from 'd3'

export default {
  data: () => ({
    // [ SELECTION ]
    bgBoxSelection: null,
    boxSelection: null,
    bgBoxGroup: null,
    boxGroup: null,
    emptyUnitNo: 2, // FIX
    // GRID
    grid: {
      h: 7, // FIX
      v: 2 // FIX
    },
    maxUnitNo: 14, // FIX
    // SCALE
    scaleHBand: null,
    scaleVBand: null
    // UNIT INFO
  }),
  methods: {
    drawFloor() {
      this.setScale()
      this.drawBgBox()
      this.drawBgUnit()
      this.drawBoxGroup()
      this.drawUnit()
    },
    drawBgBox() {
      let backItems = JSON.parse(JSON.stringify(this.BackgroundItem)).map(d => ({
        unit: Number(d.unit)
      }))

      this.bgBoxGroup = this.chartArea
        .append('g')
        .attr('class', 'bgGroup')
        .selectAll('g')
        .data(backItems)
        .enter()

      this.bgBoxSelection = this.bgBoxGroup
        .append('g')
        .attr('class', (d, i) => `bg_box_${this.maxUnitNo - i - this.emptyUnitNo}`)
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
    drawBgUnit() {
      this.bgBoxSelection.each((d, i, j) => {
        let _self = d3.select(j[i])
        _self
          .append('rect')
          .attr('x', 10)
          .attr('y', 10)
          .attr('width', this.Unit.UnitWidth)
          .attr('height', this.Unit.UnitHeight)
          .attr('fill', this.Unit.BgFillColor)
          .attr('stroke', () => (d.unit === this.UserInfo.unit ? '#ffffff' : this.Unit.BgStrokeColor))
          .attr('stroke-width', this.Unit.UnitStrokeWidth)

        _self
          .selectAll('line')
          .data([
            { x1: 0, y1: 0, x2: this.Unit.UnitWidth, y2: this.Unit.UnitHeight },
            { x1: 0, y1: this.Unit.UnitHeight, x2: this.Unit.UnitWidth, y2: 0 }
          ])
          .enter()
          .append('line')
          .attr('transform', `translate(${10},${10})`)
          .attr('x1', _d => _d.x1)
          .attr('y1', _d => _d.y1)
          .attr('x2', _d => _d.x2)
          .attr('y2', _d => _d.y2)
          .style('stroke-width', this.Unit.UnitStrokeWidth)
          .style('stroke', this.Unit.BgStrokeColor)
          .style('opacity', '0.6')

        _self
          .append('text')
          .attr('x', 10)
          .attr('y', 0)
          .style('font-size', this.Unit.UnitTextSize)
          .style('fill', () => (d.unit === this.UserInfo.unit ? '#ffffff' : this.Unit.UnitTextColor))
          .text(`${d.unit}호`)
      })
    },
    drawBoxGroup() {
      let dataItems = JSON.parse(JSON.stringify(this.DataItems))

      this.boxGroup = this.chartArea
        .append('g')
        .attr('class', 'boxGroup')
        .selectAll('g')
        .data(dataItems)
        .enter()

      this.boxSelection = this.boxGroup
        .append('g')
        .attr('class', (d, i) => `box_${this.maxUnitNo - i - this.emptyUnitNo}`)
        .attr('transform', d => {
          let unitNoArr = d.unit
            .toString()
            .split('')
            .splice(-2)

          let unitNo =
            Number(
              unitNoArr.reduce((c, v) => {
                c = c + v
                return c
              })
            ) - 1 // start no is 0
          let inverseNo = this.maxUnitNo - unitNo
          let rowNo = Math.floor((inverseNo - this.emptyUnitNo - 1) / this.grid.h)
          return `translate(${this.scaleHBand(
            (rowNo === 1
              ? unitNo + this.emptyUnitNo
              : // * FIX Used Magic No.
                inverseNo + this.emptyUnitNo + 2) % this.grid.h
          )}, 
          ${this.scaleVBand(rowNo)})`
        })

      dataItems.forEach((d, i) => {
        this.setLinearGradient(this.boxSelection, this.Rect.RectColorTypeGradient, 0, this.Rect.RectFillType, i, [
          0,
          10
        ])
      })

      // if (!this.isUserFloor) return
      // this.chartArea
      //   .append('g')
      //   .attr('class', 'label')
      //   .attr('transform', 'translate(-2, -3)')
      //   .append('path')
      //   .attr('d', 'M19 3H5v18l7-3 7 3V3z')
      //   .attr('fill', '#ffbd71')
    },
    drawUnit() {
      this.boxSelection.each((d, i, j) => {
        let _self = d3.select(j[i])

        _self
          .append('rect')
          .attr('x', 10)
          .attr('y', 10)
          .attr('width', this.Unit.UnitWidth)
          .attr('height', this.Unit.UnitHeight)
          .attr('fill', _d => (_d.user === this.UserInfo.user ? this.Unit.UnitFillPointColor : this.Unit.UnitFillColor))
          .attr('stroke', _d => {
            return _d.user === this.UserInfo.user ? '#ffffff' : this.Unit.UnitStroke
          })
          .attr('stroke-width', _d => (_d.user === this.UserInfo.user ? 1 : this.Unit.UnitStrokeWidth))

        _self
          .append('g')
          .style('fill', (d, i) => `url(#gradient_linear_${i})`)
          .attr('class', 'floor_group_rect_shs_quantity')
          .selectAll('rect')
          .data(Array.from({ length: d.quantity }, () => null))
          .enter()
          .append('rect')
          .attr('x', (_d, _i) => 10 + _i * 5)
          .attr('y', this.Unit.UnitWidth + 20)
          .attr('width', this.Unit.UnitSmellRectWidth)
          .attr('height', this.Unit.UnitSmellRectHeight)
      })
    },
    setScale() {
      this.scaleHBand = d3
        .scaleBand()
        .domain(d3.range(this.grid.h))
        .range([0, this.Canvas.CanvasWidth])
        .round(true)
        .paddingInner(0.1)
        .paddingOuter(0.2)

      this.scaleVBand = d3
        .scaleBand()
        .domain(d3.range(this.grid.v))
        .range([0, this.Canvas.CanvasHeight])
        .round(true)
        .paddingInner(0.5)
        .paddingOuter(0.3)
    }
  }
}
