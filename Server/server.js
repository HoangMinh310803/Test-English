const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./Route/authRoutes");
const examRoutes = require("./Route/examRoutes");
const cors = require("cors");

connectDB();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // nếu cần gửi cookie/token
  })
);

app.get("/", async (req, res) => {
  try {
    res.send({ message: "Welcome to Practical Exam!" });
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.use(express.json());
app.use("/", authRoutes);
app.use("/", examRoutes);

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
