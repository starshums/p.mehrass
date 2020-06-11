require("dotenv").config();
const express = require("express");
const cors = require("cors");
const controller = require("./controllers");
const routes = require("./routes");
const path = require('path');
const { PORT } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", routes.auth);
app.use("/api/v1/posts", routes.post);
app.use("/api/v1/words", routes.word);

if( process.env.NODE_ENV === 'production' ) {
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('*', (req, res) => {
        const index = path.join(__dirname, '../client/build/index.html');
        res.sendFile(index);
    });
}

app.use("/", (req, res) => {
    res.send("Bankai!").status(200);
});

app.use(controller.notFound);
app.use(controller.errors);

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT || 5000}`)
});