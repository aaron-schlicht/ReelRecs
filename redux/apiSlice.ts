import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FullMovie, Keyword, Movie, Service } from "../constants";

export interface SearchResults {
  results: Movie[];
}

export interface KeywordSearchResults {
  results: Keyword[];
}

const API_KEY = "f03e1c9e7d2633ef0b20ab2c36cddb39";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getSearchResults: builder.query<SearchResults, string>({
      query: (str) =>
        `/search/movie?api_key=${API_KEY}&query=${str}&adult=false&language=en-US&page=1`,
    }),
    getMovieInfo: builder.query<FullMovie, number>({
      query: (id) =>
        `/movie/${id}?api_key=${API_KEY}&adult=false&language=en-US`,
    }),
    getProviders: builder.query<any, number>({
      query: (id) =>
        `/movie/${id}/watch/providers?api_key=${API_KEY}&language=en-US`,
    }),
    getMovieRecommendations: builder.query<any, number>({
      query: (id) =>
        `/movie/${id}/recommendations?api_key=${API_KEY}&adult=false&language=en-US&page=1`,
    }),
    getKeywordSearchResults: builder.query<KeywordSearchResults, string>({
      query: (str) => `/search/keyword?api_key=${API_KEY}&query=${str}&page=1`,
    }),
  }),
});

export const {
  useGetSearchResultsQuery,
  useGetMovieInfoQuery,
  useGetMovieRecommendationsQuery,
  useGetProvidersQuery,
  useGetKeywordSearchResultsQuery,
  useLazyGetKeywordSearchResultsQuery,
} = apiSlice;
