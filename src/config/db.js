const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://DiegoLlanes:fastpassword@cluster0.t6hxa.mongodb.net/books-db?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(e){ 
        console.log(`Error: ${e.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;