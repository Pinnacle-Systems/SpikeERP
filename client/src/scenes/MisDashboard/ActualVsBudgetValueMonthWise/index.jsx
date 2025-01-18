import React from 'react'
import CardWrapper from '../../../components/CardWrapper'
import LineChart from './LineChart'

const ActualVsBudgetValueMonthWise = () => {
    return (
        <CardWrapper heading={"Actual Vs Budget Month Wise"} showFilter= {false}>
            <LineChart />
        </CardWrapper>
    )
}

export default ActualVsBudgetValueMonthWise