const mongoose = require('mongoose');
require("dotenv").config();

async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MongoURI);
        console.log("Connected to MongoDB 🚀 Successfully");
    } catch (err) {
        console.error("Failed to connect MongoDB ❌", err);
        // If database connection failure is critical, halt server startup
        process.exit(1);
    }
}

module.exports = connectToMongoDB;
