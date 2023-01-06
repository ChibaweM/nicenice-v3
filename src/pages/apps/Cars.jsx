import { Box, Button, Modal, Typography, InputBase } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Add, Block, RemoveRedEye } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "../../assets/axios";

const Cars = () => {
  const GET_DRIVERS_URL = "/api/v1/dashboard/car-table";
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios.get(GET_DRIVERS_URL).then(({ data }) => {
      setDrivers(data);
    });
  });
  const [loadId, setloadID] = useState({});
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
      field: "year",
      headerName: "Year",
      flex: 1,
    },
    {
      field: "city",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "weeklyTarget",
      headerName: "Weekly Target",
      flex: 1,
    },
    {
      field: "depositRequired",
      headerName: "Deposit",
      renderCell: ({ row: { depositRequired } }) => {
        return (
          <>
            <Box>
              {depositRequired === true && (
                <Typography className="text-green-400">Yes</Typography>
              )}
              {depositRequired === false && (
                <Typography className="text-red-600">No</Typography>
              )}
            </Box>
          </>
        );
      },
    },
    {
      field: "activeOnHailingPlatforms",
      headerName: "Active",
      renderCell: ({ row: { activeOnHailingPlatforms } }) => {
        return (
          <>
            <Box>
              {activeOnHailingPlatforms === true && (
                <Typography className="text-green-400">Active</Typography>
              )}
              {activeOnHailingPlatforms === false && (
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
                      color={"#C117BC"}
                      marginTop="20px"
                      marginBottom="20px"
                    >
                      <Typography>Owner's Details</Typography>
                    </Box>
                  </Box>
                  <Box className="grid grid-cols-1 sm:grid-cols-2 pt-0 w-full">
                    <Box justifyContent="left" marginBottom="5px">
                      <Typography>
                        Phone number: {loadId.phoneNumber}
                      </Typography>
                    </Box>
                    <Box>
                      <Box>
                        <Box>
                          <Typography>Add Credit to user</Typography>
                        </Box>
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
                      </Box>
                      <Box display="flex" justifyContent="right">
                        <Box
                          display="flex"
                          borderRadius="3px"
                          backgroundColor={"#C117BC"}
                          marginTop="20px"
                          justifyContent="right"
                        >
                          <Button onClick={() => handleCredit()}>
                            <Typography color="#16161A">Add</Typography>
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Typography>
                      <Box justifyContent="left" marginBottom="5px">
                        <Typography>
                          Phone number: {loadId.phoneNumber}
                        </Typography>
                        <Typography>
                          User's Credit: {loadId.creditBalance}
                        </Typography>
                      </Box>
                      <Box>
                        <Box>
                          <Box>
                            <Typography>Add Credit to user</Typography>
                          </Box>
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
                        </Box>
                        <Box display="flex" justifyContent="right">
                          <Box
                            display="flex"
                            borderRadius="3px"
                            backgroundColor={"#C117BC"}
                            margin="20px"
                            justifyContent="right"
                          >
                            <Button onClick={() => handleCredit()}>
                              <Typography color="#16161A">Add</Typography>
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Typography>
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
        <Box>
          <Header title="Cars" subtitle="Manage Cars" />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Button
              sx={{
                fontSize: "14px",
                margin: "5px",
                fontWeight: "bold",
                padding: "10px 20px",
                background: "#E2E2E2",
                color: "#C117BC",
              }}
              onClick={()=>handleAddModal()}
            >
              <Add />
              Add Car
            </Button>
          </Box>
          <Box>
            <Button
              sx={{
                margin: "5px",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                background: "#E2E2E2",
                color: "#C117BC",
              }}
              onClick={()=>handleBlockModal()}
            >
              <Block/>
              Block Car
            </Button>
          </Box>
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
        <DataGrid rows={drivers} columns={columns} />
      </Box>
    </Box>
  );
};

export default Cars;
