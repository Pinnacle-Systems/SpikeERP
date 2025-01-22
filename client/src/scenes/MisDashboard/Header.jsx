import React, { useState } from 'react'
import NumericCard from '../../components/NumericCard'
import { useGetMisDashboardQuery } from '../../redux/service/misDashboardService';
const Header = () => {
    const [selectedOption, setSelectedOption] = useState('Detailed1');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [selectedYear, setSelectedYear] = useState('');
        const [previousYear, setPreviousYear] = useState(null);
    const { data: misData, refetch } = useGetMisDashboardQuery({ params: { filterYear: (selectedYear?.name ? selectedYear.name : '' || selectedYear), previousYear } })
    console.log(previousYear, 'rep');
    return (
        <>
        
            <div>
                <NumericCard misData={misData} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            </div>
        </>
    )
}

export default Header