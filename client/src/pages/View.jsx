import React from "react";
import "../index.css";
import Nav from "../components/Nav";
import ListData from "../components/ListData";

export default function Enter() {
  return (
    <div>
      <Nav link="/teacher" l="LogOut" />
      <ListData />
    </div>
  );
}
