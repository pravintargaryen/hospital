import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const width = 500;
const height = 300;
const margin = { top: 20, right: 30, bottom: 40, left: 40 };

const PatientPriorityChart = () => {
  const svgRef = useRef();
  const [priorityData, setPriorityData] = useState(null);
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
        setPriorityData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!priorityData) return;

    console.log("Rendering chart with data:", priorityData);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(priorityData.emergency.patientQueue.map((d) => d.priority))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(priorityData.emergency.patientQueue, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll("*").remove();

    svg
      .append("g")
      .selectAll("rect")
      .data(priorityData.emergency.patientQueue)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.priority))
      .attr("y", (d) => y(d.count))
      .attr("height", (d) => y(0) - y(d.count))
      .attr("width", x.bandwidth())
      .attr("fill", "pink");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [priorityData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!priorityData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Patient Priority Distribution</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default PatientPriorityChart;
