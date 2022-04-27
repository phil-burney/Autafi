const express = require('express');
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post('/api/test', (req, res) => {
  const { name } = req.body;
  res.status(201).json({ message: 'This is just a test' })
})

const PORT = 5000;
const server = app.listen(
  PORT,
  console.log(`Server is listening on port ${PORT}...`)
);

module.exports = { app, server };