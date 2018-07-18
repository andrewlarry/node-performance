const cluster = require('cluster');

// Check if the file is being executed on the master
if (cluster.isMaster) {
  // Execute the index file in child mode
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {

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

  app.get('/fast', (req, res) => {
    res.send('Fast!');
  }); 
  app.listen(3000);
}


