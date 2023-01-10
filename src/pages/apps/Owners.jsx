import { Box, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "../../assets/axios";
import { Button, Typography, InputBase } from "@mui/material";
import { Add, Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import viewPDF from "../../assets/veiwPDF.pdf";

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
    width: 650,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const style1 = {
    backgroundColor: "#fff",

    /* Fixed position */
    position: "absolute",
    top: "50%",
    left: "50%",

    /* Take full size */
    width: 800,
    height: 200,

    /* Displayed on top of other elements */
    zIndex: 9999,

    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
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

  const handleDelete =()=>{
    handleClose();
    axios
      .post(`/api/v1/admin/${loadId.id}/delete-owner`) //retriving the response
      .then((res) => {
        return setDrivers(...res.data());
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
  }

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

  const handleApprove = () => {
    handleClose();
    axios
      .put(`/api/v1/admin/${loadId.id}/approve-driver`) //retriving the response
      .then((res) => {
        return setDrivers(...res.data());
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

  const [shown, setShown] = useState(false);

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
                <Typography className="text-red-600">Not Approved</Typography>
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
                  <Box
                    borderRadius="3px"
                    color={"#C117BC"}
                    marginTop="20px"
                    marginBottom="20px"
                  >
                    <Typography>Owner's Details</Typography>
                  </Box>
                  <Box className="grid grid-cols-2 sm:grid-cols-2 pt-0 w-full">
                    <Box className="flex flex-col justify-center">
                      <Box justifyContent="left" marginBottom="5px">
                        <Typography>
                          Phone number: {loadId.phoneNumber}
                        </Typography>
                        <Typography>
                          User's Credit: {loadId.creditBalance}
                        </Typography>
                      </Box>
                      <Box margin="20px"></Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography>
                          <Box marginBottom="30px">
                            <Box>
                              <Box>
                                <Typography>Add Credits</Typography>
                              </Box>
                              <Box
                                display="flex"
                                borderRadius="3px"
                                backgroundColor={"#E2E2E2"}
                                marginTop="10px"
                              >
                                <InputBase
                                  sx={{ ml: 2, flex: 1 }}
                                  size="medium"
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
                      </Box>
                    </Box>
                    <Box>
                      <Box className="flex flex-col justify-center">
                        <Box justifyContent="left" marginBottom="5px">
                          <Box>
                            <Typography>Owner's Documents</Typography>
                          </Box>
                        </Box>
                        <Box justifyContent="left">
                          <Button onClick={() => setShown(true)}>
                            View Documents
                          </Button>
                          <Modal
                            open={shown}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style1}>
                              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                                <Viewer fileUrl={viewPDF} />
                              </Worker>
                            </Box>
                          </Modal>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="right">
                    <Box>
                      <Button>
                        <Edit />
                      </Button>
                    </Box>
                    <Box>
                      <Button onClick={()=>handleDelete()}>
                        <Delete />
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
            onClick={() => handleAddModal()}
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
