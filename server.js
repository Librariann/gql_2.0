import {ApolloServer, gql} from "apollo-server";

const typeDefs = gql`
  type User {
    id:ID
    username:String
  }
  type Tweet {
    id: ID
    text: String
    author: User
  }
  type Query {
    allTweets: [Tweet]
    tweet(id: ID!): Tweet!
  }
  type Mutation {
    postTweet(text:String, userId:ID): Tweet
    deleteTweet(id:ID): Boolean
  }
`;
//Query -> Get.. 데이터만 받아볼수있음..
//Mutation -> Post, Put, Delete를 할때.. -> 데이터 수정이 있을경우!
//'!'가 없으면 null 가능 '!'가 붙으면 Null이 올경우 에러 

const server = new ApolloServer({typeDefs})

server.listen().then(({url}) => {
  console.log(`Running on ${url}`);
})