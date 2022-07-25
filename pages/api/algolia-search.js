import algoliasearch from 'algoliasearch';
import sanityClient from '@sanity/client';
import indexer, { flattenBlocks } from 'sanity-algolia';

const algolia = algoliasearch(...);
const sanity = sanityClient(...);

export default async function handler(req, res) {
  const sanityAlgolia = indexer(
    {
      post: {
        index: algolia.initIndex('posts'),
      },
    },
    document => {
      switch (document._type) {
        case 'post':
          return {
            title: document.title,
            path: document.slug.current,
            publishedAt: document.publishedAt,
            excerpt: flattenBlocks(document.excerpt),
          };
        default:
          throw new Error(`Unknown type: ${document.type}`);
      }
    }
  );

  return sanityAlgolia
    .webhookSync(sanity, req.body)
    .then(() => res.status(200).send('ok'));
}
