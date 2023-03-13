import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// importing useNavigate from router module
import "../index.css";
import { motion } from "framer-motion";
import Loader from "./Loader";
import Nav from "../components/Nav";



function HomePage() {
  const navigate = useNavigate();
  // using the useNavigate function
  // const [showDiv, setShowDiv] = useState(false);
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setShowDiv(true);
  //   }, 3000); // wait for 3 seconds before showing the div

  //   return () => clearTimeout(timeoutId);
  // }, []);

  const h1variants = {
    hidden: {
      opacity: 0,
      x:"-20vw"
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.1,
    },
  };
  const h2variants = {
    hidden: {
      opacity: 0,
      x:"-20vw"
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 1,
        duration: 1,
      },
    }
    ,
    hover: {
      scale: 1.1,
    },
  };


  const maindivvariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay:2,
        duration: 2,
      },
    },
  };
  
  const buttonvariants1 = {
    // visible: {
    //   y: -8,
    //   transition: {
    //     duration: 1,
    //     delay: 0.3,
    //     repeat: Infinity,
    //     yoyo: true,
    //   },
    // },
  };

  const buttonvariants2 = {
    // visible: {
    //   y: -8,
    //   transition: {
    //     duration: 1,
    //     repeat: Infinity,
    //     yoyo: true,
    //   },
    // },
  };

  const imagevariants ={
    hidden : {
      opacity : 0 ,
      x : "30vw"
    },
    visible :{
      opacity:1,
      x:0,
      transition :{
        delay:2.5,
        duration:2
      }

    },
    hover: {
      scale: 1.1,
    },
  }

  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDiv(true);
    }, 3000); // wait for 3 seconds before showing the div

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Fragment className="container-fluid">
      {showDiv ? (

       
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}style={{marginTop : "10%"}} className="row justify-content-center container mx-auto  ">
          {/* <Nav l="Contact-us" /> */}
          {/* <div className="row justify-content-center container-fluid  " > */}
            <div className="col-lg-6 col-sm-12">
          <motion.h1
            variants={h1variants}
            initial="hidden"
            animate="visible"
           whileHover="hover"

            className="text-lg-start text-center  mt-5 mb-5 text-light "
            style={{fontFamily : "'Tilt Warp', cursive"}}
          >
            Welcome to the Hub of Learning and Growth
          </motion.h1>
          <motion.h2
            variants={h2variants}
            initial="hidden"
            animate="visible"
            whileHover="hover"

            className="text-lg-start text-center mt-5 mb-5  text-info"
            style={{fontFamily : "'Inconsolata', monospace"}}
          >
            Are You a Student or a Teacher?
          </motion.h2>
          <motion.div
            variants={maindivvariants}
            initial="hidden"
            animate="visible"
            className="mt-5"
          >
            <div className="row justify-content-lg-start justify-content-center mb-5 mt-5">
              <div className="col-auto">
                {" "}
                <motion.button
                  variants={buttonvariants1}
                  animate="visible"
                  style={{ scale: 1.5 , fontFamily : "'Roboto Mono', monospace" }}
                  onClick={() => navigate("/student")}
                  className="btn btn-outline-light  mt-3 ms-3 me-3"
                  
                >
                  student
                </motion.button>{" "}
              </div>
              {/* triggering the required route using navigate function */}
              <div className="col-auto">
                {" "}
                <motion.button
                  variants={buttonvariants2}
                  animate="visible"
                  style={{ scale: 1.5 , fontFamily : "'Roboto Mono', monospace"}}
                  onClick={() => navigate("/teacher")}
                  className="btn btn-outline-light mt-3 ms-3 me-3"
                >
                  teacher
                </motion.button>{" "}
              </div>
            </div>
          </motion.div>
          </div>

          <div className="col-lg-6 col-sm-12">
            <motion.img 
            variants={imagevariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            
            src=" https://res.cloudinary.com/duvg31sny/image/upload/v1677316380/img1-removebg-preview_tjzrx3.png
          " alt="" className="img-fluid mt-3 rounded rounded-5" />

          </div>

          {/* </div> */}
        </motion.div>
      ) : (
        <div  className="w-100 mt-5 d-flex align-items-center justify-content-sm-center ml-20 ml-sm-20 ml-md-0 ml-lg-0"
        style={{ minHeight: "90vh"  }}>
          <Loader />
        </div>
      )}
    </Fragment>
  );
}

export default HomePage;
