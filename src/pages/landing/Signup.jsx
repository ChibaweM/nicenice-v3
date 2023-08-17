import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "../../assets/axios";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/photo-1449965408869-eaa3f722e40d.jpg";
import image3 from "../../assets/googlePlay.png";
import useAuth from "../../hooks/useAuth";

const SIGNUP_URL = "/api/v1/auth/signup";



const Signup = () => {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [surname, setName] = useState("");
  const [emailad, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCPwd] = useState("");
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
    navigate("/dashboard");
    axios
      .post(SIGNUP_URL, {
        email: user,
        password: pwd,
      })
      .then((res) => {
        const roles = res?.data?.roles;
        setAuth({ user, emailad, pwd, roles });
        setUser("");
        setEmail("");
        setPwd("");
      })
      .catch((err) => {
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
      });
  };

  return (
    <section className="bg-primary w-full text-black">
      <div class="form_container">
        <div className="grid grid-cols-1 sm:grid-cols-2 pt-0 w-full">
          <div className="form signup_form">
            <div className="flex flex-col justify-center">
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="max-w-[400px] w-full mx-auto bg-white p-4"
              >
                <h2 className="text-4xl font-bold text-center py-6">Signup</h2>

                <div className="flex flex-col py-2">
                  <label>Name</label>
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
                  <label>Surname</label>
                  <input
                    type="text"
                    id="name"
                    ref={userRef}
                    autoComplete="on"
                    onChange={(e) => setName(e.target.value)}
                    value={surname}
                    required
                    className="border rounded-md bg-gray-200 p-2"
                  />
                </div>

                <div className="flex flex-col py-2">
                  <label>Email</label>
                  <input
                    type="email"
                    id="email"
                    ref={userRef}
                    autoComplete="on"
                    onChange={(e) => setEmail(e.target.value)}
                    value={emailad}
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

                <div className="flex flex-col py-2">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    id="cpwd"
                    autoComplete="off"
                    onChange={(e) => setCPwd(e.target.value)}
                    value={cpwd}
                    required
                    className="border rounded-md bg-gray-200 p-2"
                  />
                </div>

                <button
                  className="border rounded-md w-full my-5 py-2 bg-pinkVariant hover:bg-fuchsia-700 text-white"
                  id="loginBtn"
                  onClick="login()"
                >
                  Sign up
                </button>

                <div class>
                  <p>
                    Have an account?{" "}
                    <a href="/Login" onclick="Login()">
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="hidden sm:block py-10 mx-10">
            <div class="slider py-5">
              <div class="slides">
                {" "}
                <img src={image1} alt="Image 1" />{" "}
                <img src={image1} alt="Image 1" />{" "}
                <img src={image1} alt="Image 1" />
              </div>
            </div>
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
              <img
                height="70px"
                width="400px"
                src={image3}
                alt="download link"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Signup;

// function Signup() {
//   return (
//     <div>
//           Hello
//     </div>
//   )
// }
