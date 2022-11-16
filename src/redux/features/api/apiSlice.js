import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cocktailsApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SUPABASE_URL,
    prepareHeaders: (headers) => {
      headers.set('apikey', process.env.REACT_APP_ANON_KEY)
      headers.set('Authorization', `Bearer ${process.env.REACT_APP_ANON_KEY}`)

      return headers
    },
  }),
  tagTypes: ['Cocktails'],
  endpoints: (builder) => ({
    getAllCocktails: builder.query({
      query: (orderBy) => `/rest/v1/cocktails?select=*&order=${orderBy}.desc`,
      providesTags: ['Cocktails'],
    }),
    getOneCocktail: builder.query({
      query: (id) => `/rest/v1/cocktails?id=eq.${id}&select=*`,
    }),
    addCocktail: builder.mutation({
      query: (name, method, rating) => ({
        url: '/rest/v1/cocktails',
        method: 'POST',
        body: [{ name, method, rating }],
      }),
      invalidatesTags: ['Cocktails'],
    }),
    updateCocktail: builder.mutation({
      query: (name, method, rating, id) => ({
        url: `/rest/v1/cocktails?id=eq.${id}`,
        method: 'PATCH',
        body: [{ name, method, rating }],
      }),
      invalidatesTags: ['Cocktails'],
    }),
    deleteOneCocktail: builder.mutation({
      query: (id) => ({
        url: `/rest/v1/cocktails?id=eq.${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Cocktails'],
    }),
  }),
})

export const {
  useGetAllCocktailsQuery,
  useGetOneCocktailQuery,
  useAddCocktailMutation,
  useUpdateCocktailMutation,
  useDeleteOneCocktailMutation,
} = cocktailsApi
