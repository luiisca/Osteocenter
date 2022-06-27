import tw from 'twin.macro';
import {ArticlesDocument, useArticlesQuery} from "../../generated"
import {initializeApollo, addApolloState} from '../../graphql/apolloClient'

import {Button, Heading} from '../../components/Elements';
import Layout from '../../components/Layout';

const Container = tw.div`grid grid-cols-4 gap-2 mx-5 mb-4`
const Rocket = tw.div`px-6 py-3 w-auto bg-primary-tint-3 rounded-md hover:bg-primary-tint-2 transition-all`

const apolloClient = initializeApollo()

const Blog = (): JSX.Element => {
  const {loading, error, data} = useArticlesQuery()
  const cache = apolloClient.cache.extract()
  console.log(cache)

  if (error) return <div>Error loading article.</div>
  if (loading) return <div>Loading...</div>

  return (
    <Layout>
      <Heading tw='mx-5' secondary >SpaceX Launch Missions</Heading>
      <Container>
        {data?.articles?.map((article) => {
          return (
            <Rocket>
              <Heading primary>{article.title}</Heading>
            </Rocket>
          )
        })}
      </Container>

    </Layout>
  )
}
export async function getStaticProps() {
  await apolloClient.query({
    query: ArticlesDocument
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 10
  })
}

export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      '/blog/first-post',
      // Object variant:
      {params: {slug: 'second-post'}},
    ],
    fallback: true,
  }
}

export default Blog
