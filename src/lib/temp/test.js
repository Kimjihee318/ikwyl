import * as d3 from 'd3'

// ------------------------------------------------------------------------------- Global
export default {
  data: () => ({
    chartPadding: 50,
    firstGroupLength: null,
    fullLength: 19,
    legendRect: 10,
    lineMargin: 30,
    moudleMargin: 60,
    moduleGroupPadding: 20,
    size: 47,
    timeGroupWidth: []
  }),

  methods: {
    drawChart() {
      this.drawLegend()
      let chartG = this.svg
        .append('g')
        .attr('id', `${this.localId}__Chart`)
        .attr('transform', `translate(-5, ${this.Canvas.CanvasHeight - 110})`)
        .selectAll('g')
        .data(this.dataSet)
        .enter()

      chartG
        .append('g')
        .attr('class', d => `${this.localId}__Group__${d.key}`)
        .attr('transform', (d, i) => {
          let eachFullLength = 0
          let eachBeforeLength = 0
          let chartSize = this.Canvas.CanvasWidth - this.chartPadding
          Array.from({ length: i + 1 }, (d, i) => i).forEach((d_, i_) => {
            eachFullLength += this.dataSet[i_].values.length
            eachBeforeLength = eachFullLength - this.dataSet[i_].values.length
          })

          let x = i === 0 ? 0 : (chartSize / eachFullLength) * eachBeforeLength
          this.timeGroupWidth.push((chartSize / this.fullLength) * this.dataSet[i].values.length)
          return `translate(${this.chartPadding / 2 + x}, 0)`
        })
        .each((d, i, j) => {
          let timeG = d3
            .select(j[i])
            .selectAll('g')
            .data(d => d.values)
            .enter()

          // year underline
          d3.select(j[i])
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', this.timeGroupWidth[i] - this.chartPadding / 1.3)
            .attr('y2', 0)
            .attr('transform', `translate(${this.chartPadding / 1.3 - 15}, ${this.size + 21.5})`)
            .attr('stroke', '#bcbcbc')
            .attr('stroke-width', 0.5)

          // year text
          d3.select(j[i])
            .append('text')
            .text(d.key)
            .attr('transform', `translate(${(this.timeGroupWidth[i] - this.chartPadding) / 2}, ${this.size + 35})`)
            .style('font-size', 11)
            .attr('text-alignment', 'middle')

          this.drawVesselGroup(timeG, d, i)
        })
    },
    drawVesselGroup(_timeG, _data, _timeIndex) {
      let self = this

      // band scale
      let vesselBand = d3
        .scaleBand()
        .domain(d3.range(_data.values.length))
        .range([0, this.timeGroupWidth[_timeIndex]])
        .paddingInner(0.5)
        .paddingOuter(0.25)

      let vesselG = _timeG
        .append('g')
        .attr('class', d => `vessel__${d.key}`)
        .attr('transform', (d, i) => {
          let x = vesselBand(i % _data.values.length)
          return `translate(${x - 0.5}, 0.5)`
        })

      vesselG
        .append('rect')
        .attr('class', d => `background_${d.key}`)
        .attr('width', this.size)
        .attr('height', this.size)
        .attr('fill', d => self.colorScale(self.isfilterColorData(d)))
        .attr('stroke', '#bcbcbc')
        .attr('stroke-width', 0.5)

      // vessel name
      let vesselText = vesselG
        .append('text')
        .text(d => d.values[0].SHIP_NAME)
        .attr('class', `${this.localId}__shipText`)
        .style('fill', d => self.textScale(self.isfilterColorData(d)))
        .style('font-size', 11)

      vesselText
        .attr('x', (d, i, j) => (this.size - j[i].getBoundingClientRect().width) / 2)
        .attr(
          'y',
          (d, i, j) => (this.size - j[i].getBoundingClientRect().height) / 2 + j[i].getBoundingClientRect().height / 1.3
        )
        .attr('fill', d => d.bgColor)
        .attr('alignmnet-baseline', 'hanging')

      // vessel plan date
      let planDate = vesselG
        .append('text')
        .text(d => d.values[0]['SA_PLAN'])
        .style('font-size', 10)
        .attr('fill', '#757575')

      planDate
        .attr('x', 0)
        .attr('x', (d, i, j) => (this.size - j[i].getBoundingClientRect().width) / 2)
        .attr('y', this.size + 15)
        .attr('alignmnet-baseline', 'middle')

      this.drawModuleGroup(vesselG)
    },

    drawModuleGroup(vesselG) {
      let modules = vesselG
        .selectAll('g')
        .data(d => d.values)
        .enter()

      let mod = modules
        .append('g')
        .attr('class', d => d.SHIP_NAME)
        .attr('transform', (d, i) => {
          let y = i * this.moudleMargin
          return `translate(0, ${-(y + this.moduleGroupPadding)})`
        })

      mod
        .append('image')
        .attr('id', d => `${d.PAU}`)
        .attr('transform', `translate(${-this.size * 0.1},${-this.size * 1.1})`)
        .attr('width', this.size * 1.2)
        .attr('height', this.size * 1.2)
        .attr('opacity', 1)
        .attr('xlink:href', d => `${this.__HOST_NAME_RESOURCE}/TCO/PAUs/${d.PAU}.png`)
        .style('cursor', 'pointer')
        .on('mouseover', d => {
          d3.select(`#${d.PAU}`)
            .transition()
            .duration(200)
            .attr('transform', `translate(${-10},${-60}) scale(1.3)`)
            .attr('opacity', 0.2)
        })
        .on('mouseout', d => {
          d3.select(`#${d.PAU}`)
            .transition()
            .duration(200)
            .attr('transform', `translate(${-this.size * 0.1},${-this.size * 1.1})`)
            .attr('opacity', 1)
        })

        .on('click', d => {
          let request_ = {
            dataType: 'row',
            action: {
              type: 'direct', // important!
              target: 'slide-modal',
              component: 'ServiceSvgTabs',
              id: 168,
              no: 'LIBSVGTB-0001'
            },
            filters: {
              MOD: d.MOD
            },
            iFilters: {
              filterString: ``,
              inputFilter: ''
            }
          }
          this.$emit('request-action', request_)
        })

      mod
        .append('text')
        .text(d => d.PAU)
        .attr('y', 3)
        .style('font-size', 10)
        .attr('fill', '#757575')
        .attr('x', (d, i, j) => (this.size - j[i].getBoundingClientRect().width) / 2)
    },

    drawLegend() {
      let legendG = this.svg
        .append('g')
        .attr('class', `${this.localId}__LegendG`)
        .attr('transform', 'translate(' + 30 + ', ' + 30 + ')')

      // legend title text
      legendG
        .append('text')
        .text('Legends')
        .attr('x', 0.5)
        .attr('y', 20.5)
        .style('font-size', 12)
        .style('font-weight', 400)

      // gen legeng group
      let legends = legendG
        .selectAll('g')
        .data(this.legendData)
        .enter()

      let legend = legends
        .append('g')
        .attr('class', d => `${this.localId}__Legends__${d.value}`)
        .attr('transform', (d, i) => 'translate(' + 0 + ', ' + (i * 15 + 42) + ')')

      legend
        .append('rect')
        .attr('x', 7)
        .attr('y', -this.legendRect + 1)
        .attr('width', this.legendRect)
        .attr('height', this.legendRect)
        .attr('fill', d => d.bgColor)
        .attr('stroke', d => (d.value == 'none' ? '#ddd' : 'transparent'))
        .attr('stroke-width', 0.5)

      legend
        .append('text')
        .text(d => d.text)
        .attr('fill', '#333')
        .attr('x', this.legendRect + 7 + 7)
        .style('font-size', 9)
    }
  }
}
