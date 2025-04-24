require("dotenv").config();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;


const mongoConnect= (callback) =>{
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;
MongoClient.connect(uri)
  .then((client) => {
    console.log("connected!");
    callback(client); //pass the client to the callback function
  })
  .catch((err) => {
    console.log(err);
  });
};

module.exports = mongoConnect; //export the function to be used in app.js