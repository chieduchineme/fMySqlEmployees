const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const {getEstMongoDbConnection, ourMySqlConnection} = require("./config/db");


const app = express();

ourMySqlConnection();
getEstMongoDbConnection();
// if(estMongoDbConnection){ 
//    // main(); 
// }

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use(routes);


// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
