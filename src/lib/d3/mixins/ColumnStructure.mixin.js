import * as d3 from 'd3'

export default {
  data: () => ({
    bgStructureData: [],
    dataItems: {},
    formattedSurroundingData: [],
    // GRID
    grid: {
      h: 3, // FIX
      v: null // FIX
    },
    grid4Bar: {
      all: 5,
      less: 4
    },
    scaleBarBand: () => {},
    scaleHBand: () => {},
    scaleVBand: () => {}
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
      this.emitData()
      this.drawChart()
      this.drawBars()
    },
    drawBars() {
      this.setLinearGradient(this.secondChartArea, this.Rect.RectColorTypeGradient, 0, this.Rect.RectFillType, null, [
        100,
        100
      ])

      let boxGroup = this.secondChartArea
        .append('g')
        .attr('class', 'surrounding_data_bar')
        .style('fill', 'url(#gradient_linear)')
        .selectAll('g')
        .data(this.formattedSurroundingData)
        .enter()

      let boxs = boxGroup
        .append('g')
        .attr('class', (d, i) => `surrounding_g_bar_${i}`)

        .attr('transform', d => {
          return `translate(${120}, ${this.scaleBarBand(d.barPosition)})`
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
      // .attr('fill', this.Unit.UnitSmellRectColor)
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
        .attr('fill', d => (d.unit === this.UserInfo.unit ? this.Unit.UnitTextColor : this.Unit.UnitStroke))
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
        .attr('fill', d => (d.unit === this.UserInfo.unit ? this.Unit.UnitTextColor : this.Unit.UnitStroke))
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
    formatData() {
      this.dataItems = JSON.parse(JSON.stringify(this.DataItems[0]))
      let filteredDatas = []
      for (let key in this.dataItems) {
        this.dataItems[key].forEach(d => {
          // ! FIX 3개라고 가정하고 만듦 2수정
          let vPosition = this.grid.v === 3 ? 1 : 0 // 미완성
          switch (d.unit) {
            case this.UserInfo.unit - 1:
              d.coordinate = [0, vPosition]
              d.barPosition = [0]
              filteredDatas.push(d)
              break
            case this.UserInfo.unit:
              d.coordinate = [1, vPosition]
              d.barPosition = [2]
              filteredDatas.push(d)
              break
            case this.UserInfo.unit + 1:
              d.coordinate = [2, vPosition]
              d.barPosition = [3]
              filteredDatas.push(d)
              break
            case this.UserInfo.unit + 100:
              d.coordinate = [1, vPosition - 1]
              d.barPosition = [0]
              filteredDatas.push(d)
              break
            case this.UserInfo.unit - 100:
              d.coordinate = [1, vPosition + 1]
              d.barPosition = [4]
              filteredDatas.push(d)
              break
          }
        })
      }
      this.formattedSurroundingData = filteredDatas
    },
    init() {
      this.bgStructureData = []
    },
    setBgDataItems() {
      let userFloor = this.UserInfo.floor
      if (userFloor === this.UserInfo.maxfloor || userFloor === 1) {
        this.grid.v = 2
      } else {
        this.grid.v = 3
      }

      let hLayoutArr = Array.from({ length: this.grid.h }, () => null)
      let vLayoutArr = Array.from({ length: this.grid.v }, () => null)
      let stUnit = this.UserInfo.unit
      let hUnits = [stUnit - 1, stUnit, stUnit + 1] // ! FIX HERE 3칸으로 고정하고 진행, 2칸 부분 추가
      let vUnits =
        this.grid.v === 3
          ? [stUnit + 100, stUnit, stUnit - 100]
          : [userFloor === 1 ? stUnit + 100 : null, stUnit, userFloor === this.UserInfo.maxfloor ? stUnit - 100 : null]

      // return truthy
      vUnits = vUnits.filter(d => d)
      hLayoutArr.forEach((d, i) => {
        this.bgStructureData.push({
          unit: hUnits[i],
          isUserUnit: hUnits[i] === stUnit,
          coordinate: [i, this.grid.v === 3 ? 1 : 0],
          barPosition: i + 1,
          filterValue: true
        })
      })
      vLayoutArr.forEach((d, i) => {
        this.bgStructureData.push({
          unit: vUnits[i],
          isUserUnit: hUnits[i] === stUnit,
          coordinate: [1, i],
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
