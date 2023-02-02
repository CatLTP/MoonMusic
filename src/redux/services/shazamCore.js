import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreAPI = createApi({
  reducePath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "x-rapidapi-key",
        "be703345e9msha2fbe7120974803p1fe3dbjsnd9f477861c55"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: (Listid) =>
        `/charts/track?locale=en-US&listId=${Listid}&pageSize=20&startFrom=0`,
    }),
    getSongDetails: builder.query({
      query: (songKey) =>
        `/shazam-songs/get-details?id=${songKey}&locale=en-US`,
    }),
    getSongDetailsV2: builder.query({
      query: (songId) => `/songs/v2/get-details?id=${songId}&l=en-US`,
    }),
    getChartLists: builder.query({
      query: () => `/charts/list`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongDetailsV2Query,
  useGetChartListsQuery,
} = shazamCoreAPI;
