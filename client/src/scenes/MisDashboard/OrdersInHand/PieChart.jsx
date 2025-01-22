import React, { useState } from 'react'
import PieChartTemplate from '../../../components/PieChartTemplate'
import { useGetMisDashboardOrdersInHandQuery } from '../../../redux/service/misDashboardService'
import DropdownData from '../../../Ui Component/modelUi'
import CardWrapper from '../../../components/CardWrapper'
import BuyerMultiSelect from './ModelMultiSelect1'

const PieChart = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [showModel, setShowModel] = useState(false);

    const { data } = useGetMisDashboardOrdersInHandQuery({
        params: { filterYear: selectedYear?.name || selectedYear || '' }
    });

    const ordersInHandBuyerWise = data?.data || [];

    const handleFilterClick = () => setShowModel(true);

    return (
        <CardWrapper heading="Orders in Hand Buyer Wise" onFilterClick={handleFilterClick}>
            <div className="w-full h-[350px] bg-white rounded-lg">
                {showModel && (
                    <BuyerMultiSelect
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        showModel={showModel}
                        setShowModel={setShowModel}
                    />
                )}
                <PieChartTemplate
                    id={`mis-ordersinhand${Math.random()}`}
                    data={ordersInHandBuyerWise}
                    valueField="value"
                    categoryField="buyer"
                />
            </div>
        </CardWrapper>
    );
};

export default PieChart;


