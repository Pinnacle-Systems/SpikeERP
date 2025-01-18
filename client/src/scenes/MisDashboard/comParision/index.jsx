import React from 'react'
import CardWrapper from '../../../components/CardWrapper'

import YearlyComChart from './YearlyCompChart'

const YearlyComparisionBuyerWise = () => {
    return (
        <CardWrapper heading={"Buyer Wise Order Qty Yearly Comparison"}>
             <div className='w-full h-[350px] bg-white rounded-lg '>
           < YearlyComChart />
            </div> 
        </CardWrapper>
    )
}

export default YearlyComparisionBuyerWise