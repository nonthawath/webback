var mongoose = require('mongoose')

try {
  var url = `mongodb://${process.env.databaseHost}:${process.env.databasePort}/${process.env.databaseName}`;
  var option =  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    }
  mongoose.connect(url,option)
  console.log('DB Connect..');
} 
catch (error) {
  console.log(error);
}
