import React, { useState, useEffect, useMemo } from "react";
import { Dropdown } from "primereact/dropdown";
import { useGetFinYrQuery } from "../redux/service/poData";

export default function DropdownData({
  selectedYear,
  setSelectedYear,
  previousYear = null,
  setPreviousYear = () => {},
}) {
  const [options, setOptions] = useState([]);
  const [lastItem, setLastItem] = useState(null);
  const { data: finYr } = useGetFinYrQuery();
  const finYear = useMemo(() => (finYr?.data ? finYr.data : []), [finYr]);

  useEffect(() => {
    const mappedOptions = finYear.map((item) => ({
      name: item.finYr,
      value: item.finYr,
    }));
    setOptions(mappedOptions);

    if (finYear.length > 0) {
      const lastYear = finYear[finYear.length - 1].finYr;
      setLastItem(lastYear);

      if (!selectedYear) {
        setSelectedYear(lastYear);
      }

      const selectedIndex = finYear.findIndex((item) => item.finYr === selectedYear);
      if (selectedIndex > 0) {
        const preYear = finYear[selectedIndex - 1].finYr;
        setPreviousYear(preYear);
      } else {
        setPreviousYear(null);
      }
    }
  }, [finYear, selectedYear, setSelectedYear]);

  return (
    <div className="flex flex-col items-start w-full space-y-2">
      <label
        htmlFor="financial-year-dropdown"
        className="text-sm font-semibold text-gray-800"
      >
        Select Financial Year:
      </label>
      <Dropdown
        id="financial-year-dropdown"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.value)}
        options={options}
        placeholder={lastItem || "Select Financial Year"}
        className="w-full p-2 border border-gray-300 rounded-lg shadow-md focus:ring focus:ring-indigo-200"
        panelClassName="dropdown-panel-black"
        optionLabel="name"
      />
      {previousYear && (
        <p className="text-xs text-gray-600">
          Previous Year: <span className="font-medium">{previousYear}</span>
        </p>
      )}
    </div>
  );
}
