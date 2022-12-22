import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataCars } from "../../data/mockData";
import Header from "../../components/Header";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "../../assets/axios";

const Cars = () => {
  const GET_DRIVERS_URL = "/api/v1/admin/cars";
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios.get(GET_DRIVERS_URL).then(({ data }) => {
      setDrivers(data);
    });
  });

  const handleEdit = (e) => {
    e.preventdefault();
  };

  const columns = [
    {
      field: "make",
      headerName: "Make",
      flex: 1,
    },
    {
      field: "model",
      headerName: "Modal",
      flex: 1,
    },
    {
      field: "platform",
      headerName: "platform",
      flex: 1,
    },
    {
      field: "owner",
      headerName: "Owner",
      flex: 1,
    },
    {
      field: "totalCredits",
      headerName: "Credits",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { Status } }) => {
        return (
          <>
            <Box
              m="15px"
              display="flex"
              justifyContent="center"
              borderRadius="4px"
            >
              <Button onClick={(e) => handleEdit(e)}>
                <Edit />
              </Button>
            </Box>
            <Box display="flex" justifyContent="center" borderRadius="4px">
              <Button>
                <Delete />
              </Button>
            </Box>
          </>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Cars" subtitle="Manage Cars" />
        <Box>
          <Button
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              background: "#E2E2E2",
              color: "#C117BC",
            }}
          >
            <Add/>
            {/*  <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
            Add Car
          </Button>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            backgroundColor: "#F5F6F8",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
            backgroundColor: "#F5F6F8",
          },
          "& .MuiDataGrid-virtualScroller": {},
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
          "& .MuiCheckbox-root": {
            color: `#16161A !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataCars} columns={columns} />
      </Box>
    </Box>
  );
};

export default Cars;
