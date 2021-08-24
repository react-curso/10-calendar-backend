const mongoose = require('mongoose')

const connectionDB = async () => {
    try {

       await mongoose.connect(process.env.DB_MONGO,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
            console.log('DB is connected');
    } catch (error) {

        console.log(error)
        throw new Error('Error in database')

    }

}

module.exports = connectionDB