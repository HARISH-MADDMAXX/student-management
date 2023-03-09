// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { db } from "../firebase";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";

// // getDocs,addDoc,deleteDoc,updateDoc are all inbuilt functions
// export default function Test() {
//   const [users, setUsers] = useState([]);

//   const usersCollectionRef = collection(db, "users");
//   // this inbuilt function from firebase called collection () uses db from firebase.js and gets the collection name which in our case is users
//   // above line of code is to read or find from database

//   // below code is to create elements in database
//   const [newUserID, setNewUserID] = useState(0);
//   const [newPass, setNewPass] = useState("");
//   // these useStates are fro new user
//   // always create async func for firebase
//   const createUser = async () => {
//     await addDoc(usersCollectionRef, { userID: newUserID, password: newPass });
//     //  addDoc is an inbuilt firebase func,the above code adds the new date to current usercollectionref
//   };

//   // below code if for update

//   const updateUser = async (id, password) => {
//     const userDoc = doc(db, "users", id);
//     var msg = prompt("enter new password");
//     const newFields = { password: msg };
//     await updateDoc(userDoc, newFields);
//   };
//   // below code is to delate a user
//   const deleteUser = async (id) => {
//     const userDoc = doc(db, "users", id);
//     await deleteDoc(userDoc);
//   };

//   useEffect(() => {
//     //   an async func
//     const getUsers = async () => {
//       //    await is the promise
//       // getDocs retrieves data from collections but it will contains lots of unwanted information
//       const data = await getDocs(usersCollectionRef);
//       setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//       // to get the required information we use the above code which uses useState
//     };

//     getUsers();
//   }, []);
//   // useeffect shows the content immediately after the page loads or renders
//   // in useEffect we always use a asynchronous function
//   // whenever we req something from an api , its returns a promise i.e some sort of data

//   return (
//     <div>
//       <input
//         type="number"
//         name=""
//         placeholder="userID.."
//         id=""
//         onChange={(e) => {
//           setNewUserID(e.target.value);
//         }}
//       />
//       <input
//         type="text"
//         name=""
//         placeholder="password.."
//         id=""
//         onChange={(e) => {
//           setNewPass(e.target.value);
//         }}
//       />

//       <button onClick={createUser}>Create user</button>
//       {/* mapping database user(singular) with our users useState */}
//       {users.map((user) => {
//         return (
//           <div>
//             {""}
//             <h1>userID : {user.userID}</h1>
//             <h1>Password : {user.password}</h1>

//             <button
//               onClick={() => {
//                 updateUser(user.id, user.password);
//               }}
//             >
//               Change Password
//             </button>
//             {/* here it is inside map func so we cannot directly call the update function and also one main reason is update function has arguements whereas other fucntions like read and create dont have arguements, so we use the above code inside onclick()*/}
//             <button
//               onClick={() => {
//                 deleteUser(user.id);
//               }}
//             >
//               Delete user
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// const [students, setStudents] = useState([]);

// // const [skills , setskills] = useState([]);

// const studentCollectionRef = collection(db, "students");

// // const skillsCollectionRef = collection(db ,"students/*/skills")

// const [newName, setNewName] = useState("");
// const [newDept, setNewDept] = useState("");
// const [newYear, setNewYear] = useState(0);

// // const [newSkill , setNewSkill] = useState("");
// // const [newRating , setNewRating] = useState(0);

// const createStudent = async () => {
//   await addDoc(studentCollectionRef, {
//     name: newName,
//     dept: newDept,
//     year: newYear,
//   });
// };

// const updateStudent = async (id, rating) => {
//   const userDoc = doc(db, "students", id);
//   var msg = Number(prompt("enter new rating"));
//   const newFields = { rating: msg };
//   await updateDoc(userDoc, newFields);
// };

// const deleteStudent = async (id) => {
//   const userDoc = doc(db, "users", id);
//   await deleteDoc(userDoc);
// };

// // const createskills = async () =>
// // {
// //   await addDoc(studentCollectionRef , {name : newName , dept : newDept , year : newYear })
// // }

// // const updateSkills= async (id,rating) =>{

// //   const userDoc = doc(db , "students",id)
// //   var msg = Number(prompt("enter new rating"));
// //   const newFields = {rating : msg}
// //   await updateDoc( userDoc,newFields)
// // }

// // const deleteskills = async(id)=>
// // {
// //     const userDoc = doc(db , "users", id)
// //     await deleteDoc(userDoc);
// // }

// useEffect(() => {
//   const getStudents = async () => {
//     const data = await getDocs(studentCollectionRef);
//     setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//   };
//   // const getSkills = async ()=>
//   // {
//   //   const data = await getDocs(skillsCollectionRef)
//   //   setskills(data.docs.map((doc)=>({...doc.data(),id : doc.id})))
//   // }

//   getStudents();
//   // getSkills()
// }, []);

// return (
//   <div>
//     <Nav link="/student" />
//     <div className="container entry">
//       <div className="entry1">
//         <form action="">
//           <label for="exampleFormControlInput1" class="form-label lbl">
//             Name :
//           </label>
//           <input
//             type="text"
//             name="name"
//             className="form-control"
//             placeholder="Enter your Name"
//             onChange={(e) => {
//               setNewName(e.target.value);
//             }}
//           />
//           <label for="exampleFormControlInput1" class="form-label lbl">
//             Department :
//           </label>
//           <input
//             type="text"
//             name="dept"
//             className="form-control"
//             placeholder="Enter your Department"
//             onChange={(e) => {
//               setNewDept(e.target.value);
//             }}
//           />
//           <label for="exampleFormControlInput1" class="form-label lbl">
//             Year :
//           </label>
//           <input
//             type="number"
//             name="year"
//             className="form-control"
//             placeholder="Enter your Year"
//             onChange={(e) => {
//               setNewYear(e.target.value);
//             }}
//           />

//           <button onClick={createStudent}>submit</button>
//         </form>
//       </div>
//       <div className="entry2">
//         <form action="">
//           <label for="exampleFormControlInput1" class="form-label lbl">
//             New skill :
//           </label>
//           <input
//             type="text"
//             name="skill"
//             id=""
//             className="form-control"
//             placeholder="New skill"
//           />
//           <label for="exampleFormControlInput1" class="form-label lbl">
//             Rating :
//           </label>
//           <input
//             type="text"
//             name="rating"
//             id=""
//             className="form-control"
//             placeholder="Rating"
//           />
//           <button>submit</button>
//         </form>
//       </div>
//     </div>

//     <div>
//       <div className="imp1">
//         {students.map((student) => {
//           return (
//             <div className="imp">
//               {""}
//               <p className="pimp">
//                 Skill : {student.skill} &nbsp; &nbsp; Rating : {student.rating}{" "}
//               </p>
//               <button
//                 onClick={() => {
//                   updateStudent(student.id, student.rating);
//                 }}
//               >
//                 Change Rating
//               </button>
//               <button
//                 onClick={() => {
//                   deleteStudent(student.id);
//                 }}
//               >
//                 Delete student
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   </div>
// );
