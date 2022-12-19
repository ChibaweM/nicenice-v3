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

  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Drivers", src: "Chat",gap: true },
    { title: "Owners", src: "User" },
    { title: "Cars", src: "Calendar" },
    { title: "Invoices", src: "Search",gap: true },
    { title: "Settings", src: "Chart" },
  ];

  return (
    <div
    className={` ${
      open ? "w-72" : "w-20 "
    } bg-gray-100 h-screen p-5  pt-8 relative duration-300`}
  >
    <img
      src={imageLogo}
      className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
       border-2 rounded-full  ${!open && "rotate-180"}`}
      onClick={() => setOpen(!open)}
    />
    <div className="flex gap-x-4 items-center">
      <img
        src={imageLogo}
        className={`cursor-pointer px-10 duration-500 ${
          open
        }`}
      />
    </div>
    <ul className="pt-6">
      {Menus.map((Menu, index) => (
        <li
          key={index}
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-pink-100 text-sm items-center gap-x-4 
          ${Menu.gap ? "mt-9" : "mt-2"} ${
            index === 0 && "bg-light-white"
          } `}
        >
          <img src={`./src/assets/${Menu.src}.png`} />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            {Menu.title}
          </span>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Sidebars;
