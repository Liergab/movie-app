import mongoose from "mongoose";


const db = async() => {
    try {
        const connectdb = await mongoose.connect(process.env.MONGODB_URL)
            console.log(`Connected: ${connectdb.connection.host} ${connectdb.connection.name} 🚀`)
    } catch (error) {

        console.log(error)
        process.exit(1)
    }

}

export default db