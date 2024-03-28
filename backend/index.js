const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config()
app.use(cors());
app.use(express.json());

// Error Handling Middleware 
app.use((err, req, res, next) => {
  console.error(err.stack); 

  
  res.status(err.statusCode || 500).send({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});
const PORT = process.env.PORT || 3050;

const connectToMongoDB = require('./dbConn')
connectToMongoDB().then(()=>{ 

  app.listen(PORT, () => {
    console.log(`Server started listening at ${PORT}`);
  });

})

app.get('/', (req, res) => {
  res.send('Welcome to ParkEaz!');
});

const SpacesRouter = require("./routes/Spaces")
app.use('/spaces', SpacesRouter);