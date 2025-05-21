const mongoose = require('mongoose');

const connectDb = async () => {
    try{ 
         const testString = "mongodb://127.0.0.1:27017/ReactDb";

        await mongoose.connect(testString)
        console.log("Connect has been build successfully");
    }
    catch(err){
        console.log("some error has been happened during connection" +err)
    }
}

export default connectDb;