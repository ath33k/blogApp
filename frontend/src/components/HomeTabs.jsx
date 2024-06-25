import { FormControl, MenuItem } from "@mui/material";
import { Select } from "antd";
import React, { useEffect, useState } from "react";

function HomeTabs() {
  const tabs = [
    "Recents",
    "Education",
    "Technology",
    "Finance",
    "Health",
    "Travel",
    "Fashion",
    "Food",
    "Other",
  ];
  const [tabSelection, setTabSelection] = useState("recents");

  const [dropDownSelection, setDropDownSelection] = useState("---");
  const [tabsCount, setTabsCount] = useState(6);

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

  const handleTabSelection = (e) => {
    setTabSelection(e.target.value);
    setDropDownSelection("");
  };

  const handleDropDownSelection = (val) => {
    setDropDownSelection(val);
    setTabSelection(val);
  };

  return (
    <div className="flex justify-center gap-4">
      {tabs.slice(0, tabsCount).map((tab, index) => (
        <button
          key={index}
          value={tab}
          onClick={handleTabSelection}
          className={`border-b-2 border-black border-opacity-0 p-1 capitalize text-sm ${
            tabSelection == tab && "border-opacity-100"
          }`}
        >
          {tab}
        </button>
      ))}
      <FormControl sx={{ minWidth: 80 }}>
        <Select
          value={dropDownSelection ? dropDownSelection : "---"}
          onChange={handleDropDownSelection}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
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
      </FormControl>
    </div>
  );
}

export default HomeTabs;
