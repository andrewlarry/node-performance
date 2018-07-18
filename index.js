const express = require('express');

const app = express();

// Mock function to slow down server
function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

app.get('/', (req, res) => {
  // Blocking the event loop
  doWork(5000);

  res.send('Hello World!');
});

app.listen(3000);