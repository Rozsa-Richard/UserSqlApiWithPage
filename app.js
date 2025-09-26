import express from "express";
import * as db from "./util/database.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.static("public"));


app.post("/register", (req,res) =>{
    const {email, password} = req.body;
    if (!email, !password) {
        return res.status(400).json({message: "Missing some data"});
    }
    db.saveUser(email,password);
    res.status(200).json({message: "User created"});
});

app.post("/singIn", (req, res) => {
    const {email, password} = req.body;
    if (!email, !password) {
        return res.status(400).json({message: "Missing some data"});
    }
    const user = db.getUserByMail(email);
    if (user.password == password){
        res.status(200).json({message:"Sikeres bejelentkezés!"});
    }
    else{
        res.status(400).json({message:"Email vagy jelszó nem egyezik!"})
    }
}),

app.listen(PORT, ()=> {
    console.log("http://localhost:3000")
});

