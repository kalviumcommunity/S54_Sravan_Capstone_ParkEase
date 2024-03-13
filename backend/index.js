const express = require('express');
const app = express();
const cors = require('cors');


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

app.get('/', (req, res) => {
  res.send('Welcome to ParkEaz!');
});

const PORT = process.env.PORT || 3050;

app.listen(PORT, () => {
  console.log(`Server started listening at ${PORT}`);
});
