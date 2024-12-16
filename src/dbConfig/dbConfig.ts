import mongoose from 'mongoose';

export async function connect () {
     try {
       await mongoose.connect(process.env.MONGO_URL!);
       const connection = mongoose.connection;
       connection.on('connected', () => {
          console.log("db connected !");
       })
       connection.on('error', (err) => {
          console.log(`db error `, err);
          process.exit();
       })
     }
     catch (err) {
        console.log(err);
        console.log("Something went wrong !");
     }
}