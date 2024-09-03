import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 40, left: 40 };

const DonorsBarChart = () => {
  const svgRef = useRef();
  const [donorData, setDonorData] = useState(null);
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
        setDonorData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!donorData) return;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(donorData.bloodBank.donors.map((d) => d.bloodType))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(donorData.bloodBank.donors, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll("*").remove();

    svg
      .selectAll("rect")
      .data(donorData.bloodBank.donors)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.bloodType))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.count))
      .attr("fill", "pink")
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip
          .style("opacity", 1)
          .html(`${d.bloodType}<br/>Donors: ${d.count}`)
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
  }, [donorData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!donorData) {
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

export default DonorsBarChart;
