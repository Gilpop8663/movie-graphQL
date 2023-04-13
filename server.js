import { ApolloServer, gql } from 'apollo-server';
import fetch from 'node-fetch';

const typeDefs = gql`
  type Torrents {
    url: String
    hash: String
    quality: String
    type: String
    seeds: Int
    peers: Int
    size: String
    size_bytes: Int
    date_uploaded: String
    date_uploaded_unix: Int
  }

  type Movie {
    id: Int
    url: String
    imdb_code: String
    title: String
    title_english: String
    title_long: String
    slug: String
    year: Int
    rating: Float
    runtime: Int
    summary: String
    description_full: String
    synopsis: String
    yt_trailer_code: String
    language: String
    mpa_rating: String
    background_image: String
    background_image_original: String
    small_cover_image: String
    medium_cover_image: String
    large_cover_image: String
    state: String
    date_uploaded: String
    date_uploaded_unix: Int
    torrents: [Torrents]
    genres: [String]
  }

  type Query {
    allMovies: [Movie]
    movie: Movie
  }
`;

const resolvers = {
  Query: {
    async allMovies() {
      const fetchedData = await fetch(
        'https://yts.mx/api/v2/list_movies.json'
      ).then(response => response.json());

      return fetchedData.data.movies;
    },
    async movie(root, { id }) {
      const fetchedData = await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      ).then(response => response.json());

      return fetchedData.data.movie;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
