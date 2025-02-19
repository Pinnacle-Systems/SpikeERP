import React from 'react'
import { useGetMisDashboardActualVsBudgetValueMonthWiseQuery } from '../../../redux/service/misDashboardService'
import Lchart from '../../../components/LineChart';
import { HiOutlineRefresh } from 'react-icons/hi';

const LineChart = () => {
    const { data, refetch } = useGetMisDashboardActualVsBudgetValueMonthWiseQuery({})
    const ordersInHandMonthWise = data?.data || [];
    return (
        <div className='w-full h-[370] bg-white rounded-lg '>
            <div className='flex w-full justify-end'>
                </div>
            <Lchart xAxisData={ordersInHandMonthWise.map(i => `${i.date}`)} series1Data={ordersInHandMonthWise.map(i => parseInt(i.planned))} series2Data={ordersInHandMonthWise.map(i => parseInt(i.actual))} series1Label='Budget' />
        </div>
    )
}

export default LineChart