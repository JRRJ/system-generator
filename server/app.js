const app = require('express')();
const routes = require('./api/routes.js');

app.use('/api', routes);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});