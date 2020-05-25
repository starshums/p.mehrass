const mongoose = require("mongoose");
// Mongoose setup
mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (error) => {
    if(error) throw error;
    console.log("MongoDB STARTED.");
});


module.exports.User = require("./user");
module.exports.Post = require("./post");
module.exports.Word = require("./word");
module.exports.mongoose = mongoose;