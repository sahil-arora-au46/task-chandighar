const mongoose = require("mongoose")
require("dotenv").config();
const connect = async () => {
    try {
      console.log(process.env.MONGODB_URI,process.env.MONGODB_DB_NAME )
      await mongoose.connect(`${process.env.MONGODB_URI}`,{
       dbName : `${process.env.MONGODB_DB_NAME}`
    });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };

module.exports = connect