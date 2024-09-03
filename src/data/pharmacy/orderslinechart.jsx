import { useRef, useEffect } from "react";
import * as d3 from "d3";

// Sample data: Replace with your actual orders data
const ordersData = [
  { date: "2024-01", orders: 50 },
  { date: "2024-02", orders: 75 },
  { date: "2024-03", orders: 90 },
  { date: "2024-04", orders: 110 },
  // Add more data here
];

const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

const OrdersLineChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleTime()
      .domain(d3.extent(ordersData, (d) => new Date(d.date)))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(ordersData, (d) => d.orders)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.orders))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .data([ordersData])
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "#007bff")
      .attr("stroke-width", "2px");

    svg
      .selectAll("circle")
      .data(ordersData)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(new Date(d.date)))
      .attr("cy", (d) => y(d.orders))
      .attr("r", 6)
      .attr("fill", "#007bff")
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip
          .style("opacity", 1)
          .html(`Date: ${d.date}<br/>Orders: ${d.orders}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
      });

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(d3.timeMonth.every(1)));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, []);

  return (
    <div>
      <h2>Orders Over Time</h2>
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

export default OrdersLineChart;
