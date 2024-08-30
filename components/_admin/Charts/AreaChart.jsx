"use client";

// import CanvasJSReact from "@canvasjs/react-charts";
// dynamic(() => import("@canvasjs/react-charts"));
import dynamic from "next/dynamic";
var CanvasJSChart = dynamic(
  () =>
    import("@canvasjs/react-charts").then((mod) => mod.default.CanvasJSChart),
  { ssr: false }
);

const AreaChart = (props) => {
  const options = {
    responsive: true,
    animationEnabled: true,
    animationDuration: 1500,
    axisX: {
      valueFormatString: "MMM",
      interval: 1,
      intervalType: "month",
    },
    data: [
      {
        lineColor: "#82ca9d",
        color: "#82ca9d",
        type: "splineArea",
        backgroundColor: "red",
        xValueFormatString: "MMM",
        yValueFormatString: "# items",
        xValueType: "dateTime",
        showInLegend: false,
        datasets: [
          {
            label: "Sales",
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
          },
        ],
        dataPoints: [
          { x: new Date("2023-01-01"), y: 636 },
          { x: new Date("2023-02-01"), y: 68 },
          { x: new Date("2023-03-01"), y: 806 },
          { x: new Date("2023-04-01"), y: 564 },
          { x: new Date("2023-05-01"), y: 105 },
          { x: new Date("2023-06-01"), y: 961 },
          { x: new Date("2023-07-01"), y: 358 },
          { x: new Date("2023-08-01"), y: 80 },
          { x: new Date("2023-09-01"), y: 772 },
          { x: new Date("2023-10-01"), y: 583 },
          { x: new Date("2023-11-01"), y: 916 },
          { x: new Date("2023-12-01"), y: 276  },
        ],
      },
    ],
  };

  const containerProps = {
    width: "100%",
    height: "90%",
    margin: "auto",
  };
  const data = {
    datasets: [
      {
        label: "Sales",
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div {...props}>
      {
        <CanvasJSChart
          options={options}
          containerProps={containerProps}
          data={data}
        />
      }
    </div>
  );
};

export default AreaChart;
