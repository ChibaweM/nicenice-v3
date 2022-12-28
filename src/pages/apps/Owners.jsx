import { Box, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "../../assets/axios";
import { Button, Typography, InputBase } from "@mui/material";
import { Add, RemoveRedEye } from "@mui/icons-material";

const Owners = () => {
  const GET_DRIVERS_URL = "/api/v1/admin/owners";
  const [drivers, setDrivers] = useState([]);
  axios.get(GET_DRIVERS_URL).then(({ data }) => {
    setDrivers(data);
  });

  const [loadId, setloadID] = useState({});
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 750,
    height: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleEdit = (e) => {
    e.preventDefault();
  };

  const captureEdit = (clickedDriver) => {
    setOpen(true);
    let filtered = drivers.filter((driver) => driver.id === clickedDriver.id);
    setloadID(filtered[0]);
  };

  const [loadedCredits, setLoadedcredits] = useState(0);

  const handleChange = (e) => {
    setLoadedcredits(...e.target.value);
  };

  function handleCredit() {
    handleClose();
    axios
      .put("/api/v1/admin/" + (loadId.id + 1) + "/load-credit", {
        query: loadedCredits,
        userId: loadId.id + 1,
      }) //retriving the response
      .then((res) => {
        return console.log(res.data);
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
        console.log(err);
      });
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "creditBalance",
      headerName: "Credit Balance",
      flex: 1,
    },
    {
      field: "approved",
      headerName: "Approved",
      flex: 1,
      renderCell: ({ row: { approved } }) => {
        return (
          <>
            <Box>
              {approved === true && (
                <Typography className="text-green-400">Approved</Typography>
              )}
              {approved === false && (
                <Typography className="text-red-600">Not Apporved</Typography>
              )}
            </Box>
          </>
        );
      },
    },
    {
      field: "reported",
      headerName: "Reported",
      flex: 1,
      renderCell: ({ row: { reported } }) => {
        return (
          <>
            <Box>
              {reported === true && (
                <Typography className="text-red-600">Reported</Typography>
              )}
              {reported === false && (
                <Typography className="text-green-400">Not Reported</Typography>
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
              <Button onClick={(e) => handleEdit(e)}>
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
                      <Typography>
                        User's Credit: {loadId.creditBalance}
                      </Typography>
                    </Box>
                    <Box>
                      <Box display="flex">
                        <Typography>Approve this driver?</Typography>
                        <Box
                          display="flex"
                          borderRadius="3px"
                          backgroundColor={"#green"}
                          marginTop="10px"
                          justifyContent="right"
                        >
                          <Button onClick={() => handleApprove()}>
                            <Typography color="#16161A">Yes</Typography>
                          </Button>
                        </Box>
                        <Box
                          display="flex"
                          borderRadius="3px"
                          backgroundColor={"#C117BC"}
                          marginTop="10px"
                          justifyContent="right"
                        >
                          <Button onClick={() => handleClose()}>
                            <Typography color="#16161A">No</Typography>
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box margin="30px"></Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>
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
                        <Box display="flex">
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
                    </Typography>
                    <Typography>
                      <Box>
                        <Box>
                          <Box>
                            <Typography>Delete User</Typography>
                          </Box>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Box
                            display="flex"
                            borderRadius="3px"
                            backgroundColor={"#C117BC"}
                            margin="10px"
                            justifyContent="right"
                          >
                            <Button onClick={() => handleCredit()}>
                              <Typography color="#16161A">Yes</Typography>
                            </Button>
                          </Box>
                          <Box
                            display="flex"
                            borderRadius="3px"
                            backgroundColor={"#16161A"}
                            margin="10px"
                            justifyContent="right"
                          >
                            <Button onClick={() => handleCredit()}>
                              <Typography color="#fff">No</Typography>
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
        <Header title="Owner" subtitle="Manage Owners" />

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
            {/*  <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
            Add Owner
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
        {drivers && (
          <DataGrid
            onRowClick={(e) => captureEdit(e)}
            rows={drivers}
            columns={columns}
          />
        )}
      </Box>
    </Box>
  );
};

export default Owners;
