import { postImageAsset } from "../services/assets";
export const toSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, "")
    .replace(/[\W-]+/g, "");
};

interface Uploaded {
  type: "data" | "error";
}
interface UploadedData extends Uploaded {
  id: string;
}
interface UploadedError extends Uploaded {
  message: string;
}
interface FailedImgData {
  id: number;
  file: any;
  form: {};
  uploaded: UploadedData | UploadedError;
  published: boolean;
  children: any;
  caption: any;
}

let crrAttempts = 1;
const MAX_ATTEMPTS = 3;

const postImage = async (form: {}) => {
  const data = await postImageAsset(form);
  return data;
};

const publishImage = async (id: string, publishImageAsset: any) => {
  const { data } = await publishImageAsset({
    variables: {
      id: id,
    },
  });
  const publishAsset = data?.publishAsset;
  const imgDetails = {
    src: publishAsset?.url,
    type: "image",
    title: publishAsset?.fileName,
    width: publishAsset?.width,
    handle: publishAsset?.handle,
    height: publishAsset?.height,
    mimeType: publishAsset?.mimeType,
  };

  return imgDetails;
};
const deleteImage = async (id: string, deleteImageAsset: any) => {
  await deleteImageAsset({
    variables: {
      id: id,
    },
  });
};

export const rebuildImgNodes = (
  content: Array<{ type: string; url?: string }>,
  publishImageAsset: any,
  deleteImageAsset: any,
  setContImgErr: any,
  setCrticalContImgsError: any
): {}[] | null => {
  let contentNodes = [...Array(content.length)];
  let failedImgs: Array<FailedImgData | undefined> = [...Array(content.length)];
  let postedImgIds: Array<string> = [];

  // try to upload and to publish all images
  if (failedImgs.length === 0) {
    let form: any;
    let uploaded: UploadedError | UploadedData;
    let imgDetails: any;

    content.forEach(async (contentNode: any, id: number) => {
      contentNodes[id] = contentNode;
      console.log("On each content node");

      if (contentNode.type === "img") {
        // transform base64 string to File object
        console.log("On each IMG content node");
        const file = dataURLtoFile(
          contentNode.url as string,
          `content-image-${id + 1}`
        );

        form = new FormData();
        form.append("img", file);

        uploaded = await postImage(form);

        // img succesfully uploaded
        if ("id" in uploaded) {
          console.log("On each IMG content node, image uploaded", uploaded);
          postedImgIds.push(uploaded.id);
          imgDetails = await publishImage(uploaded.id, publishImageAsset);
        }
        if (!("id" in uploaded) || !imgDetails) {
          // setContImgErr({imgName: file.name})
          console.log(
            "On each IMG content node, image NOT uploaded or NOT published",
            uploaded,
            imgDetails
          );
          failedImgs[id] = {
            id,
            file,
            form,
            uploaded,
            published: false,
            children: node.children,
            caption: node.caption,
          };
        } else {
          // if image is both uploaded and published

          console.log(
            "On each IMG content node, img uploaded AND published",
            uploaded,
            imgDetails
          );
          contentNodes[id] = {
            ...imgDetails,
            children: node.children,
            caption: node.caption || {
              text: "",
            },
          };
        }
      }
    });
  }

  // if some image wasnt uploaded or published retry only 3 times
  while (
    !failedImgs.every((e) => e === undefined) &&
    crrAttempts <= MAX_ATTEMPTS
  ) {
    console.log("On some img failed or undefined", failedImgs);
    let uploaded: UploadedData | UploadedError;
    let imgDetails: any;

    failedImgs.forEach(async (img, id) => {
      if (img) {
        console.log("On img failed");
        if (img.uploaded.type === "error") {
          uploaded = await postImage(img.form);
          if ("id" in uploaded) {
            console.log("On img failed, img uploaded", uploaded);
            postedImgIds.push(uploaded.id);
            imgDetails = await publishImage(uploaded.id, publishImageAsset);
          }
        }
        if ("id" in uploaded && !img.published) {
          console.log(
            "On img failed, img uploaded, not published",
            uploaded,
            imgDetails
          );
          imgDetails = await publishImage(uploaded.id, publishImageAsset);
        }

        if (!("id" in uploaded) || !imgDetails) {
          // setContImgErr({imgName: img.file.name})
          console.log(
            "On img failed, img NOT uploaded or NOT published",
            uploaded,
            imgDetails
          );
          failedImgs.push({
            id,
            file: img.file,
            form: img.form,
            uploaded,
            published: false,
            children: img.children,
            caption: img.caption,
          });
        } else {
          // if it is both uploaded and published
          console.log(
            "On img failed, img uploaded AND published",
            uploaded,
            imgDetails
          );
          failedImgs[id] = undefined;
          contentNodes[id] = {
            ...imgDetails,
            children: img.children,
            caption: img.caption || {
              text: "",
            },
          };
        }
      }
    });

    crrAttempts++;
  }

  if (failedImgs.length !== 0) {
    // set a different error message telling the user to reload the page
    // setCrticalContImgsError("Problemas de conexion por favor recarga la pagina");
    // delete every already created image on the db
    console.log("On absolute fail", failedImgs, postedImgIds);
    postedImgIds.forEach(
      async (id: string) => await deleteImage(id, deleteImageAsset)
    );

    return null;
  } else {
    return contentNodes;
  }
};

function dataURLtoFile(dataurl: string, filename: string) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)![1],
    filename = `${filename}.${mime.split("/")[1]}`,
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export const toRichTextFormat = (content: {}[]) => {
  return {
    children: content,
  };
};
