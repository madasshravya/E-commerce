const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const dbPath = path.join(__dirname, "major.db");
const jwt = require("jsonwebtoken");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(9000, () => {
      console.log("Server Running at http://localhost:9000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

const validatePassword = (password) => {
  return password.length > 4;
};

app.post("/user/register", async (request, response) => {
  const { username, password, FullName, accountType, email, phoneNumber } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const selectUserQuery = `SELECT * FROM user WHERE username = '${username}';`;
  const databaseUser = await db.get(selectUserQuery);

  if (databaseUser === undefined) {
    const createUserQuery = `
        INSERT INTO
        user (username, password, FullName, accountType, email, phoneNumber)
        VALUES
        (
        '${username}',
        '${hashedPassword}',
        '${FullName}',
        '${accountType}',
        '${email}',
        '${phoneNumber}'
        );`;
    if (validatePassword(password)) {
      await db.run(createUserQuery);
      response.send("User created successfully");
    } else {
      response.status(400);
      response.send("Password is too short");
    }
  } else {
    response.status(400);
    response.send("User already exists");
  }
});

app.post("/user/login", async (request, response) => {
  const { userName, passWord } = request.body;
  const selectUserQuery = `SELECT * FROM user WHERE username = '${userName}';`;

  try {
    const databaseUser = await db.get(selectUserQuery);

    if (!databaseUser) {
      response.status(400).send("Invalid user");
      return;
    }

    const isPasswordMatched = await bcrypt.compare(
      passWord,
      databaseUser.password
    );

    if (!isPasswordMatched) {
      response.status(400).send("Invalid password");
      return;
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      {
        id: databaseUser.id,
        username: databaseUser.username,
      },
      "your_secret_key", 
      { expiresIn: "30" }
    );

    
    response.json({
      id: databaseUser.id,
      username: databaseUser.username,
      accountType: databaseUser.accountType,
      jwtToken: jwtToken,
      message: "User logged in successfully"
    });
  } catch (error) {
    console.error("Error during login:", error);
    response.status(500).send("Internal server error");
  }

});