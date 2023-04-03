// index.ts file

import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
