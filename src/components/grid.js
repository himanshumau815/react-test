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
    () => ({ width: "100%", height: "750px" }),
    []
  );
  const gridStyle = React.useMemo(
    () => ({ height: "100%", width: "100%" }),
    []
  );
  const [columnDefs, setColumnDefs] = React.useState([
    { field: "athlete",width: 190, sortingOrder: ["asc", "desc"] },
    { field: "age", width: 190,type: 'numberColumn', sortingOrder: ["desc", "asc"] },
    { field: "country",width: 190, sortingOrder: ["desc", "desc"] },
    { field: "year",width: 190,type: 'numberColumn', sortingOrder: ["asc", "desc"] },
    { field: "date", width: 190,type: ['dateColumn', 'nonEditableColumn']},
    { field: "sport",width: 190, sortingOrder: ["asc", "desc"] },
    { field: "gold",width: 190, },
    { field: "silver",width: 190, },
    { field: "bronze",width: 190, },
    { field: "total",width: 170, }
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
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
    };
  }, []);
  const sortingOrder = React.useMemo(() => {
    return ["desc", "asc", null];
  }, []);

  const columnTypes = React.useMemo(() => {
    return {
      numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
      medalColumn: { width: 100, columnGroupShow: 'open', filter: false },
      nonEditableColumn: { editable: false },
      dateColumn: {
        // specify we want to use the date filter
        filter: 'agDateColumnFilter',
        // add extra parameters for the date filter
        filterParams: {
          // provide comparator function
          comparator: (filterLocalDateAtMidnight, cellValue) => {
            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            const dateParts = cellValue.split('/');
            const day = Number(dateParts[0]);
            const month = Number(dateParts[1]) - 1;
            const year = Number(dateParts[2]);
            const cellDate = new Date(year, month, day);
            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          },
        },
      },
    };
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
              columnTypes={columnTypes}
              animateRows={true}
              sortingOrder={sortingOrder}
            ></AgGridReact>
          </div>
        </div>
      </Box>
    </Box>
  );
}
