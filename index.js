const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require('./scr/schema')
const resolvers = require('./scr/resolvers')
const startDatabase = require('./scr/database');
const expressPlayground = require("graphql-playground-middleware-express").default;

// Create a context for holding contextual data 
const context = async () => {
  const db = await startDatabase();

  return { db };
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
    context
  })
);

//Graphql Playground route
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

const port = process.env.PORT || "4000";

app.listen(port);

console.log(`Server ready at http://localhost:4000/graphql`);