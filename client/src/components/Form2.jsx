import React, { Fragment, useEffect } from "react";
import "../index.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { emailValidator, passwordValidator } from "./regexValidator.jsx";
import Nav from "./Nav";
import { motion } from "framer-motion";
import Loader2 from "../pages/Loader2";
import Loader from "../pages/Loader";
import axios from "axios";

function Form2(props) {
  const [input, setinput] = useState({ email: "", password: "" });
  // passing the 2 fields userid and password as object in usestate set them to null
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;

  const credvariants = {
    hidden: {
      x: "-50vw",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 1,
        duration: 1,
      },
    },
  };

  const formvariants = {
    hidden: {
      opacity: 0,
      y: "50vw",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5,
        duration: 2,
      },
    },
  };

  const inputvariants = {
    hidden: {
      opacity: 0,
      z: "-50vw",
    },
    visible: {
      opacity: 1,
      z: 0,
      transition: {
        delay: 3,
        duration: 0.5,
      },
    },
    focus: {
      scale: 1.1,
    },
  };

  const handleChange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });

    // the input value that we enter will get stored in the userId in usestate
    // name represents the attribute name in input box
  };
  var impemail = "";
  const formSubmitter = async (e) => {
    e.preventDefault();
    setsuccessMessage("");
    // console.log(input);
    impemail = input.email;

    sessionStorage.setItem("email", impemail);

    console.log(impemail);
    await fetch(`${process.env.REACT_APP_BASE_URL}/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailVal: input.email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((inp) => {
        console.log(inp.resp[0].exists);

        if (!inp.resp[0].exists) {
          return seterrorMessage("please enter valid email id ");
        } else {
          if (input.password === "welcometocit") {
            if (current === "/teacher") {
              navigate("/teacher/view");
            } else {
              navigate("/student/enter");
              // console.log(input.email)
            }
          } else {
            return seterrorMessage("Invalid password");
          }
        }
        setsuccessMessage("successfully validated");
      });
  };
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDiv(true);
    }, 2000); // wait for 3 seconds before showing the div

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Fragment>
      {showDiv ? (
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          <Nav link="/" l="Home" />
          <motion.h1
            variants={credvariants}
            initial="hidden"
            animate="visible"
            className="mt-5 mb-5 text-center text-info bg-dark container border-rounded rounded-2"
          >
            Enter Your Credentials
          </motion.h1>
          <motion.div
            variants={formvariants}
            initial="hidden"
            animate="visible"
            className=" container w-50 mt-5 border border-info border-3 rounded-5"
          >
            <form
              action=""
              className="form1 mt-5 mb-5"
              onSubmit={formSubmitter}
            >
              {/* onSubmit={ProceedLogin} */}
              <div className="mb-3 mt-4">
                <label for="exampleFormControlInput1" class="form-label label1">
                  Email Id
                </label>

                <motion.input
                  variants={inputvariants}
                  initial="hidden"
                  animate="visible"
                  whileFocus="focus"
                  type={props.type1}
                  name="email"
                  placeholder={props.placeholder1}
                  className="form-control"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <label for="exampleFormControlInput1" class="form-label label1">
                Password
              </label>

              <div className="mb-3">
                <motion.input
                  variants={inputvariants}
                  initial="hidden"
                  animate="visible"
                  whileFocus="focus"
                  type={props.type2}
                  name="password"
                  placeholder={props.placeholder2}
                  className="form-control"
                  id="password"
                  onChange={handleChange}
                />{" "}
              </div>
              {errorMessage.length > 0 && (
                <div
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    marginBottom: "10px",
                  }}
                >
                  {errorMessage}
                </div>
              )}

              {successMessage.length > 0 && (
                <div style={{ backgroundColor: "green", color: "white" }}>
                  {successMessage}
                </div>
              )}
              {/* {exist && "exists"} */}
              <button className="btn btn-outline-info" id="submit">
                Submit
              </button>
            </form>
          </motion.div>
        </motion.div>
      ) : (
        <div style={{ position: "absolute", top: " 40%", right: "40%" }}>
          <Loader />
        </div>
      )}
    </Fragment>
  );
}

export default Form2;
