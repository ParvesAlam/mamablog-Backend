const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


// // Connect MongoDB at default port 8000.
// let mong = mongoose.connect(process.env.DB_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// }, (err) => {
//     if (!err) {
//         console.log('MongoDB Connection Succeeded.')
//     } else {
//         console.log('Error in DB connection: ' + err)
//     }
// });

const {connect} = require('mongoose')

const connectDB = async()=>{
    try{
        await connect("mongodb+srv://pabelparves:OUyscdMxkwJy6aX4@cluster0.wngxnhu.mongodb.net/?retryWrites=true&w=majority");
        console.log(`Connected to DB`);
    }catch(error){
        console.log(error);
    }
 
}



module.exports = connectDB;