const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");

const app = express();


const typeDefs = `
    type BookType {
        id: Int!,
        title: String!,
        author: String!,
        date: Int!
    }

    type Query{
        totalBooks: [BookType!]!
    }
`;
const resolvers = {
    Query: {
        totalBooks: () => [
            {
                id: 1,
                title: "Harry Potter and the Chamber of Secrets",
                author: "JK Rowling",
                date: 1998
            },

            {
                id: 2,
                title: "Hunger Games: Catching Fire",
                author: "Suzanne Collins",
                date: 2009
            },

            {
                id: 3,
                title: "Maze Runner",
                author: "James Dashner",
                date: 2009
            },

            {
                id: 4,
                title: "Lord of the Rings",
                author: "J.R.R Tolkien",
                date: 1954
            },

            {
                id: 5,
                title: "Game of Thrones",
                author: "George R.R Martin",
                date: 1996
            }
        ],
    },
};
let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();
const httpserver = http.createServer(app);

app.listen(4000, function () {
    console.log(`server running on port 4000`);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});