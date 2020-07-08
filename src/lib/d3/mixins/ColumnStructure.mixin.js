import * as d3 from 'd3'
import __F from '@/primitives/_function_'
export default {
  data: () => ({
    bgStructureData: [],
    dataItems: {},
    formattedSurroundingData: [],
    formattedBarData: [],
    // GRID
    grid: {
      h: null, // FIX
      v: null // FIX
    },
    grid4Bar: {
      all: 5,
      less: 4
    },
    scaleBarBand: () => {},
    scaleHBand: () => {},
    scaleVBand: () => {},
    stUnitNo: ''
  }),
  methods: {
    drawColumnPlan() {
      this.init()
      this.setBgDataItems()
      this.setScale()
      this.drawBgItems()
      this.drawBarTitle()

      if (!this.DataItems || this.DataItems.length === 0) return
      this.formatData()
      this.formatBarData()
      this.emitData()
      this.drawChart()
      this.drawBars()
    },
    drawBars() {
      this.setLinearGradient(
        this.secondChartArea,
        this.Rect.RectColorTypeGradient,
        -180,
        this.Rect.RectFillType,
        null,
        [90, 100]
      )

      let boxGroup = this.secondChartArea
        .append('g')
        .attr('class', 'surrounding_data_bar')
        .selectAll('g')
        .data(this.formattedBarData)
        .enter()

      let boxs = boxGroup
        .append('g')
        // .style('fill', 'url(#gradient_linear)')
        .attr('class', (d, i) => {
          return `surrounding_g_bar_${i}`
        })
        .attr('transform', d => {
          return `translate(${150}, ${this.scaleBarBand(d.barPosition)})`
        })

      boxs
        .append('g')
        .attr('class', `srrounding_group_rect_shs_quantity`)
        .selectAll('rect')
        .data(d => Array.from({ length: d.quantity }, () => null))
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 5)
        .attr('y', 0.5)
        .attr('width', this.Unit.UnitSmellRectWidth)
        .attr('height', this.Unit.UnitSmellRectHeight)
        .attr('fill', this.Rect.RectFillColor)
    },
    drawBarTitle() {
      let boxGroup = this.secondChartArea
        .selectAll('g')
        .data(this.bgStructureData)
        .enter()

      let boxs = boxGroup
        .append('g')
        .attr('class', (d, i) => `surrounding_bg_bar_${i}`)
        .attr('transform', d => {
          return `translate(${80}, ${this.scaleBarBand(d.barPosition)})`
        })

      boxs
        .append('text')
        .attr('x', this.scaleVBand.bandwidth() / 2)
        .attr('y', -2)
        .attr('fill', d => (d.unit === this.UserInfo.unit ? this.Unit.UnitTextPointColor : this.Unit.UnitTextColor))
        .style('font-size', this.Unit.UnitTextSize)
        .style('text-anchor', 'end')
        .style('alignment-baseline', 'hanging')
        .text(d => `${d.unit}호`)
    },
    drawBgItems() {
      let boxGroup = this.chartArea
        .selectAll('g')
        .data(this.bgStructureData)
        .enter()

      let boxs = boxGroup
        .append('g')
        .attr('class', (d, i) => `surrounding_bg_box_${i}`)
        .attr('transform', d => {
          return `translate(${this.scaleHBand(d.coordinate[0])}, ${this.scaleVBand(d.coordinate[1])})`
        })

      boxs
        .append('rect')
        .attr('width', this.scaleHBand.bandwidth())
        .attr('height', this.scaleVBand.bandwidth())
        .attr('fill', this.Unit.BgFillColor)
        .attr('stroke', d => (d.unit === this.UserInfo.unit ? '#ffffff' : this.Unit.BgStrokeColor))
        .attr('stroke-width', this.Unit.UnitStrokeWidth)

      boxs
        .selectAll('line')
        .data([
          { x1: 0, y1: 0, x2: this.scaleHBand.bandwidth(), y2: this.scaleVBand.bandwidth() },
          { x1: 0, y1: this.scaleVBand.bandwidth(), x2: this.scaleHBand.bandwidth(), y2: 0 }
        ])
        .enter()
        .append('line')
        .attr('x1', d => d.x1)
        .attr('y1', d => d.y1)
        .attr('x2', d => d.x2)
        .attr('y2', d => d.y2)
        .style('stroke-width', this.Unit.UnitStrokeWidth)
        .style('stroke', this.Unit.BgStrokeColor)
        .style('opacity', '0.6')

      boxs
        .append('text')
        .attr('x', this.scaleVBand.bandwidth() / 2)
        .attr('y', -8)
        .attr('fill', d => (d.unit === this.UserInfo.unit ? this.Unit.UnitTextPointColor : this.Unit.UnitTextColor))
        .style('font-size', this.Unit.UnitTextSize)
        .style('text-anchor', 'middle')
        .text(d => `${d.unit}호`)
    },
    drawChart() {
      let boxGroup = this.chartArea
        .append('g')
        .attr('class', 'surrounding_data_box')
        .selectAll('g')
        .data(this.formattedSurroundingData)
        .enter()

      let boxs = boxGroup
        .append('g')
        .attr('class', (d, i) => `surrounding_box_${i}`)
        .attr('transform', d => {
          return `translate(${this.scaleHBand(d.coordinate[0])}, ${this.scaleVBand(d.coordinate[1])})`
        })

      boxs
        .append('rect')
        .attr('width', this.scaleHBand.bandwidth())
        .attr('height', this.scaleVBand.bandwidth())
        .attr('fill', d => (d.unit === this.UserInfo.unit ? this.Unit.UnitFillPointColor : this.Unit.UnitFillColor))
        .attr('stroke', d => (d.unit === this.UserInfo.unit ? '#ffffff' : this.Unit.UnitStroke))
        .attr('stroke-width', d => (d.unit === this.UserInfo.unit ? 1.5 : this.Unit.UnitStrokeWidth))

      // boxs
      //   .append('g')
      //   .attr('class', `srrounding_group_rect_shs_quantity`)
      //   .selectAll('rect')
      //   .data(d => Array.from({ length: d.quantity }, () => null))
      //   .enter()
      //   .append('rect')
      //   .attr('x', (d, i) => i * 4)
      //   .attr('y', 0)
      //   .attr('width', this.Unit.UnitSmellRectWidth)
      //   .attr('height', this.Unit.UnitSmellRectHeight)
      //   .attr('fill', this.Unit.UnitSmellRectColor)

      // d3.selectAll('.srrounding_group_rect_shs_quantity').each((d, i, s) => {
      //   // let selectionDomRectWidth = s[i].getBoundingClientRect().width
      //   d3.select(s[i]).attr('transform', `translate(${0}, ${this.scaleVBand.bandwidth() + 10})`)
      // })
    },
    emitData() {
      if (this.formattedSurroundingData.length === 0) return
      let unitInHRow = []
      let unitInVRow = []
      this.formattedSurroundingData.forEach(d => {
        switch (d.unit) {
          case this.UserInfo.unit - 100:
            unitInVRow.push(d.quantity)
            break
          case this.UserInfo.unit + 100:
            unitInVRow.push(d.quantity)
            break
          case this.UserInfo.unit - 1:
            unitInHRow.push(d.quantity)
            break
          case this.UserInfo.unit + 1:
            unitInHRow.push(d.quantity)
            break
        }
      })

      this.$emit('emit', {
        hRow: unitInHRow,
        vRow: unitInVRow
      })
    },
    formatBarData() {
      let copiedData = JSON.parse(JSON.stringify(this.DataItems))
      let stUnit = this.UserInfo.unit
      let userQuantities = []
      let userBarPosition
      copiedData.forEach(d => {
        for (let key in d) {
          d[key].forEach(_d => {
            this.bgStructureData.forEach(_bd => {
              if (_bd.unit !== _d.unit) return
              if (_d.unit === stUnit) {
                userQuantities.push(_d.quantity)
                userBarPosition = _bd.barPosition
              } else {
                this.formattedBarData.push({ unit: _d.unit, barPosition: _bd.barPosition, quantity: _d.quantity })
              }
            })
          })
        }
      })
      if (userQuantities.length === 0) return
      this.formattedBarData.push({ unit: stUnit, barPosition: userBarPosition, quantity: __F.mean(userQuantities) })
    },
    formatData() {
      this.dataItems = JSON.parse(JSON.stringify(this.DataItems[0]))
      let filteredDatas = []
      for (let key in this.dataItems) {
        this.dataItems[key].forEach(d => {
          let vPosition = this.UserInfo.floor === this.UserInfo.maxfloor ? 0 : 1
          let xPosition = this.grid.h === 2 && this.stUnitNo === 1 ? 0 : 1

          switch (d.unit) {
            case this.UserInfo.unit - 1:
              d.coordinate = [xPosition, vPosition]
              filteredDatas.push(d)
              break
            case this.UserInfo.unit:
              d.coordinate = [xPosition, vPosition]
              filteredDatas.push(d)
              break
            case this.UserInfo.unit + 1:
              d.coordinate = [xPosition, vPosition]
              filteredDatas.push(d)
              break
            case this.UserInfo.unit + 100:
              d.coordinate = [xPosition, vPosition - 1]
              filteredDatas.push(d)
              break
            case this.UserInfo.unit - 100:
              d.coordinate = [xPosition, vPosition + 1]
              filteredDatas.push(d)
              break
          }
        })
      }
      this.formattedSurroundingData = filteredDatas
    },
    init() {
      this.bgStructureData = []
      this.formattedSurroundingData = []
      this.formattedBarData = []
    },
    setBgDataItems() {
      let userFloor = this.UserInfo.floor
      let stUnit = this.UserInfo.unit
      let stUnitNoArr = stUnit
        .toString()
        .split('')
        .slice(-2)

      this.stUnitNo = +stUnitNoArr.reduce((v, c) => {
        c = v + c
        return c
      }, '')

      if (this.stUnitNo === this.UserInfo.maxunitno || this.stUnitNo === 1) {
        this.grid.h = 2
      } else {
        this.grid.h = 3
      }

      if (userFloor === this.UserInfo.maxfloor || userFloor === 1) {
        this.grid.v = userFloor === this.UserInfo.maxfloor && userFloor === 1 ? 1 : 2
      } else {
        this.grid.v = 3
      }

      let hLayoutArr = Array.from({ length: this.grid.h }, () => null)
      let vLayoutArr = Array.from({ length: this.grid.v }, () => null)

      let hUnits
      if (this.stUnitNo === this.UserInfo.maxunitno) {
        hUnits = [stUnit - 1, stUnit]
      } else if (this.stUnitNo === 1) {
        hUnits = [stUnit, stUnit + 1]
      } else {
        hUnits = [stUnit - 1, stUnit, stUnit + 1]
      }
      let vUnits
      switch (this.grid.v) {
        case 3:
          vUnits = [stUnit + 100, stUnit, stUnit - 100]
          break
        case 2:
          vUnits = [
            userFloor === 1 ? stUnit + 100 : null,
            stUnit,
            userFloor === this.UserInfo.maxfloor ? stUnit - 100 : null
          ]
          break
        case 1:
          vUnits = [stUnit]
          break
      }

      // return truthy
      vUnits = vUnits.filter(d => d)
      hLayoutArr.forEach((d, i) => {
        this.bgStructureData.push({
          unit: hUnits[i],
          isUserUnit: hUnits[i] === stUnit,
          coordinate: [i, userFloor === this.UserInfo.maxfloor ? 0 : 1],
          barPosition: i + 1,
          filterValue: true
        })
      })
      vLayoutArr.forEach((d, i) => {
        let xPosition = this.grid.h === 2 && this.stUnitNo === 1 ? 0 : 1

        this.bgStructureData.push({
          unit: vUnits[i],
          isUserUnit: hUnits[i] === stUnit,
          coordinate: [xPosition, i],
          barPosition: i === 0 ? i : hLayoutArr.length + 1,
          filterValue: vUnits[i] === stUnit ? false : true
        })
      })
      this.bgStructureData = this.bgStructureData.filter(d => d.filterValue)
    },
    setScale() {
      this.scaleBarBand = this.scaleHBand = d3
        .scaleBand()
        .domain(d3.range(this.grid4Bar.all))
        .range([0, this.Canvas.CanvasWidth])
        .round(true)
        .paddingInner(this.Scale.ScaleHBandInnerPadding)
        .paddingOuter(this.Scale.ScaleHBandOuterPadding)

      this.scaleHBand = d3
        .scaleBand()
        .domain(d3.range(this.grid.h))
        .range([0, this.Canvas.CanvasWidth])
        .round(true)
        .paddingInner(this.Scale.ScaleHBandInnerPadding)
        .paddingOuter(this.Scale.ScaleHBandOuterPadding)

      this.scaleVBand = d3
        .scaleBand()
        .domain(d3.range(this.grid.v))
        .range([0, this.Canvas.CanvasHeight])
        .round(true)
        .paddingInner(this.Scale.ScaleVBandInnerPadding)
        .paddingOuter(this.Scale.ScaleVBandOuterPadding)
    }
  }
}
