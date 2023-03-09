import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {motion} from "framer-motion"

export default function Nav(props) {
  // const [value , setValue] = useState({})

  // const location = useLocation()
  // const current = location.pathname
  //  const navigate = useNavigate()

  // const submitter = (e) =>
  // {
  //    e.preventDefault()

  // }

  const navigate = useNavigate();

  const navbarvariants = {
    hidden :{
      x : "20vw",opacity :0
    },
    visible :{
      x:0,opacity :1,
      transition : {
        delay : 0.5, duration : 0.5
      }
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-end">
        <div className="col-auto">
          <motion.button
           variants={navbarvariants}
           initial = "hidden"
           animate = "visible"
        
           
            type="button"
            class="btn btn-outline-secondary logout"
            onClick={() => navigate(props.link)}
          >
            {props.l}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
// let a ='';

// if(current === "/teacher/view")
// {
//   a ="/teacher";
//   return a
// }
// if(current === "/student/enter"){

//   a ="/student";
//   return a

// }

// onClick={navigate(a)}

// onClick={submitter()}
