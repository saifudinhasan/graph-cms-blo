// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Any files inside the folder pages/api is mapped to /api/*
// And will be treated as an API endpoint instead of a page
// example : this file mapped to /api/comments

import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const graphCMSToken = process.env.GRAPHCMS_TOKEN

export default async function comments(req, res) {

  const { name, email, slug, comment } = req.body

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphCMSToken}`
    },
  })

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) { id }
    }
  `
  try {

    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result)

  } catch (error) {
    console.log(error)
  }
}
