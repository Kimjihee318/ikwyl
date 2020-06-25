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
        .attr('id', (d, i) => `gradient_linear_${i ? i : 0}`)

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

    setLinearGradient4AllChart() {
(async () => {
  let data = await d3.csv(dataURL);

  const getX = d => d["Title"];
  const getY = d => +d["Num Votes"]; // convert to number from string

  // filter Top 10 data, and sort by num of votes
  data = data
    .slice(0, 10)
    .sort( (a, b) => -(getY(a) - getY(b)));

  const x = d3.scaleBand()
    .rangeRound([0, width])
    .domain(data.map(getX))
    .padding(0.1);

  const y = d3.scaleLinear()
    .range([height, 0])
    .domain([
      d3.min(data, getY),
      d3.max(data, getY)
    ])
    .nice();

  const defs = svg.append('defs');

  const bgGradient = defs
    .append('linearGradient')
    .attr('id', 'bg-gradient')
    // .attr('x1', '0')
    // .attr('y1', '0')
    // .attr('x2', '0')
    // .attr('y2', '1')
    .attr('gradientTransform', 'rotate(90)');

  bgGradient
    .append('stop')
    .attr('stop-color', '#F2C66B')
    .attr('offset', '0%');
  bgGradient
    .append('stop')
    .attr('stop-color', '#D13D73')
    .attr('offset', '100%');

  defs
    .append('clipPath')
    .attr('id', 'clip-bar-rects')
    .selectAll('bar')
    .data(data)
    .enter()
    .append('rect')
    .attr("x", d => x(getX(d)))
    .attr("y", d => y(getY(d)))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(getY(d)));

  const clipPath = graphArea
    .append('g')
    .attr('clip-path', `url(#clip-bar-rects)`);

  clipPath
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'url(#bg-gradient)');

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y).ticks(5);

  const ax = graphArea
    .append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  ax.selectAll('text')
    .style("text-anchor", "start")
    .style("alignment-baseline", "middle")
    .attr("transform", `translate(${x.bandwidth() / 2}, 10) rotate(90)`)

  graphArea
    .append('g')
    .attr('class', 'axis')
    .call(yAxis);

})();
    }

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
