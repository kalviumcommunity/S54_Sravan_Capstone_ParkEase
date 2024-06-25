const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config()
app.use(cors(
  {
    origin: ['https://parkez.vercel.app','http://localhost:5173'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type',
    credentials: true,
  }    
));
app.use(express.json());


const PORT = process.env.PORT || 3050;

const connectToMongoDB = require('./dbConn')
connectToMongoDB().then(()=>{ 

  app.listen(PORT, () => {
    console.log(`Server started listening at ${PORT}`);
  });

})

app.get('/', (req, res) => {
  res.send('Welcome to ParkEz!');
});

const SpacesRouter = require("./routes/Spaces")
const fileUploadRouter = require("./routes/FileUpload");
const UserRouter = require("./routes/Users")
app.use('/spaces', SpacesRouter);
app.use("/fileupload", fileUploadRouter);
app.use('/users',UserRouter)

// Error Handling Middleware 
app.use((err, req, res) => {
  console.error(err.stack); 
  
  res.status(err.statusCode || 500).send({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});