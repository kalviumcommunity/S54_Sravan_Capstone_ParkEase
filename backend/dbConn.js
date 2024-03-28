const mongoose = require('mongoose')
require("dotenv").config()

async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MongoURI)
        console.log("Connected to MongoDB 🚀 Successfully")
    }
    catch {
        (err => {
            console.log("Failed to connect MongoDB ❌", err)
        })
    }
}

module.exports = connectToMongoDB