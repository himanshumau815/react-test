import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link, useParams } from "react-router-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function Grid() {
  let { id } = useParams();
  const [data, setData] = React.useState([]);
  const containerStyle = React.useMemo(
    () => ({ width: "100%", height: "500px" }),
    []
  );
  const gridStyle = React.useMemo(
    () => ({ height: "100%", width: "100%" }),
    []
  );
  const [columnDefs, setColumnDefs] = React.useState([
    { field: "athlete", sortingOrder: ["asc", "desc"] },
    { field: "age", width: 90, sortingOrder: ["desc", "asc"] },
    { field: "country", sortingOrder: ["desc", "desc"] },
    { field: "year", sortingOrder: ["asc", "desc"] },
    { field: "date" },
    { field: "sport", sortingOrder: ["asc", "desc"] },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" }
  ]);
  React.useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        // console.log(res);
        let allData = res.filter((d) => d.sport == id);
        // console.log(allData);
        setData(allData);
      });
    // console.log(id);
  }, []);
  const defaultColDef = React.useMemo(() => {
    return {
      width: 170,
      sortable: true
    };
  }, []);
  const sortingOrder = React.useMemo(() => {
    return ["desc", "asc", null];
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Box style={{ color: "white" }}>Home</Box>
          </Link>
        </Toolbar>
      </AppBar>
      <Box mt={3}>
        <div style={containerStyle}>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              rowData={data}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              sortingOrder={sortingOrder}
            ></AgGridReact>
          </div>
        </div>
      </Box>
    </Box>
  );
}
