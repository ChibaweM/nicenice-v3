import React from "react";
import logo from "../../assets/NiceNiceLogo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("/")
  const [toggle, setToggle] = useState(false);

  const navLinks = [
    {
      id: "/",
      title: "Home",
    },
    {
      id: "login",
      title: "Login",
    },
  ];

  const navigate = useNavigate()

  const handleRoute=(id)=>{
    setActive(id);
    navigate(id);
  }

  return (
    <nav className="w-full flex justify-between items-center navbar">
      <img src={logo} alt="hoobank" width="124px" height="32px" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px]} ${
              active === nav.id ? "text-pinkVariant" : "text-dimWhite"
            } ${
              index === navLinks.length - 1 ? "mr-0" : "mr-5"
            }`}
            onClick={() => handleRoute(nav.id)}
          >
            <p>{nav.title}</p>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          /* src={toggle ? close : menu} */
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-secondary absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.id ? "text-pink-600" : "text-white"
                }  ${
                  index === navLinks.length - 1 ? "mb-0" : "mb-4"
                }`}
                onClick={() => handleRoute(nav.id)}
              >
                <p>{nav.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
