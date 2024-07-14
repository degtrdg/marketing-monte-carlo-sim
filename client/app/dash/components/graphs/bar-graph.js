"use client";

import { Box } from "@chakra-ui/react";
import { ResponsiveBar } from "@nivo/bar";

export default function BarGraph({ data, ...props }) {
  return (
    <Box {...props}>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="category"
        padding={0.3}
        colors={"rgba(5, 153, 233, 0.8)"}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 60,
          legend: "Category",
          legendOffset: -10,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 8,
          tickPadding: 3,
          tickRotation: 0,
          legend: "Value",
          legendOffset: 10,
          legendPosition: "middle",
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        theme={{
          background: "rgba(0, 0, 0, 0)",
          text: {
            fontSize: 12,
            fill: "#000000",
          },
          axis: {
            domain: {
              line: {
                stroke: "rgba(255, 255, 255, 1)",
                strokeWidth: 1,
              },
            },
            legend: {
              text: {
                fontSize: 14,
                fill: "#000000",
                outlineWidth: 5,
                outlineColor: "transparent",
              },
            },
            ticks: {
              line: {
                stroke: "rgba(255, 255, 255, 0.5)",
                strokeWidth: 1,
              },
              text: {
                fontSize: 13,
                fill: "#000000",
                outlineWidth: 3,
                outlineColor: "transparent",
              },
            },
          },
          grid: {
            line: {
              stroke: "rgba(255, 255, 255, 0.2)",
              strokeWidth: 1,
            },
          },
          tooltip: {
            color: "black",
            container: {
              background: "rgba(128, 128, 128, 1)",
              fontSize: 12,
            },
          },
        }}
      />
    </Box>
  );
}
