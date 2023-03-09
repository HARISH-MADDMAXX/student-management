import React from "react";
import { useEffect, useState } from "react";
import EditSkill from "./EditSkill";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ListSkills({ count, setCount }) {
  const [studDetails, setstudDetails] = useState([]);
  const [stdid, setStdId] = useState(0);

  console.log("List skill rerendered", count);

  // allaskills was used in server so use that

  const details = async (email) => {
    try {
      fetch(`${process.env.REACT_APP_BASE_URL}/stud`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stud_email: email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.resp[0])
          setStdId(data.resp[0].stud_id);
          console.log(stdid);
          getSkills(data.resp[0].stud_id);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    let getEmail = sessionStorage.getItem("email");
    details(getEmail);
  }, [count]);

  const getSkills = async (stdid) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/stdskill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentid: stdid,
        }),
      });
      const jsonData = await response.json();

      console.log(jsonData);

      setstudDetails(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  //    delete
  const deleteSkill = async (id, skill) => {
    console.log("delete id : ", id);
  
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/stdskills/${id}`, {
        method: "DELETE",
        //  this ` ` allows us to add variables like ${id}
      }).then(() => {
        setCount(Math.random());
      });
      // console.log(deleteSkill)
      // this deletes the skill but the skill gets vanished only if page is refreshed
      // so we use filter function (very very imp)
      // setstudDetails(

      // let studentDetailsAssign = studDetails;
      // let removeSkills = studDetails[0].skills;
      // let removeSkillIds = studDetails[0].skill_ids;
      // let removeSkillRating = studDetails[0].skill_ids;
      // let index = studDetails[0].skills.indexOf(skill);
      // removeSkills.splice(index, 1);
      // removeSkillIds.splice(index, 1);
      // // console.log(index, removeSkills, skill);
      // studentDetailsAssign[0].skills = removeSkills;
      // studentDetailsAssign[0].skill_ids = removeSkillIds;

      // console.log(studentDetailsAssign);
      // setstudDetails(studentDetailsAssign);
    } catch (error) {
      console.error(error.message);
    }
  };
  // if we do not put [] at last , useeffect does plenty of requests
  // if we put [] it does a single request

  const tablevariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
        duration: 1,
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

  return (
    <div>
      <motion.table
        variants={tablevariants}
        initial="hidden"
        animate="visible"
        className="table mt-5 text-center"
        key={count}
      >
        <thead>
          <tr style={{ backgroundColor: "#0081C9" }}>
            <motion.th variants={tableheadvariants} whileHover="hover">
              SkillName
            </motion.th>

            <motion.th variants={tableheadvariants} whileHover="hover">
              Rating
            </motion.th>

            <motion.th variants={tableheadvariants} whileHover="hover">
              Edit
            </motion.th>

            <motion.th variants={tableheadvariants} whileHover="hover">
              Delete
            </motion.th>
            {/* <motion.th variants={tableheadvariants} whileHover="hover">
              Profile
            </motion.th> */}
          </tr>
        </thead>
        <tbody>
          {
            //   mapping all the skills
            studDetails.map(
              (student) =>
                student.skills.map((skill, index) => (
                  <motion.tr
                    variants={tablerowvariants}
                    whileHover="hover"
                    key={student.stud_id}
                  >
                    <motion.td
                      style={{ color: "#0081C9" }}
                      variants={tdvariants}
                      whileHover="hover"
                    >
                      {skill}
                    </motion.td>
                    <motion.td
                      style={{ color: "#0081C9" }}
                      variants={tdvariants}
                      whileHover="hover"
                    >
                      {student.rating[index]}
                    </motion.td>
                    <td>
                      <EditSkill skillId={student.skill_ids[index]} />
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        onClick={() =>
                          deleteSkill(student.skill_ids[index], skill)
                        }
                      >
                        Delete
                      </button>
                    </td>
                    {/* <td>
                    <Link to={`/description/${student.name}`}>
                  {" "}
                  <i class="fa-solid fa-eye"></i>{" "}
                </Link>
                    </td> */}
                  </motion.tr>
                ))

              //
            )
          }
        </tbody>
      </motion.table>
    </div>
  );
}

export default ListSkills;
