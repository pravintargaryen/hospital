import { useRef, useEffect } from "react";
import * as d3 from "d3";

const roomData = [
  { room: "Room 1", available: 10, occupied: 5 },
  { room: "Room 2", available: 7, occupied: 8 },
  { room: "Room 3", available: 15, occupied: 3 },
  // Add more data here
];

const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const RoomBedBubbleChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(roomData.map((d) => d.room))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(roomData, (d) => d.available + d.occupied)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3
      .scaleOrdinal()
      .domain(["available", "occupied"])
      .range(["#4caf50", "#f44336"]);

    const radiusScale = d3
      .scaleSqrt()
      .domain([0, d3.max(roomData, (d) => d.available + d.occupied)])
      .range([0, 30]);

    svg
      .selectAll("circle")
      .data(roomData)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.room) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.available + d.occupied))
      .attr("r", (d) => radiusScale(d.available + d.occupied))
      .attr("fill", (d) =>
        color(d.available > d.occupied ? "available" : "occupied")
      )
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip
          .style("opacity", 1)
          .html(
            `Room: ${d.room}<br/>Available: ${d.available}<br/>Occupied: ${d.occupied}`
          )
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

export default RoomBedBubbleChart;
