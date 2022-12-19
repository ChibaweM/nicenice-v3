import { useState } from "react";
/* import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar"; */
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import imageLogo from "../assets/NiceNiceLogo.png";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  CarRental,
  VerifiedUser,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import {Routing} from "../Routing"

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <nav
      active={selected === title}
      style={{
        color: "#16161A",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </nav>
  );
};

const Sidebars = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "#E2E2E2 !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#C117BC !important",
        },
        "& .pro-menu-item.active": {
          color: "#C117BC !important",
        },
      }}
    >
      <div collapsed={isCollapsed}>
        <div iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "0px 0 0px 0",
              color: "#16161A",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                paddingTop="0px"
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="125px"
                    height="90px"
                    src={imageLogo}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography variant="h7" color={"#16161A"}>
                  info@niceniceglobal.com
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to={Routing.Dashboard.path}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={"#16161A"}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Drivers"
              to={Routing.Drivers.path}
              icon={<VerifiedUser />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Owners"
              to="/owners"
              icon={<VerifiedUserOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Cars"
              to="/cars"
              icon={<CarRental />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Transactions"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={"#16161A"}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Help
            </Typography>
            <Item
              title="Settings"
              to="/settings"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default Sidebars;
