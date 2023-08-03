const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('DB CAN´T INICIALIZES');
    }
}

module.exports = {
    dbConnection
}