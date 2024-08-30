"use client";
import { PieChart as Pie } from "react-minimal-pie-chart";

const PieChart = () => {
  return (
    <Pie
      animate
      animationEasing="ease"
      animationDuration={1000}
      data={[
        { title: "One", value: 10, color: "#ffe1db" },
        { title: "Two", value: 15, color: "#ffc96b" },
        { title: "Three", value: 20, color: "#5bcdda" },
        { title: "Four", value: 12, color: "#008060" },
        { title: "Cancelled", value: 4, color: "#d72c0d" },
      ]}
    />
  );
};

export default PieChart;
