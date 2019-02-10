import { ApolloServer } from "apollo-server";
import gql from 'graphql-tag'

const typeDefs = gql`

    enum WIND_STATUS {

        notFinish
    }

    type City {
        name: String
        id: ID @auth
    }

    type Weather {
        cityName: String
        rain: Boolean
        wind: Int
    }



    type Query {
    }

    type Mutation{
        fromCity(input: City!): Weather,
    }
`

const resolvers = {
    Query: {
    },
    Mutation: {
        fromCity(_, args, context, info) {
            // hook up the weather fetch here
            return {
                cityName: args.input.name,
                rain: true,
            }
        },

    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context({req}) {
        //Using this to check on the directive for the authentication. you need to add a field "authentication" to the server
        return {isAuth: req.headers.authorization}
    },
    formatError(e) {
        return e.message;
    }

})

server.listen()
    .then((url) => {console.log(url.port)})
    .catch()