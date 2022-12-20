import { Box, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "../../assets/axios";
import { Button, Typography, InputBase } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { mockDataTeam } from "../../data/mockData";
import { Document, Page } from "react-pdf";

const Drivers = () => {
  const GET_DRIVERS_URL = "/api/v1/admin/drivers";
  const [drivers, setDrivers] = useState([]);
  axios.get(GET_DRIVERS_URL).then(({ data }) => {
    setDrivers(data);
  });

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const [loadId, setloadID] = useState({
    age: "",
    fullName: "",
    id: "",
    imageURL: "",
    location: "",
    numReferences: "",
    views: "",
  });
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
    e.preventDefault();
  };

  function captureEdit(clickedDriver) {
    setOpen(true);
    let filtered = mockDataTeam.filter(
      (driver) => driver.id === clickedDriver.id
    );

    setloadID(filtered[0].row);
  }

  const [loadedCredits, setLoadedcredits] = useState({});

  const handleChange = (e) => {
    setLoadedcredits(...e.target.value);
  };

  function handleCredit() {
    handleClose();
    axios
      .put(`/api/v1/admin/${loadId.id}/load-credit`, {
        query: loadedCredits,
      }) //retriving the response
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        /*  if (!err?.response) {
         setErrMsg('No Server Response');
     } else if (err.response?.status === 400) {
         setErrMsg('Missing Username or Password');
     } else if (err.response?.status === 401) {
         setErrMsg('Unauthorized');
     } else {
         setErrMsg('Login Failed');
     } */
        console.log(err);
      });
  }

  const columns = [
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "location",
      headerName: "City",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "platform",
      headerName: "Platform",
      flex: 1,
    },
    {
      field: "balance",
      headerName: "Credit Balance",
      flex: 1,
    },
    {
      field: "Credit",
      headerName: "Credit",
      renderCell: ({ row: { Status } }) => {
        return (
          <>
            <Box
              m="15px"
              display="flex"
              justifyContent="center"
              borderRadius="4px"
            >
              <Button>Load</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
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
                      <Button onClick={(id) => handleCredit(id)}>
                        <Typography color="#16161A">Add</Typography>
                      </Button>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="right">
                    <Box
                      display="flex"
                      borderRadius="3px"
                      backgroundColor={"#C117BC"}
                      marginTop="20px"
                    >
                     {/*  <Document
                        file=""
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page pageNumber={pageNumber} />
                      </Document> */}
                      <p>
                        Page {pageNumber} of {numPages}
                      </p>
                    </Box>
                  </Box>
                </Box>
              </Modal>
            </Box>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
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
      <Header title="Drivers" subtitle="Manage The Drivers" />
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
          rows={mockDataTeam}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Drivers;
