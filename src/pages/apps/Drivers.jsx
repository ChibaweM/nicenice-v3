import { Box, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "../../assets/axios";
import { Button, Typography } from "@mui/material";
import {
  Add,
  Block,
  Delete,
  Edit,
  FileDownload,
  RemoveRedEye,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import viewPDF from "../../assets/veiwPDF.pdf";
import { InputBase } from "@mui/material";
import imageUser from "../../assets/istockphoto.jpg";

const Drivers = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 520,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const style1 = {
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

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const style3 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 200,
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

  const [openAdd, setOpenAdd] = useState(false);
  const handleCloseAdd = () => setOpenAdd(false);

  const [openSuspend, setSuspendModal] = useState(false);
  const handleCloseSuspend = () => setSuspendModal(false);

  const [openDelete, setDeleteModal] = useState(false);
  const handleCloseDelete = () => setDeleteModal(false);

  const captureEdit = (clickedDriver) => {
    setOpen(true);
    let filtered = drivers.filter((driver) => driver.id === clickedDriver.id);
    setloadID(filtered[0]);
  };

  const [loadedCredits, setLoadedcredits] = useState(0);
  function handleChange(e) {
    setLoadedcredits(e.target.value);
  }

  const [errMsg, setErrMsg] = useState("");
  const handleCredit = () => {
    handleClose();
    axios
      .put(
        "/api/v1/admin/" +
          loadId.id +
          "/load-owner-credit?query=" +
          parseInt(loadedCredits)
      ) //retriving the response
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        setErrMsg(err);
      });
  };

  const [editDriver, setEditdriver] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
  });

  function handleEditChange(e) {
    const newDriver = { ...editDriver };
    newDriver[e.target.name] = e.target.value;
    setEditdriver(newDriver);
  }

  const handleEditClick = () => {
    handleClose();
    axios
      .put("/api/v1/admin/" + loadId.id + "/edit-driver", {
        fullName: editDriver.fullName,
        phoneNumber: editDriver.phoneNumber,
        location: editDriver.location,
        creditBalance: loadId.creditBalance,
      }) //retriving the response
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

  const handleSuspend = ()=>{
    handleCloseSuspend();
    axios
      .post(`/api/v1/admin/${loadId.id}/suspend-driver`) //retriving the response
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

  const handleDelete = () => {
    handleClose();
    axios
      .post(`/api/v1/admin/${loadId.id}/delete-driver`) //retriving the response
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

  const columns = [
    {
      /* Fix imaages here Now!!!!! */
      field: "image",
      headerName: "Image",
      renderCell: ({ row: { image } }) => {
        return (
          <>
            <Box>
              <img width="40px" src={imageUser} alt="image" />
            </Box>
          </>
        );
      },
    },
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
                {loadId.active ? (
                  <Box sx={style}>
                    <Box
                      borderRadius="3px"
                      color={"#C117BC"}
                      marginBottom="5px"
                    >
                      <Typography fontSize="20px">
                        <b>Driver's Details</b>
                      </Typography>
                    </Box>
                    <Box className="grid grid-cols-2 sm:grid-cols-2 pt-0 w-full">
                      <Box className="flex flex-col justify-center">
                        <Box justifyContent="left" marginBottom="5px">
                          <img
                            width="100px"
                            src={imageUser}
                            alt="person's image"
                          />
                          <Typography>Name: {loadId.fullName}</Typography>
                          <Typography>Location: {loadId.city}</Typography>
                          <Typography>
                            Phone Number: {loadId.phoneNumber}
                          </Typography>
                          <Typography>
                            Driver Credit: {loadId.creditBalance}
                          </Typography>
                        </Box>
                        <Box margin="20px"></Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography>
                            <Box marginBottom="30px">
                              <Box>
                                <Box>
                                  <Typography>Add Credit</Typography>
                                </Box>
                                <Box
                                  display="flex"
                                  borderRadius="3px"
                                  backgroundColor={"#E2E2E2"}
                                  marginTop="10px"
                                >
                                  <InputBase
                                    sx={{ ml: 2, flex: 1 }}
                                    type="number"
                                    size="medium"
                                    placeholder="Amount to Credit"
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
                                    <Typography color="#fff">Add</Typography>
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Box className="flex flex-col justify-center">
                          <Box justifyContent="left" marginBottom="1px">
                            <form
                              onSubmit={(e) => handleEditClick(e)}
                              className="max-w-[400px] w-full mx-auto bg-white p-4"
                            >
                              <Box>
                                <Typography>Update Driver</Typography>
                              </Box>
                              <div className="flex flex-col py-2">
                                <label>Name</label>
                                <input
                                  type="text"
                                  autoComplete="on"
                                  onChange={(e) => handleEditChange(e)}
                                  value={editDriver.fullName}
                                  required
                                  name="fullName"
                                  className="border rounded-md bg-gray-200 p-1"
                                />
                              </div>
                              <div className="flex flex-col py-2">
                                <label>Location</label>
                                <input
                                  value={editDriver.location}
                                  name="location"
                                  type="text"
                                  autoComplete="off"
                                  onChange={(e) => handleEditChange(e)}
                                  required
                                  className="border rounded-md bg-gray-200 p-1"
                                />
                              </div>
                              <div className="flex flex-col py-2">
                                <label>Phone Number</label>
                                <input
                                  value={editDriver.phoneNumber}
                                  name="phoneNumber"
                                  type="text"
                                  autoComplete="on"
                                  onChange={(e) => handleEditChange(e)}
                                  required
                                  className="border rounded-md bg-gray-200 p-1"
                                />
                              </div>
                              <div className="flex flex-col py-2">
                                <button className="border rounded-md w-full my-5 p-1 bg-pinkVariant hover:bg-fuchsia-700 text-white">
                                  EDIT
                                </button>
                              </div>
                            </form>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box display="flex" justifyContent="right">
                      <Box>
                        <Button onClick={() => setSuspendModal(true)}>
                          <Block />
                        </Button>
                        <Modal
                          open={openSuspend}
                          onClose={handleCloseSuspend}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style3}>
                            <Box>
                              <Typography fontSize="20px">
                                <b>Suspend Driver</b>
                              </Typography>
                            </Box>
                            <Box>
                              <Typography>
                                Are you sure you want to Suspend{" "}
                                {loadId.fullName}
                              </Typography>
                            </Box>
                            <Box className="content-center">
                              <Box>
                                <button onClick={()=>handleSuspend()} className="border rounded-md m-5 p-2 bg-red-600 hover:bg-red-700 text-white">
                                  Yes
                                </button>
                                <button onClick={()=>handleCloseSuspend()} className="border rounded-md m-5 p-2 bg-black hover:bg-gray-700 text-white">
                                  No
                                </button>
                              </Box>
                            </Box>
                          </Box>
                        </Modal>
                      </Box>
                      <Box>
                        <Button onClick={() => setDeleteModal(true)}>
                          <Delete />
                        </Button>
                        <Modal
                          open={openDelete}
                          onClose={handleCloseDelete}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style3}>
                            <Box>
                              <Typography fontSize="20px">
                                <b>Delete Driver</b>
                              </Typography>
                            </Box>
                            <Box>
                              <Typography>
                                Are you sure you want to delete{" "}
                                {loadId.fullName}
                              </Typography>
                            </Box>
                            <Box display="flex" justify-content="left" className="content-center">
                              <Box>
                                <button onClick={()=>handleDelete()} className="border rounded-md m-5 p-2 bg-red-600 hover:bg-red-700 text-white">
                                  Yes
                                </button>
                                <button onClick={()=>handleCloseDelete()} className="border rounded-md m-5 p-2 bg-black hover:bg-gray-700 text-white">
                                  No
                                </button>
                              </Box>
                            </Box>
                          </Box>
                        </Modal>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={style}>
                    <Box
                      borderRadius="3px"
                      color={"#C117BC"}
                      marginTop="20px"
                      marginBottom="20px"
                    >
                      <Typography>Driver's Documents</Typography>
                    </Box>
                    <Box className="grid grid-cols-2 sm:grid-cols-2 pt-0 w-full">
                      <Box className="flex flex-col justify-center">
                        <Box justifyContent="left" marginBottom="1px">
                          <Typography>Documents Uploaded: 5</Typography>
                          {drivers &&
                            drivers.map((trans, i) => (
                              <Box
                                key={`${trans.id}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`1px`}
                              >
                                <Box>
                                  <Typography>{trans.id}</Typography>
                                </Box>
                                <Box>
                                  <Typography>{trans.fullName}</Typography>
                                </Box>
                                <Button onClick={() => setShown(true)}>
                                  <RemoveRedEyeOutlined />
                                </Button>
                              </Box>
                            ))}
                        </Box>
                        <Box>
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
                      <Box margin="30px">
                        <Box>
                          <Box>
                            <Typography>Approve Driver</Typography>
                          </Box>
                        </Box>
                        <Box display="flex" justifyContent="left">
                          <Box
                            display="flex"
                            borderRadius="3px"
                            backgroundColor={"#C117BC"}
                            marginTop="20px"
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
                            marginTop="20px"
                            marginLeft="20px"
                            justifyContent="right"
                          >
                            <Button onClick={() => handleCredit()}>
                              <Typography color="#fff">No</Typography>
                            </Button>
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
                        <Button onClick={() => handleDelete()}>
                          <Delete />
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                )}
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
        <Header title="Drivers" subtitle="Manage The Drivers" />
        </Box>
        <Box display="flex" justifyContent="space-between">
        <Box>
          <Button
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin:"5px",
              background: "#E2E2E2",
              color: "#C117BC",
            }}
            onClick={() => setOpenAdd(true)}
          >
            <Add />
            Add Driver
          </Button>
          <Modal
            open={openAdd}
            onClose={handleCloseAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style2}>
              <form
                onSubmit={(e) => handleEditClick(e)}
                className="max-w-[400px] w-full mx-auto bg-white p-4"
              >
                <Box>
                  <Typography>Add New Driver</Typography>
                </Box>
                <div className="flex flex-col py-2">
                  <label>Name</label>
                  <input
                    type="text"
                    autoComplete="on"
                    onChange={(e) => handleEditChange(e)}
                    value={editDriver.fullName}
                    required
                    name="fullName"
                    className="border rounded-md bg-gray-200 p-1"
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label>Name</label>
                  <input
                    type="text"
                    autoComplete="on"
                    onChange={(e) => handleEditChange(e)}
                    value={editDriver.fullName}
                    required
                    name="fullName"
                    className="border rounded-md bg-gray-200 p-1"
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label>Name</label>
                  <input
                    type="text"
                    autoComplete="on"
                    onChange={(e) => handleEditChange(e)}
                    value={editDriver.fullName}
                    required
                    name="fullName"
                    className="border rounded-md bg-gray-200 p-1"
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label>Location</label>
                  <input
                    value={editDriver.location}
                    name="location"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => handleEditChange(e)}
                    required
                    className="border rounded-md bg-gray-200 p-1"
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label>Phone Number</label>
                  <input
                    value={editDriver.phoneNumber}
                    name="phoneNumber"
                    type="text"
                    autoComplete="on"
                    onChange={(e) => handleEditChange(e)}
                    required
                    className="border rounded-md bg-gray-200 p-1"
                  />
                </div>
                <div className="flex flex-col py-2">
                  <button className="border rounded-md w-full my-5 p-1 bg-pinkVariant hover:bg-fuchsia-700 text-white">
                    EDIT
                  </button>
                </div>
              </form>
            </Box>
          </Modal>
        </Box>
        <Box>
          <Button
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              background: "#E2E2E2",
              margin: "5px",
              color: "#C117BC",
            }}
            onClick={() => setOpenAdd(true)}
          >
            <FileDownload />
            Export
          </Button>
        </Box>
      </Box>
      </Box>
      <Box>
        
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
