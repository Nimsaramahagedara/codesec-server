import mongoose from "mongoose";


export const dbConfig =async () => {
    try {
        await mongoose.connect(process.env.APPSETTING_MONGO_URL, {
            useNewUrlParser: true
        })
        console.log('MongoDb Connected !!');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}