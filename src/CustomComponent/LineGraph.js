import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const LineGraph = ({ GetData, Xdata, Ydata }) => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    GetData(event.target.value);
  };

  var optionsBarChart = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false, // hide the download button
      },
    },
    colors: ["#6b5eff"], // set a single color for the bars
    xaxis: {
      categories: Xdata,
    },
    dataLabels: {
      enabled: true, // show the value labels for each bar
    },
    plotOptions: {
      bar: {
        borderRadius: 20, // set the bar radius to 20 pixels
        // columnWidth: "50%",
      },
    },
  };

  var seriesBarChart = [
    {
      name: "Verifications",
      data: Ydata,
    },
  ];

  useEffect(() => {
    // InsertData();
  }, []);
  return (
    <div
      style={{
        marginTop: "3%",
        background: "#fff",
        boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
        padding: "40px",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Verifications</span>
        <Box sx={{ minWidth: 120, borderRadius: "5px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filters</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Month"
              onChange={handleChange}
            >
              <MenuItem value={"yearly"}>Yearly</MenuItem>
              <MenuItem value={"monthly"}>Monthly</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <Box>
        <Chart
          options={optionsBarChart}
          series={seriesBarChart}
          type="bar"
          height="400"
        />
      </Box>
    </div>
  );
};

export default LineGraph;
