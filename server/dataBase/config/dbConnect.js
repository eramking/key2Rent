const mongoose = require('mongoose');

// MongoDB Connection Function
const connectDB = async () => {
  try {
    // Properly encode the password with special characters
    const username = 'key2rent_user';
    const password = encodeURIComponent('3!SVc9r!5VMH9EP');
    const cluster = 'key2rentdb.4wtptyd.mongodb.net';
    const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=key2RentDB`;
    
    console.log('Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn; // Return the connection object
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    throw error; // Throw the error to be caught by the caller
  }
};

module.exports = connectDB; 