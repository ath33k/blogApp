import { FormControl, MenuItem } from "@mui/material";
import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { UserProvider, useLoggedUser } from "./../context/UserProvider";
import axios from "axios";

function HomeTabs({ tabSelection, setTabSelection }) {
  // const tabs = [
  //   "Recents",
  //   "Education",
  //   "Technology",
  //   "Finance",
  //   "Health",
  //   "Travel",
  //   "Fashion",
  //   "Food",
  //   "Other",
  // ];

  const [tabsData, setTabData] = useState([]);

  const [dropDownSelection, setDropDownSelection] = useState("---");
  const [tabsCount, setTabsCount] = useState(6);

  console.log(tabSelection);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1200) {
        setTabsCount(6);
      } else if (width > 768) {
        setTabsCount(4);
      } else {
        setTabsCount(3);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`
        );
        const responseData = response.data.data;
        setTabData(responseData.categories);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const handleTabSelection = (id) => {
    setTabSelection(id);
    setDropDownSelection("---");
  };

  const handleDropDownSelection = (e) => {
    setDropDownSelection(e.target.value);
    setTabSelection(e.target.value);
  };

  return (
    <div className="flex justify-center gap-4">
      <button
        value={"recents"}
        onClick={() => handleTabSelection("recents")}
        className={`border-b-2 border-black border-opacity-0 p-1 capitalize text-sm ${
          tabSelection == "recents" && "border-opacity-100"
        }`}
      >
        Recents
      </button>
      {tabsData.slice(0, tabsCount).map((tab, index) => (
        <button
          key={index}
          value={tab.name}
          onClick={() => handleTabSelection(tab._id)}
          className={`border-b-2 border-black border-opacity-0 p-1 capitalize text-sm ${
            tabSelection == tab._id && "border-opacity-100"
          }`}
        >
          {tab.name}
        </button>
      ))}

      {/* <FormControl sx={{ minWidth: 80 }}>
        <Select
          value={dropDownSelection ? dropDownSelection : "---"}
          onChange={handleDropDownSelection}
        >
          <MenuItem value="---" disabled>
            <em>---</em>
          </MenuItem>
          {tabs.slice(tabsCount).map((tab, index) => (
            <MenuItem key={index} value={tab}>
              {tab}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      {tabsData.length > tabsCount && (
        <select
          value={dropDownSelection ? dropDownSelection : "---"}
          onChange={handleDropDownSelection}
        >
          <option value="---" disabled>
            ---
          </option>
          {tabsData.slice(tabsCount).map((tab, index) => (
            <option key={index} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default HomeTabs;
