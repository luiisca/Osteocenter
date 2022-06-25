import {Button} from '../../components/Elements';
import Layout from '../../components/Layout';
import {getUnicorns, createUnicorn} from '../../services/createUnicorns';

interface unicorn {
  _id: string
  name: string
  age: number
  colour: string
}
interface toCreateUnicorn {
  name: string
  age: number
  colour: string
}

export async function getStaticProps() {
  const unicorns = await getUnicorns()
  console.log(unicorns)

  return {props: {unicorns}}
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
const Blog = ({unicorns}: {unicorns: unicorn[]}): JSX.Element => {
  return (
    <Layout>
      <h1>Some unicorns for you</h1>
      {unicorns?.map((unicorn: unicorn) => {
        return (
          <div key={unicorn._id}>
            <h2>Hello I&apos;m unicorn {unicorn.name}</h2>
            <p>My colour is {unicorn.colour}</p>
            <p>I&apos;m {unicorn.age} yo</p>
            <p>And Imma kill you :)</p>
          </div>
        )
      })}
      <Button elType='text' href="" cta onClick={(e: any) => {
        e.preventDefault()
        const unicorn: toCreateUnicorn = {
          name: '292kd',
          age: 2939,
          colour: 'ldkfjdfkl'
        }
        createUnicorn(unicorn)
      }}>Create new Killer unicorns</Button>
    </Layout>
  )
}
export default Blog
