const mongoose = require('mongoose');

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("db connected successfully");
    } catch (error) {
        console.log("err connexting to db");
    }
};

module.exports = dbconnect;
