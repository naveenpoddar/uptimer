const mongoose = require('mongoose');

async function connect() {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to Database");
}


module.exports = connect();