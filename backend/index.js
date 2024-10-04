import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
const app = express();

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
 app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});
