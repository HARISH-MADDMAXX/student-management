import React, { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ListData({ skill }) {
  const [skillname, setSkillName] = useState("");
  const [data, setData] = useState([]);

  const [year, setYear] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    // console.log(skillname);
    console.log(year);
    await fetch(`${process.env.REACT_APP_BASE_URL}/students/skills`, {
      method: "POST",
      body: JSON.stringify({
        skill: skillname,
        year: year,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };

  const tablevariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 2,
        duration: 2,
      },
    },
  };

  const tableheadvariants = {
    hover: {
      scale: 1.1,
      color: "black",
    },
  };

  const tablerowvariants = {
    hover: {
      backgroundColor: "#E3F6FF",
      color: "black",
    },
  };

  const tdvariants = {
    hover: {
      color: "black",
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
        delay: 1,
        duration: 0.5,
      },
    },
    focus: {
      scale: 1.05,
    },
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="container w-50 mt-5 d-flex">
        <motion.input
          variants={inputvariants}
          initial="hidden"
          animate="visible"
          whileFocus="focus"
          type="text"
          value={skillname}
          placeholder="Search for a skill"
          onChange={(e) => setSkillName(e.target.value)}
          className="form-control"
        />

        <div
          class="btn-group drodown ms-3
        "
        >
          <motion.button
            variants={inputvariants}
            initial="hidden"
            animate="visible"
            whileFocus="focus"
            type="button"
            class="btn btn-outline-light dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Year
          </motion.button>
          <ul class="dropdown-menu text-center bg-dark fs-5">
            <button className="btn btn-info mt-1 mb-1 ms-1 me-1" value="1">
              <li>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="1"
                  onClick={(e) => {
                    console.log(e.target.value);
                    setYear(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineRadio1">
                  1
                </label>
              </li>
            </button>

            <button className="btn btn-info mt-1 mb-1 ms-1 me-1" value="2">
              <li>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="2"
                  onClick={(e) => {
                    console.log(e.target.value);
                    setYear(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineRadio1">
                  2
                </label>
              </li>
            </button>
            <button className="btn btn-info  mt-1 mb-1 ms-1 me-1" value="3">
              <li>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  value="3"
                  onClick={(e) => {
                    console.log(e.target.value);
                    setYear(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineRadio1">
                  3
                </label>
              </li>
            </button>
            <button className="btn btn-info  mt-1 mb-1 ms-1 me-1" value="4">
              <li>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio4"
                  value="4"
                  onClick={(e) => {
                    console.log(e.target.value);
                    setYear(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineRadio1">
                  4
                </label>
              </li>
            </button>
          </ul>
        </div>

        <motion.button
          variants={inputvariants}
          initial="hidden"
          animate="visible"
          whileFocus="focus"
          type="submit"
          className="btn btn-outline-success ms-2"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </motion.button>
      </form>
      <div className="mt-5" style={{ height: 20 }}></div>
      <motion.table
        variants={tablevariants}
        initial="hidden"
        animate="visible"
        className="container table mt-5 text-center"
      >
        <thead>
          <tr style={{ backgroundColor: "#0081C9" }}>
            <motion.th variants={tableheadvariants} whileHover="hover">
              Name
            </motion.th>
            <motion.th variants={tableheadvariants} whileHover="hover">
              Year
            </motion.th>
            <motion.th variants={tableheadvariants} whileHover="hover">
              Department
            </motion.th>
            <motion.th variants={tableheadvariants} whileHover="hover">
              Rating
            </motion.th>
            <motion.th variants={tableheadvariants} whileHover="hover">
              view
            </motion.th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <motion.tr
              variants={tablerowvariants}
              whileHover="hover"
              key={student.name}
            >
              <motion.td
                style={{ color: "#0081C9" }}
                variants={tdvariants}
                whileHover="hover"
              >
                {student.name}
              </motion.td>
              <motion.td
                style={{ color: "#0081C9" }}
                variants={tdvariants}
                whileHover="hover"
              >
                {student.year}
              </motion.td>
              <motion.td
                style={{ color: "#0081C9" }}
                variants={tdvariants}
                whileHover="hover"
              >
                {student.dept}
              </motion.td>
              <motion.td
                style={{ color: "#0081C9" }}
                variants={tdvariants}
                whileHover="hover"
              >
                {student.rating}
              </motion.td>
              <motion.td
                style={{ color: "#0081C9" }}
                variants={tdvariants}
                whileHover="hover"
              >
                
                <Link to={`/description/${student.name}`}>
                  {" "}
                  <i class="fa-solid fa-eye"></i>{" "}
                </Link>
              </motion.td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </Fragment>
  );
}

export default ListData;
