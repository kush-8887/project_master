import React, { useState } from 'react';
import useAuth from '../../hooks/validation';
import Fileup from '../dashboard/Fileup';
import { ResponsivePie } from '@nivo/pie';
import PieChart from '../dashboard/PieChart';
import LineGraph from '../dashboard/LineGraph';
import DashNav from '../dashboard/DashNav';

export default function AfterLogin() {
  const { authenticated } = useAuth();

  

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
      <Fileup visibility={false} />
      <div className='flex flex-row '>
      <DashNav />
      {/* <div className='bg-b-grey w-[80vw] h-[100vh] overflow-scroll scrollbar-hide'> */}
      <div className='bg-b-grey w-[80vw] h-[100vh] overflow-scroll no-scrollbar'>
      <div className='w-[80vw] flex flex-row' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowY: 'scroll' }}>
        <PieChart link={"http://localhost:8000/getPie/year/2024"} height={"500px"} width={"500px"} />
        <PieChart link={"http://localhost:8000/getPie/quarter/2024Q1"} height={"500px"} width={"500px"} />
      </div>
      <LineGraph link={"http://localhost:8000/getLineGP/year/2023/2024"} height={"500px"} width={"1000px"} xAxisLabel={"Products"} yAxisLabel={"Price"}/> 
      <LineGraph link={"http://localhost:8000/getLineGP/quarter/2024"} height={"500px"} width={"1000px"} xAxisLabel={"Products"} yAxisLabel={"Price"}/> 
      <LineGraph link={"http://localhost:8000/getLineGP/month/2024"} height={"500px"} width={"1000px"} xAxisLabel={"Products"} yAxisLabel={"Price"}/> 
      </div>
      </div>
    </div>
  );
}
