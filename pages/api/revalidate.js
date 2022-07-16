import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { createClient } from "next-sanity";
import { sanityConfig } from "../../lib/config";

const secret = process.env.SANITY_STUDIO_REVALIDATE_SECRET;
export const config = {
  api: {
    bodyParser: false,
  },
};

const sanityClient = createClient({
  ...sanityConfig,
  useCdn: false,
});

async function readBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

// const AUTHOR_UPDATED_QUERY = `
//   *[_type == "author" && _id == $id] {
//     "slug": *[_type == "post" && references(^._id)].slug.current
//   }["slug"][]`
const POST_UPDATED_QUERY = `*[_type == "post" && _id == $id].slug.current`;

const getQueryForType = (type) => {
  switch (type) {
    // case 'author':
    //   return AUTHOR_UPDATED_QUERY
    case "post":
      return POST_UPDATED_QUERY;
    default:
      throw new TypeError(`Unknown type: ${type}`);
  }
};

const log = (msg, error) =>
  console[error ? "error" : "log"](`[revalidate] ${msg}`);

export default async function revalidate(req, res) {
  const signature = req.headers[SIGNATURE_HEADER_NAME];
  const body = await readBody(req); // Read the body into a string

  if (!isValidSignature(body, signature, secret)) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    return;
  }

  const jsonBody = JSON.parse(body);
  const { _id: id, _type } = jsonBody;

  if (typeof id !== "string" || !id) {
    const invalidId = "Invalid _id";
    log(invalidId, true);
    return res.status(400).json({ message: invalidId });
  }

  log(`Querying post slug for _id '${id}', type '${_type}' ..`);
  const slug = await sanityClient.fetch(getQueryForType(_type), { id });
  const slugs = (Array.isArray(slug) ? slug : [slug]).map(
    (_slug) => `/posts/${_slug}`
  );
  const staleRoutes = ["/", ...slugs];

  try {
    console.log("API/REVALIDATE", jsonBody);
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)));

    const updatedRoutes = `Updated routes: ${staleRoutes.join(", ")}`;
    log(updatedRoutes);

    return res.status(200).json({ message: updatedRoutes });
  } catch (err) {
    log(err.message, true);
    return res.status(500).json({ message: err.message });
  }
}
