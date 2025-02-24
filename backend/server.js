const express = require("express");
const cors = require("cors");
const path = require("path");
const sensorRoutes = require("./routes/sensorRoutes");
const authenticationRoutes = require("./routes/auth/authenticationRoutes");
const companyRouter = require("./routes/company/companyRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", sensorRoutes);
app.use("/auth", authenticationRoutes);
app.use("/company", companyRouter);

// Serve React build files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});