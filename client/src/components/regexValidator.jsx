// emailregex = [a-zA-Z]+\.[A-Za-z0-9]+@citchennai\.net
// passwordregex = ^[a-zA-Z]+@[0-9]+$
import React from "react";
// import { db } from "../firebase";
// import { useState } from "react";

export const emailValidator = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+$/;

  return emailRegex.test(email);
};

export const passwordValidator = (password) => {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  return passwordRegex.test(password);
};
