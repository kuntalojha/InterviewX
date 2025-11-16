import express from 'express';
import { serve } from 'inngest/express';

// For connecting frontend and backend
import path from 'path';
import cors from 'cors';

// import from lib
import { inngest, functions } from './lib/inngest.js';
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';

const app = express();

// Connection Frontend and Backend
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
// creditals: true meaning -> allow cookes to be sent
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use(
  '/api/inngest',
  serve({
    client: inngest,
    functions,
  })
);

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Api is setup and running.' });
});
app.get('/book', (req, res) => {
  res.status(200).json({ message: 'This is the book endpoint.' });
});

// Make our app for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log('Error starting the server', error);
    process.exit(1); // 0 means success, 1 means failure
  }
};

startServer();
