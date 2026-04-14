import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import docRoutes from "./routes/docRoutes";
import cors from "cors";
import chatRoutes from "./routes/chat";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://mood-connect.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

const PORT = process.env.PORT || 3000;

const MONGO_URL = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Mongo Connected");
  } catch (err) {
    console.log("DB connection failed");
    process.exit(1);
  }
};

connectDB();

app.get("/healthz", (req, res) => {
  res.send("OK");
});

app.use("/api/v1/user", authRoutes);
app.use("/api/v1/doctor", docRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
