import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { addCompany, getCompany } from "./src/routes/route";
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
let db;
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/company";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(uri)
  .then((response) => {
    db = response.connection.db;
    app.get("/", (req, res) => {
      res.send("Server is running");
    });
    app.get("/getCompany", getCompany);
    app.post("/addCompany", addCompany);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });

export default db;
