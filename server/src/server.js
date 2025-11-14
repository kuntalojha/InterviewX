import expressm from 'express';
import mongoose from 'mongoose';

const app = expressm();

app.get("/health", (req, res) => {
  res.status(200).json({message: "Api is setup and running."})
});


app.listen(process.env.PORT, () => console.log(`server is running on http://localhost:${process.env.PORT}`));