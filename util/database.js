import Database from "better-sqlite3";
const db = new Database("./data/database.sqlite");
db.prepare(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email STRING, password STRING)"
).run();

export const saveUser = (email, password) => {
  db.prepare("INSERT INTO users (email, password) VALUES (?,?)").run(
    email,
    password
  );
};
export const getUserByMail = (email) => {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
};
