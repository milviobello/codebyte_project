require('dotenv').config()
const express = require('express')
const moongose = require('mongoose')
const patientRoutes = require('./routes/patient_record')
const cors = require('cors');

//mongoose.set('strictQuery', false);

// This creates an express app using the module declared above.
const app = express()

// trying to set table using api.get

// middleware
app.use(express.json()) // Allows access to req.body within the varias requests.

const allowedDomains = ['https://codebyte-finalpresentation.onrender.com/', 'http://localhost:3000', "https://codebyte-presentation.onrender.com"];

app.use(cors({
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);
 
    if (allowedDomains.indexOf(origin) === -1) {
      var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/patient_record', patientRoutes)
// app.get("/test", (req,res)=>
// res.send("It works!"))

// connect to the database
moongose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for the requests
    app.listen(process.env.PORT, () => {
      console.log('successfully connected to database npm& listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

