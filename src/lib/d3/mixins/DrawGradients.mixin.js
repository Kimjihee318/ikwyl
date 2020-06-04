export default {
  methods: {
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
