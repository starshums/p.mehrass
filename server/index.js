require("dotenv").config();
const express = require("express");
const cors = require("cors");
const controller = require("./controllers");
const routes = require("./routes");
const port = process.env.PORT;
const app = express();

app.listen(port, () => {
    console.log("SERVER STARTED ON PORT " + port)
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => { res.json({ hello: "world"}); });
app.use("/api/auth", routes.auth);
app.use("/api/posts", routes.post);
app.use("/api/words", routes.word);

app.use(controller.notFound);
app.use(controller.errors);