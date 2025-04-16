

const mongoose=require('mongoose');

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected sucessfully')
    } catch (error) {
        console.log('DB connection failed! ')
        exit(1)
    }
}
module.exports=connectDB;