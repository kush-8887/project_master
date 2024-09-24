import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";

export default function LineGraph({ link, height, width ,xAxisLabel ,yAxisLabel}) {
  const [data, setData] = useState([]); // Correct initialization with useState

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(link, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        setData(result); // Assuming result is in the correct format for Nivo Line chart
      } catch (error) {
        console.error("Error fetching line chart data:", error);
      }
    };
    fetchData();
  }, [link]);

  return (
    <div style={{ height: height, width: width }}>
      {data.length > 0 ? (
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: xAxisLabel, // Customize this according to your data
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: yAxisLabel, // Customize this according to your data
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          theme={{
            fontSize: 14,
            fontFamily: "Arial, sans-serif",
            axis: {
              ticks: {
                line: {
                  stroke: "#555555",
                },
                text: {
                  fill: "#333333",
                },
              },
            },
            labels: {
              text: {
                fill: "#555555",
              },
            },
            legends: {
              text: {
                fontSize: 12,
                fill: "#999999",
              },
            },
            tooltip: {
              container: {
                background: "#333",
                color: "#fff",
                fontSize: "12px",
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
