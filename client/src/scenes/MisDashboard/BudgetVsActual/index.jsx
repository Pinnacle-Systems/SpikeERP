import React from 'react'
import CardWrapper from '../../../components/CardWrapper'

import BudgetVsActualDetReport from './BudgetVsActualReport'

const BudgetVsActualReport = () => {
    return (
        <CardWrapper heading={"Budget Vs Actual Report For Shipped Orders"}>
            <BudgetVsActualDetReport />
        </CardWrapper>
    )
}

export default BudgetVsActualReport 