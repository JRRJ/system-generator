const express = require('express');
const apiRoutes = require('./api/routes.js');
const path = require('path');

const app = express();

app.set('json spaces', 2);
app.use('/api', apiRoutes);

app.use(express.static('./public'));

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
