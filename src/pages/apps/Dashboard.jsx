import { Box, Button, Typography } from "@mui/material";
/* import { mockTransactions } from "../../data/mockData"; */
/* import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
 */
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
/* import ProgressCircle from "../../components/ProgressCircle";
 */ import {
  DesktopMac,
  DriveEtaSharp,
  Person,
  Person2,
  Shop,
  Smartphone,
  VerifiedUser,
} from "@mui/icons-material";
import { useEffect } from "react";
import axios from "../../assets/axios";
import { useState } from "react";

const Dashboard = () => {
  const GET_DRIVERS_URL = "/api/v1/dashboard/overview";
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios.get(GET_DRIVERS_URL).then(({ data }) => {
      setDrivers(data);
    });
  });

  const GET_DRIVERS_URL1 = "/api/v1/dashboard/all-transactions";
  const [drivers1, setDrivers1] = useState([]);

  useEffect(() => {
    axios.get(GET_DRIVERS_URL1).then(({ data }) => {
      setDrivers1(data);
    });
  });

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />

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
            {/*  <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="35px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={"#F5F6F8"}
        >
          <StatBox
            title={drivers.newOwners}
            subtitle="New Owners"
            progress="0.75"
            increase="+14%"
            icon={<Person sx={{ fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={"#F5F6F8"}
        >
          <StatBox
            title={drivers.newDrivers}
            subtitle="New Drivers"
            progress="0.50"
            increase="+21%"
            icon={<DriveEtaSharp sx={{ fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={"#F5F6F8"}
        >
          <StatBox
            title={drivers.totalUsers}
            subtitle="Total Users"
            progress="0.30"
            increase="+5%"
            icon={<Person2 sx={{ fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={"#F5F6F8"}
        >
          <StatBox
            title={drivers.approvedOwners}
            subtitle="Approved Owners"
            progress="0.80"
            increase="+43%"
            icon={<VerifiedUser sx={{ fontSize: "26px" }} />}
          />
        </Box>

        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={"#F5F6F8"}
        >
          <StatBox
            title={drivers.approvedDrivers}
            subtitle="Approved Drivers"
            progress="0.80"
            increase="+43%"
            icon={<VerifiedUser sx={{ fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={"#F5F6F8"}
        >
          <StatBox
            title={drivers.niceNiceDeals}
            subtitle="Deals"
            progress="0.80"
            increase="+43%"
            icon={<Shop sx={{ fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={"#F5F6F8"}
        >
          <StatBox
            title={drivers.webUsers}
            subtitle="Active Website Users"
            progress="0.80"
            increase="+43%"
            icon={<DesktopMac sx={{ fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={"#F5F6F8"}
        >
          <StatBox
            title={drivers.mobileUsers}
            subtitle="Active Mobile Users"
            progress="0.80"
            increase="+43%"
            icon={<Smartphone sx={{ fontSize: "26px" }} />}
          />
        </Box>

        {/* ROW 3 */}
        <Box gridColumn="span 8" gridRow="span 2" overflow="auto">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid`}
            p="15px"
          >
            <Typography variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {drivers &&
            drivers1.map((trans, i) => (
              <Box
                key={`${trans.id}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid`}
                p="15px"
              >
                <Box>
                  <Typography>{trans.id}</Typography>
                </Box>
                <Box>
                  <Typography>{trans.transaction}</Typography>
                </Box>
                <Box p="5px 10px" text borderRadius="4px">
                  {trans.amount}
                </Box>
                <Box>{trans.dateTime}</Box>
              </Box>
            ))}
        </Box>

        {/* ROW 2 */}
        <Box gridColumn="span 4" gridRow="span 2" p="30px">
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            {/*  <ProgressCircle size="125" /> */}
            <Typography variant="h5" sx={{ mt: "15px" }} color={"#C117BC"}>
              {drivers.totalRevenue} Revenue Generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
