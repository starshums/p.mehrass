require("dotenv").config();
const express = require("express");
const cors = require("cors");
const controller = require("./controllers");
const routes = require("./routes");
const path = require('path');
const { PORT } = process.env;
const app = express();

app.listen(PORT, () => {
    console.log("SERVER STARTED ON PORT " + PORT)
});

app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, '../client/build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build'))
// })

app.use("/api/v1/auth", routes.auth);
app.use("/api/v1/posts", routes.post);
app.use("/api/v1/words", routes.word);

app.get("/", (req, res) => { res.json({ hello: "world"}); });

app.use(controller.notFound);
app.use(controller.errors);