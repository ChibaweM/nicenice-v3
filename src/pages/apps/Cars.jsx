import { Box, Button, Modal, Typography, InputBase } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import {
  Add,
  Block,
  Delete,
  Edit,
  RemoveRedEye,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "../../assets/axios";
import imageUser from "../../assets/istockphoto.jpg";

const Cars = () => {
  const GET_DRIVERS_URL = "/api/v1/dashboard/car-table";
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios.get(GET_DRIVERS_URL).then(({ data }) => {
      setDrivers(data);
    });
  });

  const [shown, setShown] = useState(false);
  const [errMsg, setErrMsg] = useState("");
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 370,
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

  const style5 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [editDriver, setEditdriver] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
  });

  const handleEdit = (e) => {
    e.preventdefault();
  };

  const handleApprove = () => {
    handleClose();
    axios
      .put(`/api/v1/admin/${loadId.id}/approve-driver`) //retriving the response
      .then((res) => {
        return setDrivers(...res.data());
      })
      .catch((err) => {
        setErrMsg(err);
      });
  };

  const handleSuspend = () => {
    handleCloseSuspend();
    axios
      .post(`/api/v1/admin/${loadId.id}/suspend-driver`) //retriving the response
      .then((res) => {
        return setDrivers(...res.data());
      })
      .catch((err) => {
        setErrMsg(err);
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
      field: "make",
      headerName: "Make",
      flex: 1,
    },
    {
      field: "model",
      headerName: "Model",
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
                {loadId.activeOnHailingPlatforms ? (
                  <Box sx={style}>
                    <Box
                      borderRadius="3px"
                      color={"#C117BC"}
                      marginBottom="5px"
                    >
                      <Typography fontSize="20px">
                        <b>Car's Details</b>
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
                          <Typography>Modal: {loadId.model}</Typography>
                          <Typography>Make: {loadId.make}</Typography>
                          <Typography>Location: {loadId.city}</Typography>
                          <Typography>
                            Weekly Target: {loadId.weeklyTarget}
                          </Typography>
                        </Box>
                        <Box margin="20px"></Box>
                      </Box>
                      <Box>
                        <Box className="flex flex-col justify-center">
                          <Box justifyContent="left" marginBottom="1px">
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
                                </Box>
                              </Typography>
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
                                <button
                                  onClick={() => handleSuspend()}
                                  className="border rounded-md m-5 p-2 bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => handleCloseSuspend()}
                                  className="border rounded-md m-5 p-2 bg-black hover:bg-gray-700 text-white"
                                >
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
                            <Box
                              display="flex"
                              justify-content="left"
                              className="content-center"
                            >
                              <Box>
                                <button
                                  onClick={() => handleDelete()}
                                  className="border rounded-md m-5 p-2 bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => handleCloseDelete()}
                                  className="border rounded-md m-5 p-2 bg-black hover:bg-gray-700 text-white"
                                >
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
                  <Box sx={style5}>
                    <Box
                      borderRadius="3px"
                      color={"#C117BC"}
                      marginTop="20px"
                      marginBottom="20px"
                    >
                      <Typography>Car's Documents</Typography>
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
                                  <Typography>Document {trans.id}</Typography>
                                </Box>
                                <Box>
                                  <Typography>{trans.Modal}</Typography>
                                </Box>
                                <Button onClick={() => setShown(true)}>
                                  <Typography>View</Typography>
                                </Button>
                              </Box>
                            ))}
                        </Box>
                        <Box></Box>
                      </Box>
                      <Box display="flex" margin="30px" justifyContent="right">
                        <Box>
                          <Box>
                            <Typography>Approve Car</Typography>
                          </Box>
                        </Box>
                        <Box display="flex">
                          <Box
                            display="flex"
                            borderRadius="2px"
                            backgroundColor={"#C117BC"}
                            height="30px"
                            margin="10px"
                            justifyContent="right"
                          >
                            <Button onClick={() => handleCredit()}>
                              <Typography color="#16161A">Yes</Typography>
                            </Button>
                          </Box>
                          <Box
                            display="flex"
                            borderRadius="2px"
                            backgroundColor={"#16161A"}
                            margin="10px"
                            height="30px"
                            justifyContent="right"
                          >
                            <Button onClick={() => handleCredit()}>
                              <Typography color="#fff">No</Typography>
                            </Button>
                          </Box>
                        </Box>
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
              onClick={() => handleAddModal()}
            >
              <Add />
              Add Cars
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
                    <label>First Name</label>
                    <input
                      type="text"
                      autoComplete="on"
                      required
                      name="firstName"
                      className="border rounded-md bg-gray-200 p-1"
                      placeholder="Enter First Name"
                      onChange={(e) => handleEditChange(e)}
                    />
                  </div>
                  <div className="flex flex-col py-2">
                    <label>Last Name</label>
                    <input
                      type="text"
                      autoComplete="on"
                      onChange={(e) => handleEditChange(e)}
                      required
                      name="lastName"
                      placeholder="Enter Last Name"

                      className="border rounded-md bg-gray-200 p-1"
                    />
                  </div>
                  <div className="flex flex-col py-2">
                    <label>Email</label>
                    <input
                      type="text"
                      autoComplete="on"
                      onChange={(e) => handleEditChange(e)}
                      required
                      placeholder="Enter Email"

                      name="email"
                      className="border rounded-md bg-gray-200 p-1"
                    />
                  </div>
                  <div className="flex flex-col py-2">
                    <label>Location</label>
                    <input
                      name="location"
                      type="text"
                      autoComplete="off"
                      onChange={(e) => handleEditChange(e)}
                      required
                      placeholder="Enter Location"
                      className="border rounded-md bg-gray-200 p-1"
                    />
                  </div>
                  <div className="flex flex-col py-2">
                    <label>Phone Number</label>
                    <input
                      name="phoneNumber"
                      type="text"
                      autoComplete="on"
                      onChange={(e) => handleEditChange(e)}
                      required
                      placeholder="Enter Phone Number"
                      className="border rounded-md bg-gray-200 p-1"
                    />
                  </div>
                  <div className="flex flex-col py-2">
                    <button className="border rounded-md w-full my-5 p-1 bg-pinkVariant hover:bg-fuchsia-700 text-white">
                      Add New
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>
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
              onClick={() => handleBlockModal()}
            >
              <Block />
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
        <DataGrid
          onRowClick={(e) => captureEdit(e)}
          rows={drivers}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Cars;
