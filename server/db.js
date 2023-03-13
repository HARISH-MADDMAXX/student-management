// const Pool = require("pg");
// // Pool is an inbuilt function for pg
// // we use pgAdmin pg is a part of it(not sure)

// const pool = new Pool({
//     user : "postgres",
//     password :"Harish@10",
//     host : "localhost",
//     port : 5432,
//     database : "studentskills", 
// });

// this is const pool which defines the requirements for server for example in postman we use http://localhost:5000/skills
// first i gave skillsets as database by mistake,actually it is a table and skill is the database,so im unable to fetch data
// then i changed database as skill


// sequelize 

// import  pg  from "pg";
// import * as dotenv from "dotenv";
require("dotenv").config();

// dotenv.config();
// const pool = new pg.Pool({
//     connectionString: process.env.DB_URL,
//     ssl: {
//         rejectUnauthorized: false, // Set to true in production
//     },
// });
// export default pool;
// module.exports = pool;

const { Pool } = require("pg");
const PgPool = require("pg-pool");
const pool = new PgPool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false, // Set to true in production
    },
});

module.exports = pool;
