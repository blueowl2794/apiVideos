const express = require('express');
// const cors = require('cors');
const app = express();
const { sequelize } = require('./models/index');
const routes = require('./routes/index')

const PORT = process.env.PORT || 3000;
// const ruta =['http://localhost:3001'];

// app.use(cors({origin: ruta}));

app.use(express.static('./upload'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', routes);

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);

  sequelize.authenticate().then(() => {
      console.log('Db Is connect');
  })
});