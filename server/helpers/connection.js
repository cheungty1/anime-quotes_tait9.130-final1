// Import Mongoose
const mongoose = require('mongoose');

// Connect to a MongoDB instance
//mongodb://localhost:37017/anime-quote-manager
async function connect(connectionString) {
    console.log("connect")
    try {
        //Connect the client to the server
        const connectionResult = await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true  });
        if (connectionResult) console.log("Connected to MongoDB")
    } catch (err) {
        (err) => console.error("Connection failed", err);
    }
}

module.exports.connect = connect;