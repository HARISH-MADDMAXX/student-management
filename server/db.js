const Pool = require("pg").Pool;
// Pool is an inbuilt function for pg
// we use pgAdmin pg is a part of it(not sure)

const pool = new Pool({
    user : "postgres",
    password :"Harish@10",
    host : "localhost",
    port : 5432,
    database : "studentskills", 
});

// this is const pool which defines the requirements for server for example in postman we use http://localhost:5000/skills
// first i gave skillsets as database by mistake,actually it is a table and skill is the database,so im unable to fetch data
// then i changed database as skill

module.exports = pool;

// sequelize 