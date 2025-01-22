import React, { useContext, useState, useEffect } from "react";
import DropdownData from "../../../Ui Component/modelUi";
import { ColorContext } from "../../global/ColorContext";

const BuyerMultiSelect = ({ selectedYear, setSelectedYear, showModel, setShowModel }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedOption, setSelectedOption] = useState('');
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
      if (showModel) {
          setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      }
  }, [showModel]);

  const handleMouseDown = (e) => {
      setDragging(true);
      setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
      if (dragging) {
          setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      }
  };

  const handleMouseUp = () => setDragging(false);

  const handleOkClick = () => {
      if (selectedOption) setSelectedYear(selectedOption);
      setShowModel(false);
  };

  return (
      <div
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="relative"
      >
          {showModel && (
              <>
                  <div
                      style={{
                          position: "fixed",
                          top: `${position.y}px`,
                          left: `${position.x}px`,
                          transform: "translate(-50%, -50%)",
                          zIndex: 800,
                          borderRadius: 8,
                          borderTop: "8px solid #3B82F6",
                          backgroundColor: "#F1F3F6",
                          width: 300,
                          height: 500,
                      }}
                      onMouseDown={handleMouseDown}
                  >
                      <div style={{ padding: 20, overflowY: "auto", height: "100%" }}>
                          {/* <label className="block text-sm font-semibold text-gray-700 mb-3">
                              Select Company
                          </label> */}
                          <DropdownData
                              selectedYear={selectedOption}
                              setSelectedYear={setSelectedOption}
                          />
                          <button
                              onClick={handleOkClick}
                              className="absolute right-3 bottom-5 px-5 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:scale-105"
                          >
                              Ok
                          </button>
                      </div>
                  </div>
                  <div
                      onClick={() => setShowModel(false)}
                      className="fixed inset-0 bg-black bg-opacity-50"
                      style={{ zIndex: 700 }}
                  ></div>
              </>
          )}
      </div>
  );
};

export default BuyerMultiSelect;


