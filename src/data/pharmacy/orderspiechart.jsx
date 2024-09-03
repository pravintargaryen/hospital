import { useRef, useEffect } from "react";
import * as d3 from "d3";

// Sample data: Replace with your actual orders data
const ordersByCategory = [
  { category: "Medicines", orders: 300 },
  { category: "Supplements", orders: 150 },
  { category: "Personal Care", orders: 100 },
  { category: "Others", orders: 50 },
  // Add more data here
];

const width = 400;
const height = 400;
const radius = Math.min(width, height) / 2;

const OrdersPieChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3
      .pie()
      .value((d) => d.orders)
      .sort(null);

    const arc = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const labelArc = d3
      .arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const data = pie(ordersByCategory);

    svg
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.category))
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip
          .style("opacity", 1)
          .html(`Category: ${d.data.category}<br/>Orders: ${d.data.orders}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
      });

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .text((d) => d.data.category);

    // Optional: Add a legend
    const legend = svg
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d, i) => `translate(-${width / 2 + 20},${-height / 2 + i * 20})`
      );

    legend
      .append("rect")
      .attr("x", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d) => color(d.data.category));

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text((d) => d.data.category);
  }, []);

  return (
    <div>
      <h2>Orders Distribution by Category</h2>
      <svg ref={svgRef}></svg>
      <div
        id="tooltip"
        style={{
          position: "absolute",
          background: "#fff",
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "4px",
          pointerEvents: "none",
          opacity: 0,
        }}
      ></div>
    </div>
  );
};

export default OrdersPieChart;
