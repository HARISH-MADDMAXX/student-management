const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const pool = require("./db");
const uploadImage = require("./uploadImg");
// const { query } = require("express");
// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: "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",
// });
// const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// app.get("/chat",async(req,res)=>{
//   const completion = await openai.createCompletion({
//     prompt : "i am front end developer give me some content for bio",
//     model : "text-davinci-003",
//     max_tokens:512,
//     temperature:0
//   });
//   res.send(completion.data.choices[0].text)
// })

app.get("/", (req, res) => {
  res.send("RUNNING SUCCESSFULLY");
});

app.post("/stdskills", async (req, res) => {
  try {
    const { skillname } = req.body;
    const { rating } = req.body;
    const { stud_id } = req.body;
    const newSkill = await pool.query(
      "INSERT INTO stdskills(skillname,rating,stud_id) VALUES($1 ,$2,$3) RETURNING *",
      [skillname.toUpperCase(), rating, stud_id]
    );
    res.json(newSkill.rows);
  } catch (error) {
    console.log("Error in posting");
    console.log(error.message);
  }
});

app.get("/stdskills", async (req, res) => {
  try {
    const allskills = await pool.query("SELECT * FROM stdskills");
    res.json(allskills.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/stdskills/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await pool.query(
      "SELECT * FROM stdskills WHERE skill_id = $1",
      [id]
    );
    res.json(skill.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/students/skills", async (req, res) => {
  try {
    const skillName = req.body.skill;
    const year = req.body.year;
    if (year !== 0) {
      const data = await pool.query(
        `SELECT DISTINCT studenttbl.name,studenttbl.year,studenttbl.dept,stdskills.rating
                FROM studenttbl
                INNER JOIN stdskills
                ON studenttbl.stud_id=stdskills.stud_id WHERE skillname = $1 AND (year = $2) `,
        [skillName.toUpperCase(), year]
      );
      res.json(data.rows);
    } else {
      const data = await pool.query(
        `SELECT DISTINCT studenttbl.name,studenttbl.year,studenttbl.dept,stdskills.rating
            FROM studenttbl
            INNER JOIN stdskills
            ON studenttbl.stud_id=stdskills.stud_id WHERE skillname = $1  `,
        [skillName.toUpperCase()]
      );
      res.json(data.rows);
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/stdskill", async (req, res) => {
  try {
    const studentid = req.body.studentid;
    const specificSkill = await pool.query(
      `select std."stud_id",ARRAY_AGG(sk."skill_id") AS "skill_ids", max(std."name") as "stud_name",array_agg(sk."skillname") as "skills",
        array_agg(sk."rating") as "rating" 
        from "studenttbl" std join "stdskills" sk
        on std."stud_id" = sk."stud_id" and std."stud_id" = $1
        group by std."stud_id";`,
      [studentid]
    );
    res.json(specificSkill.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/stdskills/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const updaterating = await pool.query(
      "UPDATE stdskills SET rating = $1 WHERE skill_id =$2",
      [rating, id]
    );

    res.json("Skill updated");
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/stdskills/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSkill = await pool.query(
      "DELETE FROM stdskills WHERE skill_id = $1",
      [id]
    );
    res.json("Skill DELETED!!");
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/form", async (req, res) => {
  try {
    // console.log(req.body)
    const emailVal = req.body.emailVal;
    const response = await pool.query(
      `SELECT EXISTS (SELECT 1 FROM studenttbl WHERE email = $1);
        `,
      [emailVal]
    );
    res.json({ resp: response.rows });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/stud", async (req, res) => {
  try {
    const stud_email = req.body.stud_email;
    const response = await pool.query(
      `SELECT stud_id,name FROM studenttbl where email = $1;`,
      [stud_email]
    );
    res.json({ resp: response.rows });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/description", async (req, res) => {
  try {
    const name = req.body.name;
    const response = await pool.query(
      `select std."stud_id",  std."image" , max(std."name") as "stud_name",array_agg(sk."skillname") as "skills",
        std."year" , std."dept" ,array_agg(sk."rating") as "ratings"
        from "studenttbl" std join "stdskills" sk
        on std."stud_id" = sk."stud_id" and std.name =$1
        group by std."stud_id";`,
      [name]
    );
    res.json({ resp: response.rows });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/profile", async (req, res) => {
  try {
    const name = req.body.name;
    const response = await pool.query(
      `select std."stud_id",  std."image" , max(std."name") as "stud_name",array_agg(sk."skillname") as "skills",
        std."year" , std."dept" ,array_agg(sk."rating") as "ratings"
        from "studenttbl" std join "stdskills" sk
        on std."stud_id" = sk."stud_id" and std.name =$1
        group by std."stud_id";`,
      [name]
    );
    res.json({ resp: response.rows });
  } catch (error) {
    console.log(error.message);
  }
});
// cloudinary
app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.send(err.message));
});
// cloudinary

app.put("/img", async (req, res) => {
  try {
    const { newimage } = req.body;
    const { stud_id } = req.body;

    await pool.query(`UPDATE studenttbl SET image = $1 WHERE stud_id =$2;`, [
      newimage,
      stud_id,
    ]);

    res.json({ resp: "SUCCESSFULLY UPDATED" });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log("started at port 5000");
});

module.exports = app;

// select std."stud_id", max(std."name") as "stud_name",array_agg(sk."skillname") as "skills",
// 	array_agg(sk."rating") as "rating"
// 	from "studenttbl" std join "stdskills" sk
// 	on std."stud_id" = sk."stud_id" and std."stud_id" = 1
// 	group by std."stud_id";

// useContext =>(consumer, provider) , useReducer
