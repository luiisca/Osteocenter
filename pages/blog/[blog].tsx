import tw from 'twin.macro';
import {initializeApollo, addApolloState} from '../../lib/apolloClient'
import {useLaunchListQuery, LaunchListDocument} from '../../generated';

import {Button, Heading} from '../../components/Elements';
import Layout from '../../components/Layout';
import {createFavorite} from '../../services/favorites-service';

interface favouritePokemon {
  pokemon_name: string,
  pokemon_id: number,
  pokemon_type: string
  pokemon_avatar_url: string
}

const Container = tw.div`grid grid-cols-4 gap-2 mx-5 mb-4`
const Rocket = tw.div`px-6 py-3 w-auto bg-primary-tint-3 rounded-md hover:bg-primary-tint-2 transition-all`

const Blog = ({pokemons}: {pokemons: favouritePokemon[]}): JSX.Element => {
  // TODO:
  // 1. Learn how useQuery works, confirm wheter or not it prioritizes cache over request to API and how does it know when use either one or the other
  const {loading, error, data} = useLaunchListQuery()

  if (error) return <div>Error loading posts.</div>
  if (loading) return <div>Loading more posts besides the ones cached</div>

  return (
    <Layout>
      <Heading tw='mx-5' secondary >Favourite Pokemons</Heading>
      {pokemons?.length && (
        <Heading subHeading tw='mx-5 mb-3'>{pokemons.length} pokemons</Heading>
      )}
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
        const newPok: favouritePokemon = {
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
