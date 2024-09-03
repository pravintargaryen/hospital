import { useRef, useEffect } from "react";
import * as d3 from "d3";

// Sample data: Replace with your actual stock data
const stockData = [
  { product: "Aspirin", stock: 120 },
  { product: "Ibuprofen", stock: 150 },
  { product: "Paracetamol", stock: 180 },
  { product: "Antibiotics", stock: 200 },
  // Add more data here
];

const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

const StocksBarChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(stockData.map((d) => d.product))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(stockData, (d) => d.stock)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll("rect")
      .data(stockData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.product))
      .attr("y", (d) => y(d.stock))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.bottom - y(d.stock))
      .attr("fill", "#28a745")
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip
          .style("opacity", 1)
          .html(`Product: ${d.product}<br/>Stock: ${d.stock}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
      });

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, []);

  return (
    <div>
      <h2>Stock Levels</h2>
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

export default StocksBarChart;
