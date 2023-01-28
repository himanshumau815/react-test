import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

export default function Home() {
  const [age, setAge] = React.useState("");
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    // console.log(event.target.value);
    setAge(event.target.value);
  };
  const handleSubmit = () => {
    if (age) {
      navigate(`/grid/${age}`);
    }
  };
  return (
    <>
      <FormControl style={{ width: "50%" }} size="small">
        <InputLabel id="demo-simple-select-label">Sport Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Sport Name"
          onChange={handleChange}
        >
          <MenuItem value="WaterPolo">WaterPolo</MenuItem>
          <MenuItem value="Alpine Skiing">Alpine Skiing</MenuItem>
          <MenuItem value="Canoeing">Canoeing</MenuItem>
          <MenuItem value="Swimming">Swimming</MenuItem>
          <MenuItem value="Short-Track Speed Skating">
            Short-Track Speed Skating
          </MenuItem>
        </Select>
      </FormControl>
      {/* <Link to="/grid/123"> */}
      <Button
        variant="contained"
        onClick={() => handleSubmit()}
        style={{ marginLeft: "10px" }}
      >
        Submit
      </Button>
      {/* </Link> */}
      {/* <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact rowData={rowData}>
          <AgGridColumn field="make"></AgGridColumn>
          <AgGridColumn field="model"></AgGridColumn>
          <AgGridColumn field="price"></AgGridColumn>
        </AgGridReact>
      </div> */}
    </>
  );
}
