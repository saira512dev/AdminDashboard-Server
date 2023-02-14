import mongoose from 'mongoose';

console.log("🚀 ~ file: database.js:6 ~ connectDB ~ process.env.MONGO_URL", process.env.MONGO_URL)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export default connectDB
