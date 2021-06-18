const express = require("express");

const dotenv = require("dotenv");

const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

/**Connect to the database */
connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**Listening to the server  */

app.listen(process.env.PORT || 3000, () => console.log("Server is running"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/car", require("./routes/carAPIs"));

app.use("/api/person", require("./routes/peopleAPIs"));

app.use("/api/card", require("./routes/cardAPIs"));
app.use("/api/register", require("./routes/registerAPI"));
app.use("/api/charging", require("./routes/runningAPIs"));
