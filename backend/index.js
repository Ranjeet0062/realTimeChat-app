import express from "express";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";
import cors from "cors";
import {databaseconnection} from "./config/database.js"
import auth from "./routes/user.route.js"
// const app = express();
databaseconnection();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://friends-flock.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const port = process.env.PORT || 5555;

app.use("/api/user",auth)
app.get("/", (req, res) => {
  res.send("Hello World!");
});
server.listen(port, () => {
  console.log(`app is listening on port ${port}`);
})