// {
//     //   mapping all the skills
//     studDetails.map((student) =>
//       // maps should have an unique key which in our case is skill_id

//       student.skills.map((skill,index) => (
//         <tr key={student.stud_id}>
//           <td>{skill}</td>
//           <td>{student.rating[index]}</td>
//           <td>
//             <EditSkill skill={skill} />
//           </td>
//           <td>
//             <button
//               type="button"
//               class="btn btn-outline-danger"
//               onClick={() => deleteSkill(skill.skill_id)}
//             >
//               Delete
//             </button>
//           </td>
//         </tr>
//       ))

//       //
//     )
//   }