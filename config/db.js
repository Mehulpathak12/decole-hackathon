const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://mehulpathak48:mehulpathak48@cluster0.upodq.mongodb.net/dez-hack");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB");
});