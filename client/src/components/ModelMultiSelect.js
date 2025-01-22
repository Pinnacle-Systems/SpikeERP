import SelectBuyer from "../Ui Component/modelParam";
import { FaUserPlus, FaBriefcase, FaUsers } from "react-icons/fa";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import DropdownData from "../Ui Component/modelUi";

const ModelMultiSelect = ({
  selectedYear,setSelectedYear,showModel,setShowModel,color
}) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [dragging, setDragging] = useState(false);
  const startPosition = useRef(null);
  const  [year,setYear] = useState(selectedYear)
    console.log(color,"color for Model")

  // When the modal is shown, position it at the center
  useEffect(() => {
    if (showModel) {
      setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
  }, [showModel]);

  const handleMouseDown = (e) => {
    setDragging(true);
    startPosition.current = { x: e.clientX, y: e.clientY }; // Store the initial mouse position when drag starts
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const dx = e.clientX - startPosition.current.x; // Calculate the movement in x direction
      const dy = e.clientY - startPosition.current.y; // Calculate the movement in y direction

      // Update position only when dragging
      setPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));

      // Update start position for the next move
      startPosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };
  const handleOkClick = () => {
    setSelectedYear(year)
    setIsOpen(false);
    setShowModel(false) 
};
    const [isOpen, setIsOpen] = useState(false);


  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative"
    >
      {showModel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={() => setShowModel(false)}
        ></div>
      )}

      {showModel && (
        <div
          className={`model-box fixed bg-gray-100 shadow-xl transition-transform duration-500`}
          style={{
            top: position.y || "50%",
            left: position.x || "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 50,
            borderRadius: "8px",
            borderTop: `8px solid ${color || "#3B82F6"}`,
            width: "300px",
            height: "300px",
          }}
          onMouseDown={handleMouseDown}
        >
        <div className=" "><DropdownData selectedYear={year} setSelectedYear={setYear} /></div>

          <button
              className="absolute right-3 bottom-5 px-5 py-2 text-sm font-semibold text-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: color || "#1D4ED8",
              }}
              onClick={handleOkClick}
            >
              Ok
            </button>
        </div>
      )}
    </div>
  );
};

export default ModelMultiSelect;
