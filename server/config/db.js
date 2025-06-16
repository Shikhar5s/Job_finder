
import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log('✅ MongoDB connected'));

  console.log("Mongo URI →", `${process.env.MONGODB_URI}`); // Debug line

  await mongoose.connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
