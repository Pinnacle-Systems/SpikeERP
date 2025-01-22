import React from 'react'
import { useState } from 'react';
import CardWrapperN from './CardWrapper1';
import ModelMultiSelect from './ModelMultiSelect';
import Movable from './Movable';
import { useContext } from 'react';
import { ColorContext } from '../scenes/global/ColorContext';

const NumericCard = ({ misData ,selectedYear,setSelectedYear}) => {
  const {color} = useContext(ColorContext); 
    const totalTurnOver = misData?.data?.totalTurnOver;
    const profit = misData?.data?.profit;
    const newCustomers = misData?.data?.newCustomers;
    const topCustomers = misData?.data?.topCustomers;
    const loss = misData?.data?.loss;
    const [showModel, setShowModel] = useState(false);

    const data = [
        {
            name: "Turn Over",
            borderColor: "#1F588B",
            value: `₹${(totalTurnOver?.currentValue || 0).toLocaleString()}`,
            qty: `${(totalTurnOver?.currentQty || 0).toLocaleString()}`,
            previousValue: `₹${(totalTurnOver?.prevValue || 0).toLocaleString()}`,
            previousQty: `₹${(totalTurnOver?.prevQty || 0).toLocaleString()}`,

        },
        {
            name: "Profit",
            borderColor: "#62AAA3",
            value: `₹${(profit?.currentValue || 0).toLocaleString().toLocaleString()}`,
            qty: `${(profit?.currentQty || 0).toLocaleString()}`,
            previousValue: `₹${(profit?.prevValue || 0).toLocaleString()}`,
            previousQty: `₹${(profit?.prevQty || 0).toLocaleString()}`,


        },
        {
            name: "New Customers",
            borderColor: "border-[#96A669]",
            value: `₹${(newCustomers?.currentValue || 0).toLocaleString().toLocaleString()}`,
            qty: `₹${(newCustomers?.currentQty || 0).toLocaleString()}`,
            previousValue: `₹${(newCustomers?.prevValue || 0).toLocaleString()}`,
            previousQty: `₹${(newCustomers?.prevQty || 0).toLocaleString()}`,
        },
        {
            name: "Top 5 Customers",
            borderColor: "border-[#D49B37]",
            value: `₹${(topCustomers?.currentValue || 0).toLocaleString().toLocaleString()}`,
            qty: `₹${(topCustomers?.currentQty || 0).toLocaleString()}`,
            previousValue: `₹${(topCustomers?.prevValue || 0).toLocaleString()}`,
            previousQty: `₹${(topCustomers?.prevQty || 0).toLocaleString()}`,
        },
        {
            name: "Loss",
            borderColor: "border-[#D49B37]",
            value: `₹${(loss?.currentValue || 0).toLocaleString()}`,
            qty: `₹${(loss?.currentQty || 0).toLocaleString()}`,
            previousValue: `₹${(loss?.prevValue || 0).toLocaleString()}`,
            previousQty: `₹${(loss?.prevQty || 0).toLocaleString()}`,
        },
    ]
    const onFilterClick = () => {
      setShowModel(!showModel);
    };
    
    return (
        <div className='flex justify-around w-full h-full'>
           {showModel && (
        <Movable divId="cardMovable">
          <ModelMultiSelect
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          showModel= {showModel} setShowModel = {setShowModel}
           color={color}
          />
        </Movable>
      )}
            {data.map((val, i) =>
                <div key={i} className='w-[24.5%] text-center '>
                    <CardWrapperN heading={val.name} showModel= {showModel} setShowModel= {setShowModel} onFilterClick = {onFilterClick}  >
                    <div
  className="h-full w-full bg-gray-50 border rounded-md shadow-md p-2"
>
  {/* Header Section */}
  <div className="flex justify-between items-center mb-2">
    <div>
      <h1 className="text-xs font-medium text-gray-500">Qty</h1>
      <span className="text-lg font-bold text-blue-600">{val.qty}</span>
    </div>
    <div className="text-right">
      <h1 className="text-xs font-medium text-gray-500">Value</h1>
      <span className="text-lg font-bold text-green-600">{val.value}</span>
    </div>
  </div>

  {/* Divider */}
  <hr className="border-gray-200 my-1" />

  {/* Details Section */}
  <div className="flex justify-between text-xs text-gray-600">
    <div>
      <div className="font-medium">Prev Qty</div>
      <div className="text-gray-800">{val.previousQty}</div>
    </div>
    <div>
      <div className="font-medium">Prev Val</div>
      <div className="text-gray-800">{val.previousValue}</div>
    </div>
  </div>
</div>


                    </CardWrapperN>
                </div>
            )}
        </div>

    )
}
export default NumericCard;