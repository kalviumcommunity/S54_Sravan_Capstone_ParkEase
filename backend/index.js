const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config()
app.use(cors(
  {
    origin: ['https://parkez.vercel.app','http://localhost:5173', 'https://parkease-six.vercel.app'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type',
    credentials: true,
  }
));
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
const fileUploadRouter = require("./routes/FileUpload");
app.use('/spaces', SpacesRouter);
app.use("/api/fileupload", fileUploadRouter);