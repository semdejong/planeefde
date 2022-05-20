require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const path = require("path");

const app = express();

const port_number = process.env.PORT || 7000;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connection established"));

const whitelistNA = process.env.ORIGIN;
const whitelist = [...whitelistNA.split(",")];
whitelist.push("http://localhost:3000");
whitelist.push("http://localhost:7000");

// app.use(
//   cors({
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     origin: function (origin, callback) {
//       if (!origin || whitelist.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS" + origin));
//       }
//     },
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   })
// );
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(express.static(path.resolve(__dirname, "../client/build")));
//Uncomment to use an upload folder called uploads
//app.use(express.static('uploads'));

//Add routes
const testRouter = require("./routes/test");
app.use("/ping", testRouter);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const setupRouter = require("./routes/setup");
app.use("/setup", setupRouter);

const userRouter = require("./routes/user");
app.use("/user", userRouter);

const roleRouter = require("./routes/roles");
app.use("/role", roleRouter);

const projectRouter = require("./routes/project");
app.use("/project", projectRouter);

const imageRouter = require("./routes/image");
app.use("/image", imageRouter);

const leadRouter = require("./routes/lead");
app.use("/lead", leadRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port_number, () =>
  console.log("Server listening on port " + port_number)
);
