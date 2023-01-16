const mongoose = require("mongoose");
const connection= mongoose.connect("mongodb+srv://rf:1234@cluster0.s6urvdb.mongodb.net/social?retryWrites=true&w=majority");

module.exports={
    connection
}