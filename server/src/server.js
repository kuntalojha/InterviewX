import express from 'express';
// For connecting frontend and backend
import path from 'path';
import { connectDB } from './lib/db.js';

const app = express();


// Connection Frontend and Backend
const __dirname = path.resolve();



app.get("/health", (req, res) => {
  res.status(200).json({message: "Api is setup and running."})
});
app.get("/book", (req, res) => {
  res.status(200).json({message: "This is the book endpoint."})
});


// Make our app for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));


  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist","index.html"));
});
}




const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`)
    });
  } catch (error) {
    console.log('Error starting the server', error);
    process.exit(1); // 0 means success, 1 means failure
  }
};

startServer();