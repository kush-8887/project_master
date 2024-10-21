import React, { useEffect, useState } from 'react';
import LineGraph from "./LineGraph";
import DashNav from './DashNav';

export default function PredictionQuantity() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null); // Initialize as null

  const handleProduct = (e) => {
    const selectedItem = e.target.value;
    setCurrentItem(selectedItem);
    console.log(selectedItem);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('http://localhost:8000/fetchPredItems', {
          method: 'GET',
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setItems(data.items); 
          setCurrentItem(data.items[1]); 
        } else {
          console.error("Failed to fetch items data");
        }
      } catch (error) {
        console.error("Error fetching items data:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="flex flex-col">
      {/* <DashNav /> */}
      <section className="prediction-cont flex bg-b-grey w-[80vw]">
        <div className="heading-cont m-5 p-5 bg-c-grey rounded-xl flex justify-between items-center w-[100%]">
          <div className="heading text-white text-3xl">Quantity sale prediction</div>
          <div className="year-select">
            <select
              name="year"
              id="year"
              className="w-[100px] p-2 rounded-sm bg-selected-purple text-black"
              onChange={handleProduct}
            >
              {items.length === 0 ? (
                <option>No data</option>
              ) : (
                items.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </section>
      <div className='bg-c-grey m-5 p-5 rounded-xl'>
        <div className="heading text-white text-xl">
          Quantity prediction for: {currentItem}
        </div>
        {currentItem && ( // Only render LineGraph if currentItem is not null
          <LineGraph link={`http://localhost:8000/getQuantityPred/${currentItem}`} height={"500px"} width={"100%"}/>
        )}
      </div>
      <div className='bg-c-grey m-5 p-5 rounded-xl'>
        <div className="heading text-white text-xl">
          Quantity prediction for: {currentItem} Quarterly
        </div>
        {currentItem && ( // Only render LineGraph if currentItem is not null
          <LineGraph link={`http://localhost:8000/getQuantPredQuarter/${currentItem}`} height={"500px"} width={"100%"}/>
        )}
      </div>
    </div>
  );
}
