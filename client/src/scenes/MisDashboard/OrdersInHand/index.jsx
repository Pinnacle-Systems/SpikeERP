import React from 'react'
import CardWrapper from '../../../components/CardWrapper'
import PieChart from './PieChart'

const OrdersInHand = () => {
    return (
        <CardWrapper heading={"Orders in Hand Buyer Wise"}>
            <PieChart />
        </CardWrapper>
    )
}

export default OrdersInHand