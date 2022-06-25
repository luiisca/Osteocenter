import tw from 'twin.macro';
import {Button, Heading} from '../../components/Elements';
import Layout from '../../components/Layout';
import {createFavorite, getFavorites} from '../../services/favorites-service';

interface favouritePokemon {
  pokemon_name: string,
  pokemon_id: number,
  pokemon_type: string
  pokemon_avatar_url: string
}

export async function getStaticProps() {
  const pokemons = await getFavorites()

  return {
    props: {pokemons},
    revalidate: 10,
  }
}
const Container = tw.div`grid grid-cols-4 gap-2 mx-5 mb-4`
const Pokemon = tw.div`px-6 py-3 max-w-[400px] bg-primary-tint-3 rounded-md`

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

const Blog = ({pokemons}: {pokemons: favouritePokemon[]}): JSX.Element => {
  return (
    <Layout>
      <Heading tw='mx-5' secondary >Favourite Pokemons</Heading>
      {pokemons?.length && (
      <Heading subHeading tw='mx-5 mb-3'>{pokemons.length} pokemons</Heading>
      )}
      <Container>
        {pokemons?.map((pokemon: favouritePokemon) => {
          return (
            <Pokemon key={pokemon.pokemon_id} >
              <Heading subHeading>{pokemon.pokemon_name}</Heading>
              <p>{pokemon.pokemon_type}</p>
            </Pokemon>
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
      }}>New Favourite</Button>
    </Layout>
  )
}
export default Blog
