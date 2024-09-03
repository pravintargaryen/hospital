import { useRef, useEffect } from "react";
import * as d3 from "d3";

const staffScheduleData = [
  {
    name: "John Doe",
    shiftStart: "2024-09-01T08:00:00",
    shiftEnd: "2024-09-01T16:00:00",
  },
  {
    name: "Jane Smith",
    shiftStart: "2024-09-01T16:00:00",
    shiftEnd: "2024-09-01T00:00:00",
  },
  // Add more data here
];

const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const StaffScheduleChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleTime()
      .domain([
        new Date("2024-09-01T00:00:00"),
        new Date("2024-09-02T00:00:00"),
      ])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleBand()
      .domain(staffScheduleData.map((d) => d.name))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    svg
      .selectAll("rect")
      .data(staffScheduleData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(new Date(d.shiftStart)))
      .attr("y", (d) => y(d.name))
      .attr("width", (d) => x(new Date(d.shiftEnd)) - x(new Date(d.shiftStart)))
      .attr("height", y.bandwidth())
      .attr("fill", "pink");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(d3.timeHour.every(1)));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, []);

  return (
    <div>
      <h2>Staff Assignment Schedule</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default StaffScheduleChart;
