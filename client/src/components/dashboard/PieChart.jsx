import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import loading from '../../assets/imgs/utils/loading-waiting.gif'

export default function PieChart({ link, height, width }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the link provided in props
    const fetchData = async () => {
      try {
        const response = await fetch(link,{
            method : "GET",
            credentials : "include"
        });
        const result = await response.json();
        setData(result); // Assuming the result is in the format Nivo Pie expects
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchData();
  }, [link]);

  return (
    <div style={{ height: height, width: width }} className="flex items-center justify-center">
      {data.length > 0 ? (
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
          theme={{
            fontSize: 14,
            fontFamily: "Arial, sans-serif",
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
        <img className="h-[50px]" src={loading} alt="loading" />
      )}
    </div>
  );
}
