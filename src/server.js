const express = require('express');
const PORT = 5000;

const app = express();
const routes = require('./routes/router');

app.use(routes);

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))