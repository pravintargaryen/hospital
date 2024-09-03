import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const width = 400;
const height = 400;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };

const InventoryPieChart = () => {
  const svgRef = useRef();
  const [inventoryData, setInventoryData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log("Fetched data:", jsonData); // Log the fetched data
        setInventoryData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!inventoryData) return;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const radius = Math.min(width, height) / 2 - margin.top;

    const pie = d3.pie().value((d) => d.quantity);
    const arc = d3.arc().outerRadius(radius).innerRadius(0);

    const color = d3
      .scaleOrdinal()
      .domain(inventoryData.bloodBank.bloodInventory.map((d) => d.type))
      .range(d3.schemeSet2);

    const pieData = pie(inventoryData.bloodBank.bloodInventory);

    svg.selectAll("*").remove();

    svg
      .selectAll("path")
      .data(pieData)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.type))
      .attr("stroke", "#fff")
      .attr("stroke-width", "2px")
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip
          .style("opacity", 1)
          .html(`${d.data.type}<br/>Quantity: ${d.data.quantity}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
      });

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("y", 10);
  }, [inventoryData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!inventoryData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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

export default InventoryPieChart;
