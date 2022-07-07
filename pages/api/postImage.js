import FormData from "form-data";
import fs from "fs";
import initMiddleware from "../../lib/init-middleware";
import parseMultipartForm from "../../lib/multipartParser";

// Iwant to use raw data
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: false,
  },
};

// https://github.com/crisner1978/blugenix-blog
const multipartParser = initMiddleware(parseMultipartForm);

export default async function handler(req, res) {
  // initialize Middleware
  await multipartParser(req, res);

  // file upload to GraphCMS
  const { featuredImage } = req.files;

  const form = new FormData();

  // expose raw data from File (imgObj) and save it on form
  // Form must store the image under a 'fileUpload' field for the server to extract it
  form.append("fileUpload", fs.createReadStream(featuredImage.filepath));

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  // try: res.json
  // catch: if axiosEror => if error.response => reponse.data, else => no response from server, if !axiosErrors => typeerror, syntax, url is not even a url
  
  const upload = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHCMS_ASSET_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_PAT}`,
      },
      body: form,
    }
  ).then((res) => res.json());
  console.log(upload);

  try {
    if (upload) {
      return res.status(200).json({ id: upload.id });
    }
  } catch (error) {
    console.log(error);
  }
}
