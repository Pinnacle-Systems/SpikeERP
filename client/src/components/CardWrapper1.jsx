import React, { useContext } from 'react';
import { ColorContext } from '../scenes/global/ColorContext';
import FilterOptions1 from './FilterOptionsN';
import { set } from 'lodash';

const CardWrapperN = ({ heading, children, onFilterClick, onInfoShowText, showFilter = true, 
}) => {
    const { color } = useContext(ColorContext);

    return (
        <div className="group text-center border border-gray-300 rounded-lg shadow-lg bg-white h-[115px] w-full mb-8">
            {/* Header Section */}
            <div
                className="text-center rounded-t-lg flex items-center justify-between h-[30px] shadow-md px-4"
                style={{
                    background: color ? color : '#E5E7EB',
                }}
            >
                {/* Left Corner */}
                <div className="text-[15px] text-white font-medium tracking-wider">
                    {heading}
                </div>

                {/* Right Corner (Filter Options) */}
                {showFilter && (
                    <FilterOptions1 onFilterClick={onFilterClick} onInfoShowText={onInfoShowText} />
                )}
            </div>

            {/* Content Section */}
            <div className="rounded-b-lg w-full flex justify-center items-center h-full">
                <div className="w-full h-full">{children}</div>
            </div>
        </div>
    );
};

export default CardWrapperN;
