import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Fragment } from "react";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import Nav from "../components/Nav";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";



function Profile() {
  const { name } = useParams();
  const [year, setYear] = useState(0);
  const [skills, setSkills] = useState([]);
  const [dept, setDept] = useState("");
  const [response, setResponse] = useState("");
  const [url, setUrl] = useState("");
  const [stdid, setStdId] = useState(0);
  const [ratings, setRatings] = useState(0);

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const fetchData = async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/description`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setYear(data.resp[0].year);
        setSkills(data.resp[0].skills);
        setDept(data.resp[0].dept);
        setStdId(data.resp[0].stud_id);
        setUrl(data.resp[0].image);
        setRatings(data.resp[0].ratings);
      })

      .catch((err) => console.log(err));
  };
  // function display () {
  //   axios.get("http://localhost:5000/chat")
  //   .then((res)=>{setResponse(res.data)})
  //   .catch((err)=>{
  //       console.log(err)
  //   })
  // }

  const data = skills.map((skill, index) => {
    return {
      name: skill,
      rating: ratings[index],
    };
  });
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const generatePrompt = async () => {
    const completion = await openai.createCompletion({
      prompt: `i am ${name} from ${year} year ${dept}, my skills are ${skills} give me a bio that i can add to my profile , give me content in my point of view`,
      model: "text-davinci-003",
      max_tokens: 512,
      temperature: 0,
    });
    setResponse(completion.data.choices[0].text);
  };
  generatePrompt();
  // cloudinary
  const handleImageSubmit = async (event) => {
    const img = event.target.files[0];
    console.log(img);
    const base64 = await convertBase64(img);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/uploadImage`, { image: base64 })
      .then(async (res) => {
        setUrl(res.data);
        console.log("Image uploaded Succesfully. URL :", res.data);
        // result = await addOrUpdateProject(res.data);
        changeImage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const changeImage = async (url) => {
    console.log(url);
    await fetch(`${process.env.REACT_APP_BASE_URL}/img`, {
      method: "PUT",
      body: JSON.stringify({
        newimage: url,
        stud_id: stdid,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })

      .catch((err) => console.log(err));
  };
  // cloudinary
  useEffect(() => {
    fetchData();
  }, []);

  const divvariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
        delay: 1,
      },
    },
  };

  const profilevariants = {
    hidden: {
      opacity: 0,
      y: "-50vw",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        delay: 1,
      },
    },
  };
  const ipvariants = {
    hidden: {
      opacity: 0,
      y: "-50vw",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: "13vw",
      transition: {
        duration: 2,
        delay: 2,
      },
    },
  };

  const descriptionvariants = {
    hidden: {
      opacity: 0,
      x: "-50vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 4,
        delay: 4,
      },
    },
  };

  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDiv(true);
    }, 3000); // wait for 3 seconds before showing the div

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Fragment>
      <Nav link="/student/enter" l="Back" />

      <div>
        {showDiv ? (
          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
            <motion.div
              variants={divvariants}
              initial="hidden"
              animate="visible"
              className="mx-auto mt-5 w-50 bg-dark text-light p-5 border rounded-4 mb-5"
              s
            >
              <h1 className="text-center text-info bg-dark">PROFILE</h1>
              <div className="image-container text-center">
                <div
                  class="edit"
                  style={{
                    position: "relative",
                    top: 45,
                    left: 135,
                    zIndex: 1,
                  }}
                >
                  <motion.button
                    variants={profilevariants}
                    initial="hidden"
                    animate="visible"
                    id="edit"
                    onClick={() => {
                      document.getElementById("file").style.visibility =
                        "visible";
                    }}
                    className="btn btn-dark border rounded-top rounded-3"
                  >
                    <i class="fa fa-pencil fa-lg text-center"></i>
                  </motion.button>
                </div>

                <motion.img
                  variants={profilevariants}
                  initial="hidden"
                  animate="visible"
                  src={url}
                  class="rounded mx-auto d-block mb-2 w-50 rounded-5"
                  style={{ zIndex: -1 }}
                  alt="..."
                />
              </div>
              <label
                className="file mt-3 mb-3"
                style={{ visibility: "hidden" }}
              >
                <input
                  type="file"
                  name=""
                  id="file"
                  aria-label="File browser example"
                  className="mx-auto text-center"
                  onChange={handleImageSubmit}
                />
                <span class="file-custom"></span>
              </label>
              <h2>Bio :</h2>
              <p className="text-info mt-3 mb-3">{response}</p>

              <h2>Analysis :</h2>
              <PieChart width={400} height={400} className="mx-auto">
                <Pie
                  data={data}
                  dataKey="rating"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </motion.div>
          </motion.div>
        ) : (
<div  className="w-100 mt-5 d-flex align-items-center justify-content-sm-center ml-20 ml-sm-20 ml-md-0 ml-lg-0"
        style={{ minHeight: "90vh"  }}>            <Loader />
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Profile