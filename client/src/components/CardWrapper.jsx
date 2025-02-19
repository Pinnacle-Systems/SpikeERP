import React, { useContext } from 'react';
import { ColorContext } from '../scenes/global/ColorContext';
import FilterOptions from './FilterOptions';

const CardWrapper = ({ heading, children, onFilterClick, onInfoShowText, showFilter = true }) => {
    const { color } = useContext(ColorContext);

    return (
        <div className="text-center border border-gray-300  rounded-lg shadow-lg bg-gray-200 h-[400px] w-full">
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
                    <FilterOptions onFilterClick={onFilterClick} onInfoShowText={onInfoShowText} />
                )}
            </div>

            {/* Content Section */}
            <div className="px-2 py-2 rounded-b-lg w-full flex justify-center items-center h-full">
                <div className="w-full h-full">{children}</div>
            </div>
        </div>
    );
};

export default CardWrapper;
