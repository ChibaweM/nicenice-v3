import { Box, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "../../assets/axios";
import { Button, Typography, InputBase } from "@mui/material";
import { Add, RemoveRedEye } from "@mui/icons-material";

const Drivers = () => {
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const GET_DRIVERS_URL = "/api/v1/dashboard/driver-table";
  const [drivers, setDrivers] = useState([]);
  axios.get(GET_DRIVERS_URL).then(({ data }) => {
    setDrivers(data);
  });

  const [loadId, setloadID] = useState({});
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const captureEdit = (clickedDriver) => {
    setOpen(true);
    let filtered = drivers.filter((driver) => driver.id === clickedDriver.id);
    setloadID(filtered[0]);
  };

  const [loadedCredits, setLoadedcredits] = useState({});
  const handleChange = (e) => {
    setLoadedcredits(...e.target.value);
  };

  const handleCredit = () => {
    handleClose();
    axios
      .put(`/api/v1/admin/${loadId.id}/load-credit`, {
        query: loadedCredits,
      }) //retriving the response
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        if (!err?.response) {
          console.log("No Server Response");
        } else if (err.response?.status === 400) {
          console.log("Missing Username or Password");
        } else if (err.response?.status === 401) {
          console.log("Unauthorized");
        } else {
          console.log("Login Failed");
        }
      });
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "creditBalance",
      headerName: "Credit Balance",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Active",
      renderCell: ({ row: { active } }) => {
        return (
          <>
            <Box>
              {active === true && (
                <Typography className="text-green-400">active</Typography>
              )}
              {active === false && (
                <Typography className="text-red-600">Inactive</Typography>
              )}
            </Box>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: () => {
        return (
          <>
            <Box
              m="15px"
              display="flex"
              justifyContent="center"
              borderRadius="4px"
              className="hover:bg-pinkVariant"
            >
              <Button>
                <RemoveRedEye className="text-black" />
              </Button>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Box display="flex">
                    <Box
                      display="flex"
                      borderRadius="3px"
                      backgroundColor={"#C117BC"}
                      marginTop="20px"
                    >
                      <Typography>Owner Documents</Typography>
                    </Box>
                  </Box>
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    marginBottom="20px"
                  >
                    Driver Details
                  </Typography>

                  <Typography>
                    Please add an amount to credit the user
                  </Typography>
                  <Box
                    display="flex"
                    borderRadius="3px"
                    backgroundColor={"#E2E2E2"}
                    marginTop="10px"
                  >
                    <InputBase
                      sx={{ ml: 2, flex: 1 }}
                      placeholder="Add Credit amount"
                      onChange={(e) => handleChange(e)}
                    />
                  </Box>
                  <Box display="flex" justifyContent="right">
                    <Box
                      display="flex"
                      borderRadius="3px"
                      backgroundColor={"#C117BC"}
                      marginTop="20px"
                      justifyContent="right"
                    >
                      <Button onClick={handleCredit}>
                        <Typography color="#16161A">Add</Typography>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Modal>
            </Box>
          </>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Drivers" subtitle="Manage The Drivers" />
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
            <Add />
            Add Driver
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
            color: "#16161A",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F5F6F8",

            borderBottom: "none",
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
        <DataGrid
          onRowClick={(e) => captureEdit(e)}
          rows={drivers}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Drivers;
