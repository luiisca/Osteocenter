import tw from 'twin.macro';
import {initializeApollo, addApolloState} from '../../graphql/apolloClient'

import {Button, Heading} from '../../components/Elements';
import Layout from '../../components/Layout';

const Container = tw.div`grid grid-cols-4 gap-2 mx-5 mb-4` 
const Rocket = tw.div`px-6 py-3 w-auto bg-primary-tint-3 rounded-md hover:bg-primary-tint-2 transition-all`

const Blog = (): JSX.Element => {
  const {loading, error, data} = useLaunchListQuery()

  if (error) return <div>Error loading posts.</div>
  if (loading) return <div>Loading more posts besides the ones cached</div>

  return (
    <Layout>
      <Heading tw='mx-5' secondary >SpaceX Launch Missions</Heading>
      <Container>
        {data?.launches?.map((launch) => {
          return (
            <Rocket key={launch?.flight_number}>
              <Heading subHeading>Fly {launch?.flight_number}</Heading>
              <Heading tertiary>{launch?.mission_name}</Heading>
              <p>Launch Year: {launch?.launch_year}</p>
              <p>Flight number: {launch?.flight_number}</p>
            </Rocket>
          )
        })}
      </Container>

      <Button tw='mx-5' elType='text' href="" cta onClick={(e: any) => {
        e.preventDefault()
        const newPok = {
          "pokemon_name": "pikacho",
          "pokemon_id": 1,
          "pokemon_type": "rock",
          "pokemon_avatar_url": "/some.png"
        }
        createFavorite(newPok)
      }}>New Rocket</Button>
    </Layout>
  )
}
export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: LaunchListDocument
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
      {params: {blog: 'second-post'}},
    ],
    fallback: true,
  }
}

export default Blog
