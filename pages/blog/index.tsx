import Image from 'next/image';
import tw from 'twin.macro';
import {Heading} from "../../components/Elements"
import Layout from "../../components/Layout"
import {ArticlesDocument, useArticlesQuery} from "../../generated"
import {addApolloState, initializeApollo} from "../../graphql/apolloClient"

const Articles = tw.div`grid grid-cols-4 gap-2 mx-5 mb-4`
const Article = tw.div`px-6 py-3 w-auto bg-primary-tint-3 rounded-md hover:bg-primary-tint-2 transition-all`
const Category = tw.span`inline-block py-2 px-4 bg-primary-shade-1 hover:bg-primary-shade-2 rounded-md`

const Blog = (): JSX.Element => {
  // TODO:
  // 1. Learn how Apollo.useQuery() works, confirm wheter or not it prioritizes cache over request to API and how does it know when use either one or the other
  const {loading, error, data} = useArticlesQuery()

  if (error) return <div>Error loading articles.</div>
  if (loading) return <div>Loading more articles besides the ones cached</div>

  return (
    <Layout>
      <Heading primary>Blog</Heading>
      <Articles>
        {data?.articles?.map((article) => {
          return (
            <Article key={article.id}>
              <Heading subHeading>{article.publishedAt}</Heading>
              <Image
                src={article.featuredImage.url}
                alt={article.title}
                layout='responsive'
                width='1'
                height='1'
                sizes='10vw'
              />
              <Heading tertiary>{article.title}</Heading>
              <p>{article.excerpt}</p>
              {article.categories.map((category) => (
                <Category>{category.name}</Category>
              ))}
            </Article>
          )
        })}
      </Articles>
    </Layout>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ArticlesDocument
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 10
  })
}

export default Blog
