import React from 'react'
import { useGetMisDashboardOrdersInHandMonthWiseQuery } from '../../../redux/service/misDashboardService'
import Lchart from '../../../components/LineChart';

const LineChart = () => {
    const { data, refetch } = useGetMisDashboardOrdersInHandMonthWiseQuery({})
    const ordersInHandMonthWise = data?.data || [];
    console.log(data, 'data');
    return (
        <div className='w-full  h-[370] bg-white rounded-lg'>
            <div className='flex w-full justify-end'>
              </div>
            <Lchart xAxisData={ordersInHandMonthWise.map(i => `${i.date}`)} series1Data={ordersInHandMonthWise.map(i => parseInt(i.planned))} series2Data={ordersInHandMonthWise.map(i => parseInt(i.actual))} />
        </div>
    )
}

export default LineChart