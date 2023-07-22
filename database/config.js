const mongoose = require('mongoose');

const dbConection = async ()=>{
    try {
        await mongoose.connect(process.env.Mongo_URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('DB CAN`T INICIALIZED');
    }
};

module.exports={
    dbConection
}