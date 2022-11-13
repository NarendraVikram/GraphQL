const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;

const mongoose = require('mongoose');

const schema = require('./Schema/schema');

const app = express();

mongoose.connect('mongodb+srv://gql-vikram:vikram123@cluster0.rg4rq8g.mongodb.net/test');

mongoose.connection.once('open', () => {
  console.log("connected to Database");
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}));

app.listen(4000, () => {
  console.log('Now listening on port 4000');
})
