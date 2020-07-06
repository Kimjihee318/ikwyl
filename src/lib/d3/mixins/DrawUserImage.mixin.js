export default {
  data: () => ({}),
  methods: {
    drawUserImage() {
      let randomLengthArr = Array.from({ length: Math.floor(Math.random() * 3) + 2 }, (d, i) => i)
      let colors = ['#2d519f', '#5a81ff', '#f9d057', '#f29e2e', '#ff915c']
      let funcWidth = () => Math.floor(Math.random() * this.Canvas.CanvasWidth * 0.3) + 10
      let width = funcWidth()

      this.svg
        .append('clipPath')
        .attr('id', 'circle-clip')
        .append('circle')
        .attr('cx', this.Canvas.CanvasWidth / 2)
        .attr('cy', this.Canvas.CanvasWidth / 2)
        .attr('r', this.Canvas.CanvasWidth / 2)

      // this.svg.attr('clip-path', 'url(#circle-clip)')

      let chart = this.svg
        .append('g')
        .selectAll('rect')
        .data(randomLengthArr)
        .enter()

      chart
        .append('rect')
        .attr('x', () => Math.floor(Math.random() * this.Canvas.CanvasWidth))
        .attr('y', () => Math.floor(Math.random() * this.Canvas.CanvasWidth))
        .attr('width', width)
        .attr('height', width)
        .style('mix-blend-mode', 'screen')
        .style('fill', function(d, i) {
          return colors[i % colors.length]
        })
    }
  }
}
