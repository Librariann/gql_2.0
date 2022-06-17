import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "first hello",
    userId: "2",
  },
  {
    id: "2",
    text: "second hello",
    userId: "1",
  },
];

let users = [
  {
    id: "1",
    firstName: "nico",
    lastName: "las",
  },
  {
    id: "2",
    firstName: "Elon",
    lastName: "musk",
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    """
    full name documentation
    """
    fullName: String!
  }
  """
  tweet object document test
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String, userId: ID): Tweet
    deleteTweet(id: ID): Boolean
  }
`;
//Query -> Get.. 데이터만 받아볼수있음..
//Mutation -> Post, Put, Delete를 할때.. -> 데이터 수정이 있을경우!
//'!'가 없으면 null 가능 '!'가 붙으면 Null이 올경우 에러
//list -> []안에 넣으면됨

//Query안에 Post, Put, Delete같은 기능을 넣어도 되지만
//Mutation으로 나누는 이유는 개념적으로 나눠놓고 코드를 더 잘 작성하기 위함이다.(유지보수 측면)
const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      return users;
    },
  },
  Mutation: {
    //args 순서가 중요하다
    //__ -> root args, 두번째는 받아올 args
    postTweet(__, { text, userId }) {
      const checkUserId = users.find((user) => user.id === userId);
      if (!checkUserId) return false;
      const newTweet = {
        id: tweets.length + 1,
        text,
        userId,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(__, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },
  },
  Tweet: {
    author({ userId }) {
      return users.find((user) => user.id === userId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
