import formidable from "formidable";
import sharp from "sharp";

const form = formidable({ multiples: true });

export default async function parseMultipartForm(req, res, next) {
  const contentType = req.headers["content-type"];
  if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
    console.log("OUTSIDE FORM.PARSE", req.body, req);
    form.parse(req, (err, fields, files) => {
      if (!err) {
        console.log("INSIDE FORM.PARSE", req.body, fields, files);
        req.body = fields;
        req.files = files;
      }
      next();
    });
  } else {
    next();
  }
}
