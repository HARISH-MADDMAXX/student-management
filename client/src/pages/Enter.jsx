import React from "react";
import "../index.css";
import Nav from "../components/Nav";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import firebase from "firebase/app";
import "firebase/firestore";
export default function Enter() {
  const [skills, setSkills] = useState([]);

  const skillsCollectionRef = collection(db, "skills");

  const [newSkill, setNewSkill] = useState("");
  const [newRating, setNewRating] = useState(0);

  const createSkill = async () => {
    await addDoc(skillsCollectionRef, { skill: newSkill, rating: newRating });
  };

  const updateSkill = async (id, rating) => {
    const userDoc = doc(db, "skills", id);
    var msg = Number(prompt("enter new password"));
    const newFields = { rating: msg };
    await updateDoc(userDoc, newFields);
  };

  const deleteSkill = async (id) => {
    const userDoc = doc(db, "skills", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getSkills = async () => {
      const data = await getDocs(skillsCollectionRef);
      setSkills(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getSkills();
  }, []);

  return (
    <div>
      <Nav link="/student" l="LogOut" />
      <div className="container entry">
        <div className="entry1">
          <form action="">
            <label for="exampleFormControlInput1" class="form-label lbl">
              Name :
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your Name"
            />
            <label for="exampleFormControlInput1" class="form-label lbl">
              Department :
            </label>
            <input
              type="text"
              name="dept"
              className="form-control"
              placeholder="Enter your Department"
            />
            <label for="exampleFormControlInput1" class="form-label lbl">
              Year :
            </label>
            <input
              type="number"
              name="year"
              className="form-control"
              placeholder="Enter your Year"
            />

            <button>submit</button>
          </form>
        </div>

        <div className="entry2">
          <form action="">
            <label for="exampleFormControlInput1" class="form-label lbl">
              New skill :
            </label>
            <input
              type="text"
              name="skill"
              id=""
              className="form-control"
              placeholder="New skill"
              onChange={(e) => {
                setNewSkill(e.target.value);
              }}
            />
            <label for="exampleFormControlInput1" class="form-label lbl">
              Rating :
            </label>
            <input
              type="text"
              name="rating"
              id=""
              className="form-control"
              placeholder="Rating"
              onChange={(e) => {
                setNewRating(e.target.value);
              }}
            />
            <button onClick={createSkill}>submit</button>
          </form>
        </div>
      </div>

      <div>
        <div className="imp1">
          {skills.map((skill) => {
            return (
              <div className="imp">
                {""}
                <p className="pimp">
                  Skill : {skill.skill} &nbsp; &nbsp; Rating : {skill.rating}{" "}
                </p>
                <button
                  onClick={() => {
                    updateSkill(skill.id, skill.rating);
                  }}
                >
                  Change Rating
                </button>
                <button
                  onClick={() => {
                    deleteSkill(skill.id);
                  }}
                >
                  Delete skill
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
