require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const movieRoutes = require('./routes/movie.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movies', movieRoutes);

app.use(errorMiddleware);

module.exports = app;
