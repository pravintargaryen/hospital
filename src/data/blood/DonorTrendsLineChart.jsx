import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

const DonorTrendsLineChart = () => {
  const svgRef = useRef();
  const [donorTrendData, setDonorTrendData] = useState(null);
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
        setDonorTrendData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!donorTrendData) return;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleTime()
      .domain(
        d3.extent(
          donorTrendData.bloodBank.donorTrends,
          (d) => new Date(d.month)
        )
      )
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(donorTrendData.bloodBank.donorTrends, (d) => d.donors),
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => x(new Date(d.month)))
      .y((d) => y(d.donors))
      .curve(d3.curveMonotoneX);

    svg.selectAll("*").remove();

    svg
      .append("path")
      .data([donorTrendData.bloodBank.donorTrends])
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "pink")
      .attr("stroke-width", "2px");

    svg
      .selectAll("circle")
      .data(donorTrendData.bloodBank.donorTrends)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(new Date(d.month)))
      .attr("cy", (d) => y(d.donors))
      .attr("r", 6)
      .attr("fill", "pink")
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip
          .style("opacity", 1)
          .html(`Month: ${d.month}<br/>Donors: ${d.donors}`)
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
  }, [donorTrendData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!donorTrendData) {
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

export default DonorTrendsLineChart;
