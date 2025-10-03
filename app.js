import express from "express";
import * as db from "./util/database.js";
import bcrypt from "bcrypt";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing some data" });
  }
  const user = db.getUserByMail(email);
  if (!user) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    db.saveUser(email, hashedPassword);
    return res.status(200).json({ message: "User created" });
  }
  return res.status(400).json({ message: "Ez az email már foglalt." });
});

app.post("/singin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing some data" });
    }
    const user = db.getUserByMail(email);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email vagy jelszó nem egyezik!1" });
    }
    if (bcrypt.compareSync(password, user.password)) {
      return res.status(200).json({ message: "Sikeres bejelentkezés!" });
    }
    return res.status(400).json({ message: "Email vagy jelszó nem egyezik!" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("http://localhost:3000");
});
