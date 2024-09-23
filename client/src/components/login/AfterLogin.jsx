import React, { useState } from 'react';
import useAuth from '../../hooks/validation';
import Fileup from '../dashboard/Fileup';
import { ResponsivePie } from '@nivo/pie';

export default function AfterLogin() {
  const { authenticated } = useAuth();

  const MyResponsivePie = ({ data }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        { match: { id: 'modelS' }, id: 'dots' },
        { match: { id: 'c' }, id: 'dots' },
        { match: { id: 'go' }, id: 'dots' },
        { match: { id: 'python' }, id: 'dots' },
        { match: { id: 'scala' }, id: 'lines' },
        { match: { id: 'lisp' }, id: 'lines' },
        { match: { id: 'elixir' }, id: 'lines' },
        { match: { id: 'javascript' }, id: 'lines' },
      ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
      theme={{
        fontSize: 14,
        fontFamily: 'Arial, sans-serif',
        labels: {
          text: {
            fill: '#555555',
          },
        },
        legends: {
          text: {
            fontSize: 12,
            fill: '#999999',
          },
        },
        tooltip: {
          container: {
            background: '#333',
            color: '#fff',
            fontSize: '12px',
          },
        },
      }}
    />
  );

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!authenticated) {
    return null; // Nothing renders if not authenticated
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/getPie/year/2024',{
        method : "GET",
        credentials: 'include'
      });
      const data = await res.json();
      
      setData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Fileup visibility={true} />
      LOGIN SUCCESSFUL <br /><br /><br />
      <div style={{ height: '500px', width: '500px' }}>
        {data.length > 0 ? (
          <MyResponsivePie data={data} />
        ) : (
          <p>No data available</p>
        )}
        <button onClick={fetchData} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Data'}
        </button>
      </div>
    </div>
  );
}
