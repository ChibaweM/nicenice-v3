import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "../../assets/axios";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/Vehicle1.png";
import image3 from "../../assets/googlePlay.png";
import useAuth from "../../hooks/useAuth";

const LOGIN_URL = "/api/v1/auth/login";

const Login = () => {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = (e) => {
    //function to send data to the database
    e.preventDefault();
    axios.post(LOGIN_URL,{
      email: user,
      password: pwd,
    }).then((res)=>{
      const roles = res?.data?.roles;
      setAuth({ user, pwd, roles });
      setUser('');
      setPwd('');
      navigate("/dashboard");
    }).catch((err)=>{
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 403) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else if (err.response?.status === 404) {
        setErrMsg("User Not found");
      } else {
        setErrMsg("Login Failed");
      }
    })
  };

  return (
    <section className="bg-primary w-full text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 pt-0 w-full">
        <div className="flex flex-col justify-center">
        <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={(e) => handleSubmit(e)} className="max-w-[400px] w-full mx-auto bg-white p-4">
            <h2 className="text-4xl font-bold text-center py-6">Emails Login</h2>
            <div className="flex flex-col py-2">
              <label>Username</label>
              <input
                type="text"
                id="user"
                ref={userRef}
                autoComplete="on"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                className="border rounded-md bg-gray-200 p-2"
              />
            </div>
            <div className="flex flex-col py-2">
              <label>Password</label>
              <input
                type="password"
                id="pwd"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                className="border rounded-md bg-gray-200 p-2"
              />
            </div>
            <button className="border rounded-md w-full my-5 py-2 bg-pinkVariant hover:bg-fuchsia-700 text-white">
              Sign In
            </button>
            {/* <div className="flex justify-between">
              <p className="flex items-center">
                <input className="mr-2" type="checkbox" /> Remember Me
              </p>
            </div> */}
          </form>
        </div>

        <div className="hidden sm:block py-10 mx-10">
          <img className="object-cover bg-center pr-12 mb-5" src={image1} alt="carImage.png" />
          <div className="text-center">
            <h2>Rent Weekly</h2>
            <h4>
              from <b>R1600.00</b>
            </h4>
          </div>
          <div className="text-center">
            <p>
              Find the best car available to start driving on the largest
              network of ehailing platform{" "}
            </p>
          </div>{" "}
          <div className="mx-40 my-5">
            <img height="70px" width="400px" src={image3} alt="download link" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
