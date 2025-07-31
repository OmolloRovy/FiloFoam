import mongoose from "mongoose";

let cacged = global.mongoose

if  (!cached) {
    cached = global.mongoose = { conn: null, promise:null}
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts ={
            bufferComands: false
        }
        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/filofoam`,opts).then(mongoose => {
            return mongoose
        })
    }
    cached.com = await cached.promise
    return cached.conn
}

export default connectDB