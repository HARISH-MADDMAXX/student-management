import React, { Fragment } from "react";
import "../index.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { emailValidator, passwordValidator } from "./regexValidator.jsx";
import Nav from "./Nav";

function Form(props) {
  const [input, setinput] = useState({ email: "", password: "" });
  // passing the 2 fields userid and password as object in usestate set them to null
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;
  const handleChange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
    // the input value that we enter will get stored in the userId in usestate
    // name represents the attribute name in input box
  };

  const formSubmitter = (e) => {
    e.preventDefault();
    setsuccessMessage("");
    if (!emailValidator(input.email)) {
      return seterrorMessage("please enter valid email id ");
    }
    if (!input.password === "welcome") {
      return seterrorMessage("password should contain atleast 8 characters");
    } else {
      // navigate("/view")
      //  localStorage.setItem(
      //  process.env.REACT_APP_LOCALHOST_KEY,
      //  JSON.stringify()

      //  )
      if (current === "/teacher") {
        navigate("/teacher/view");
      } else {
        navigate("/student/enter");
      }
    }
    setsuccessMessage("successfully validated");
  };

  return (
    <Fragment>
      <Nav link="/" l="Home" />
      <h1 className="mt-5 mb-5 text-center text-info bg-dark">
        Enter Your Credentials
      </h1>
      <div className=" container w-50 mt-5 border border-info border-3 rounded-5">
        <form action="" className="form1 mt-5 mb-5" onSubmit={formSubmitter}>
          {/* onSubmit={ProceedLogin} */}
          <div className="mb-3 mt-4">
            <label for="exampleFormControlInput1" class="form-label label1">
              Email Id
            </label>

            <input
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
            <input
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

          <button className="btn btn-outline-info" id="submit">
            Submit uh
          </button>
        </form>
      </div>
    </Fragment>
  );
}

export default Form;
