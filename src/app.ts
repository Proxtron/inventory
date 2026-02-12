import express from "express";
import "dotenv/config";
import vehicleRouter from "./routes/vehicleRoutes.js";
import modelRouter from "./routes/modelRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/vehicle", vehicleRouter);
app.use("/model", modelRouter);

app.listen(PORT, () => {
    console.log("Listening on port 3000")
});