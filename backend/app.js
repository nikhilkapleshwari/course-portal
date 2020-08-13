let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db');
  var createError = require('http-errors')

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

// Set up express js port
const studentRoute = require('./routes/student.route')
const userRoute = require('./routes/user.route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// Setting up static directory
app.use(express.static(path.join(__dirname, 'dist/student-portal')));


// RESTful API root
app.use('/api', studentRoute)
app.use('/api', userRoute)

app.get('/home/login',(req,res)=>{
	console.log('login request');
	res.sendFile(path.join(__dirname,'dist/student-portal/index.html'));
});

// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
	console.log('req called...');
  next(createError(404,'Please do not hit refresh'));
});

// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/student-portal/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  console.error('Error msg:'+err.message);
  console.error('Error statuscode:'+err.statusCode);
  if (!err.statusCode) err.statusCode = 500;
  //res.status(err.statusCode).send(err.message);
  res.sendFile(path.join(__dirname, 'dist/student-portal/index.html'));
});
