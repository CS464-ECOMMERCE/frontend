"use client";
import * as React from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";

export default function BasicTabs({ description }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-5">
      <Tabs variant="fullWidth" value={value} onChange={handleChange}>
        <Tab label="Features" value={0} />
        <Tab label="Description" value={1} />
      </Tabs>
      <div hidden={value !== 0}>
        This is some text with some extra spacing and a few newlines along with
        some trailing spaces and five leading spaces thrown in for good
      </div>
      <div hidden={value !== 1}>
        {description || "No description for this product. Come again later."}
      </div>
    </div>
  );
}
