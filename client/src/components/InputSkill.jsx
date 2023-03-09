import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Inputskill({ setCount }) {
  const [skillname, setSkillname] = useState("");

  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");

  const [studid, setStudId] = useState(0);

  console.log("Input skill rerendered");

  const details = async (email) => {
    try {
      fetch("http://localhost:5000/stud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stud_email: email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setName(data.resp[0].name);
          setStudId(data.resp[0].stud_id);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    let getEmail = sessionStorage.getItem("email");
    details(getEmail);
  }, []);

  const createSkill = async (e) => {
    e.preventDefault();
    // this avoids refreshing of website
    try {
      const body = {
        skillname: skillname,
        rating: rating,
        stud_id: studid,
      };
      console.log(body);
      await fetch("http://localhost:5000/stdskills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCount(2);
        });
      // by default fetch does the get method so we need to add some more config after localhost
      // window.location = "/student/enter";
    } catch (error) {
      console.error(error.message);
    }
  };

  const h1variants = {
    hidden: {
      x: "-50vw",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 2,
        type: "spring",
        stiffness: 80,
      },
    },
    hover: {
      scale: 1.1,
    },
  };

  const h2variants = {
    hidden: {
      x: "55vw",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 2,
        type: "spring",
        stiffness: 80,
      },
    },
    hover: {
      scale: 1.1,
    },
  };

  const buttonvariants1 = {
    hidden: {
      opacity: 0,
      y: "-50vw",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.5,
        duration: 0.5,
      },
    },

    hover: {
      scale: 1.1,
     
    },
  };
  const buttonvariants2 = {
    hidden: {
      opacity: 0,
      y: "-50vw",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.5,
        duration: 0.8,
      },
    },

    hover: {
      scale: 1.1,
     
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
        delay: 2,
        duration: 0.5,
      },
    },
    focus: {
      scale: 1.1,
    },
  };

  return (
    <div>
      <motion.h1
        className=" text-info bg-dark  border-dark rounded-3 text-center mt-5"
        variants={h1variants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        WELCOME {name.toUpperCase()}
      </motion.h1>
      <motion.h1
        className=" text-light text-center mt-5"
        variants={h2variants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        Skills List
      </motion.h1>
      <form
        action=""
        className="container w-50 mt-5 needs-validation"
        onSubmit={createSkill}
      >
        <div className="container text-center">
          <div>
          <motion.input
            variants={inputvariants}
            initial="hidden"
            animate="visible"
            whileFocus="focus"
            type="text"
            className="form-control "
            value={skillname}
            onChange={(e) => setSkillname(e.target.value)}
            placeholder="Enter the skill"
            id="validationCustom01"
            required
          />
          <div class="valid-feedback">Looks good!</div>
          </div>
          <div>
          <motion.input
            variants={inputvariants}
            initial="hidden"
            animate="visible"
            whileFocus="focus"
            type="text"
            className="form-control mt-2"
            onChange={(e) => setRating(e.target.value)}
            placeholder="Enter the Rating"
            id="validationCustom02"
            required
          />
          <div class="valid-feedback">Looks good!</div>
          </div>

          <motion.button
            variants={buttonvariants1}
            whileHover="hover"
            initial="hidden"
            animate="visible"
            type="submit"
            className="btn btn-outline-success mt-2"
          >
            Add
          </motion.button>

         
        </div>
      </form>
      <div className="d-grid justify-content-center mt-5 ">
      <Link to={`/profile/${name}`}>
                  {" "}
        <motion.button 
          variants={buttonvariants2}
          whileHover="hover"
          initial="hidden"
          animate="visible"
        className="btn btn-outline-info text-center  btn-lg">Profile</motion.button>{" "}
      </Link>
      </div>
    </div>
  );
}

export default Inputskill;
