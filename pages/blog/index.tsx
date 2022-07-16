import { GetStaticProps } from "next";
// import Image from "next/image";
import Link from "next/link";
import tw from "twin.macro";
import { overlayDrafts, getClient } from "../../lib/sanity/sanity.server";
import { indexQuery } from "../../lib/sanity/queries";

import Layout from "../../components/Layout";
import { Heading } from "../../components/Elements";
import Date from "../../components/Blog/Date";

// import { FiEdit } from "react-icons/fi";

const Articles = tw.div`grid grid-cols-2 gap-2 mx-5 mb-4`;
const Article = tw.div`px-6 py-3 w-auto bg-primary-tint-3 rounded-md hover:bg-primary-tint-2 transition-all`;
const Category = tw.span`inline-block py-2 px-4 bg-primary-shade-1 hover:bg-primary-shade-2 rounded-lg text-white`;
const ImgWrap = tw.div`w-full h-[300px] max-w-[550px] relative`;

const Blog = ({
  allPosts,
  preview,
}: {
  allPosts: any;
  preview: boolean;
}): JSX.Element => {
  return (
    <Layout>
      <Heading primary tw="m-5">
        Blog
      </Heading>
      <Articles>
        {allPosts?.map((post: any) => {
          return (
            <Article key={post._id}>
              <Link href={`/blog/${post.slug}`}>
                <a>
                  <Heading subHeading>
                    <Date dateString={post.date} />
                  </Heading>
                  {/*
                  <ImgWrap>
                    <Image
                      src={post.coverImage?.url}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </ImgWrap>
                  */}
                  <Heading tertiary>{post.title}</Heading>
                  <p>{post.excerpt}</p>
                  {post.categories.map((category: any) => (
                    <Category key={category._id} tw="mt-3">
                      {category.name}
                    </Category>
                  ))}
                </a>
              </Link>
            </Article>
          );
        })}
      </Articles>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{
  allPosts: any;
  preview: boolean;
}> = async ({ preview = false }) => {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));

  return {
    props: {
      allPosts,
      preview,
    },
  };
};

export default Blog;
