const express = require('express');

const app = express();

app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server listening on 5000');
});
