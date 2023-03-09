import React from "react";
import Form from "../components/Form";
import Form2 from "../components/Form2";

const plc = [
  {
    id: "1",
    type1: "email",
    type2: "password",
    placeholder1: "Email Id",
    placeholder2: "Password",
  },
];

function mapplc(data) {
  return (
    <Form2
      key={data.id}
      type1={data.type1}
      type2={data.type2}
      placeholder1={data.placeholder1}
      placeholder2={data.placeholder2}
    />
  );
}

function TeacherPage() {
  return (
    <div>
      <div>{plc.map(mapplc)}</div>
    </div>
  );
}

export default TeacherPage;
