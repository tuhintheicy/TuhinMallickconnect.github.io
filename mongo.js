// we are using mongoose as out ODM but feel free to checkout 
// any other ORM like prisma or you can also use mongodb itself
const mongoose = require('mongoose')

// creating connection to mongodb database
async function connectDatabase() {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = {
    connectDatabase
}