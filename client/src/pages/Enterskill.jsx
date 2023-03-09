import React, { useState, useEffect } from "react";
import "../index.css";
import { Fragment } from "react";
import Inputskill from "../components/InputSkill";
import ListSkills from "../components/ListSkill";
import Nav from "../components/Nav";
// import { useEffect } from 'react'
// import { useState } from 'react'

function Enterskill() {
  const [count, setCount] = useState(0);
  console.log("parent called", count);

  return (
    <div>
      <Nav link="/student" l="logout" />
      <div className="container">
        <Inputskill setCount={setCount} />
        <ListSkills count={count} setCount={setCount} />
      </div>
    </div>
  );
}

export default Enterskill;
