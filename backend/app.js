const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/reviews', reviewRoutes);

app.use('/public', express.static(path.join(__dirname, '/public')));

// Preparing for deployment
// Making the 'build' folder in the frontend as a static folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Any route that is not any of the API routes above is going to point to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

module.exports = app;
