import mongoose from "mongoose";

const connection = {
  isConnected: 0,
};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI);

  connection.isConnected = db.connections[0].readyState;
  console.log("Connection to DB established");
}
// const dbConnect = async () => {
//   if (mongoose.connection.readyState >= 1) {
//     return;
//   }

//   return mongoose.connect(process.env.MONGODB_URI);
// };

export default dbConnect;
