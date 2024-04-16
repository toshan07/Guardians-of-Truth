import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

import { spawn } from "child_process";
import path from "path";


// import multer from "multer";
// import { spawn } from "child_process";
// import path from "path";

// const { spawn } = require("child_process");


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({ storage: storage })


const app = express();
const port = 3000;
const saltRounds = 10;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "vishnu2004",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/sign-in", (req, res) => {
  res.render("sign-in.ejs");
});  

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/imgver", (req,res) => {
  res.render("imgver.ejs");
})

app.get("/fakenews", (req,res) => {
  res.render("fakenews.ejs");
})

app.get("/chat", (req,res) => {
  res.render("newsupdates.ejs");
})




app.post("/sign-in", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      bcrypt.hash(password,saltRounds, async(err,hash) => {
        if(err){
          console.log(err)
        }

        else{
          const result = await db.query(
            "INSERT INTO users (email, passwor) VALUES ($1, $2)",
            [email, hash]
          );
          console.log(result);
          res.render("postlogin.ejs");
        }

      })

    }
  } catch (err) {
    console.log(err);
  }
});



app.post("/imgver", (req, res) => {

});

app.post("/fakenews", (req, res) => {
  
  
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});






