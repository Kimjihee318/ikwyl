export default {
  methods: {
    setClipPath(selection, width, height, vScale) {
      selection
        .append('clipPath')
        .attr('id', 'clip-above')
        .append('rect')
        .attr('width', width)
        .attr('height', vScale(55))

      selection
        .append('clipPath')
        .attr('id', 'clip-below')
        .append('rect')
        .attr('y', vScale(55))
        .attr('width', width)
        .attr('height', height - vScale(55))
    },
    setLinearGradient(selection, color) {
      let gradientLinear = selection
        .append('g')
        .append('defs')
        .append('linearGradient')
        .attr('gradientTransform', 'rotate(90)')
        .attr('id', `gradient_linear`)

      gradientLinear
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', color[0])
        .attr('stop-opacity', 1)

      gradientLinear
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', color[1])
        .attr('stop-opacity', 0)
    },

    setLinearGradient4AllChart(selection, color) {
      let gradientLinear = selection
        .append('g')
        .append('defs')
        .append('linearGradient')
        .attr('gradientTransform', 'rotate(90)')
        .attr('id', `gradient_linear`)
        .attr('gradientUnits', 'userSpaceOnUse')

      gradientLinear
        .append('stop')
        .attr('offset', '20%')
        .attr('stop-color', color[0])
        .attr('stop-opacity', 1)

      gradientLinear
        .append('stop')
        .attr('offset', '40%')
        .attr('stop-color', color[1])
        .attr('stop-opacity', 0)
    },

    setRadialGradient(selction, color) {
      let gradientRadial = selction
        .append('g')
        .append('defs')
        .append('radialGradient')
        .attr('id', (d, i) => `gradient_radial_${i ? i : 0}`)
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%')

      gradientRadial
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', color[0])
        .attr('stop-opacity', 1)

      gradientRadial
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', color[1])
        .attr('stop-opacity', 0)
    }
  }
}
