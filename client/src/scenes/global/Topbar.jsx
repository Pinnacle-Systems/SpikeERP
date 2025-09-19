import { useContext, useState, useEffect } from "react";
import * as React from "react";
import { MdLogout, MdClose } from "react-icons/md";
import { ChromePicker } from "react-color";
import { ColorContext } from "./ColorContext";
import logo from "../../assets/l.png";
import { FaDatabase, FaMoneyBill } from "react-icons/fa"; 
import Tooltip from "@mui/material/Tooltip";


const Topbar = ({ onLogout,selectedButton,setSelectedButton }) => {
  const { color, setColor } = useContext(ColorContext);
  const [showPicker, setShowPicker] = useState(false);

  const DEFAULT_COLOR = "#056028";
  useEffect(() => {
    const storedColor = localStorage.getItem("themeColor");
    if (storedColor) {
      setColor(storedColor);
    } else {
      setColor(DEFAULT_COLOR);
    }
  }, [setColor]);

  const handleColorChange = (newColor) => {
    const selectedColor = newColor.hex;
    setColor(selectedColor);
    localStorage.setItem("themeColor", selectedColor);
  };

  const handleResetColor = () => {
    setColor(DEFAULT_COLOR);
    localStorage.setItem("themeColor", DEFAULT_COLOR);
  };

  return (
    <div className="flex h-14">
      <div className="bg-[#1F2937] w-1/2 flex items-center px-4">
        <img src={logo} alt="logo" className="w-44 cursor-pointer" />
      </div>

      <div
        className="w-1/2 flex justify-between items-center px-4 text-white"
        style={{ backgroundColor: color }}
      >
        <div className="text-xl font-semibold">Management Information Dashboard</div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="text-white hover:text-gray-300 text-sm px-2 py-1 border rounded-lg"
          >
            Select Theme
          </button>

          {showPicker && (
            <div className="absolute top-16 right-4 z-50 bg-white rounded-lg shadow-lg p-2">
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setShowPicker(false)}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <MdClose size={20} />
                </button>
              </div>

              <ChromePicker
                color={color}
                onChange={handleColorChange}
                disableAlpha={true}
              />


              <button
                onClick={handleResetColor}
                className="mt-2 w-full bg-blue-500 text-white text-sm px-2 py-1 rounded-lg hover:bg-blue-600"
              >
                Set Default
              </button>
            </div>
          )}

          {/* ERP Button */}
          <Tooltip title="ERP" arrow open={selectedButton === "erp"}>
            <button
              onClick={() => setSelectedButton("erp")}
              className={`p-2 rounded-lg ${selectedButton === "erp"
                  ? "bg-white text-gray-800"
                  : "bg-gray-700 hover:bg-blue-500 text-gray-300"
                }`}
              style={{
                minWidth: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: selectedButton === "erp" ? color : "",
              }}
            >
              <FaDatabase size={14} />
            </button>
          </Tooltip>

          {/* Payroll Button */}
          <Tooltip title="Payroll" arrow open={selectedButton === "payRoll"}>
            <button
              onClick={() => setSelectedButton("payRoll")}
              className={`p-2 rounded-lg ${selectedButton === "payRoll"
                  ? "bg-white text-gray-800"
                  : "bg-gray-700 hover:bg-blue-500 text-gray-300"
                }`}
              style={{
                minWidth: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: selectedButton === "payRoll" ? color : "",
              }}
            >
              <FaMoneyBill size={14} />
            </button>
          </Tooltip>


          <button
            onClick={onLogout}
            className="text-white hover:text-gray-300 text-2xl focus:outline-none"
          >
            <MdLogout />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;