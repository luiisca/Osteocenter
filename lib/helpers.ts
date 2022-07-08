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
interface ImageState {
  form: {};
  id: number;
  uploaded: UploadedData | UploadedError;
  published: boolean;
  children: any;
  caption: any;
}

let crrAttempts = 1;
const MAX_ATTEMPTS = 3;

const postImage = async (form: {}, postImageAsset: any) => {
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
  imageState: Array<ImageState> | [],
  setFailedImgsState: any,
  setCrticalImgsError: any
) => {
  let failedImgs: Array<ImageState> = [];

  let postedImgIds: Array<string> = [];

  let imgNodes = [...Array(content.length)];

  // try to upload and to publish all images
  if (setFailedImgsState.length === 0) {
    let form: any;
    let uploaded: UploadedError | UploadedData;
    let imgDetails: any;

    content.forEach(async (node: any, id: number) => {
      imgNodes[id] = node;

      if (node.type === "img") {
        const file = dataURLtoFile(
          node.url as string,
          `content-image-${id + 1}`
        );

        form = new FormData();
        form.append(`content-image-${id + 1}`, file);

        uploaded = await postImage(form, postImageAsset);
        if ("id" in uploaded) {
          postedImgIds.push(uploaded.id);
          imgDetails = await publishImage(uploaded.id, publishImageAsset);
        }
        if (!("id" in uploaded) || !imgDetails) {
          setFailedImgsState([
            ...imageState,
            {
              id,
              form,
              uploaded,
              published: false,
              children: node.children,
              caption: node.caption,
            },
          ]);
          failedImgs.push({
            id,
            form,
            uploaded,
            published: false,
            children: node.children,
            caption: node.caption,
          });
        } else {
          // if it is both uploaded and published

          imgNodes[id] = {
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
  while (failedImgs.length !== 0 && crrAttempts <= MAX_ATTEMPTS) {
    let uploaded: UploadedData | UploadedError;
    let imgDetails: any;

    failedImgs.forEach(async (img, id) => {
      if (img.uploaded.type === "error") {
        uploaded = await postImage(img.form, postImageAsset);
        if ("id" in uploaded) {
          postedImgIds.push(uploaded.id);
          imgDetails = await publishImage(uploaded.id, publishImageAsset);
        }
      }
      if ("id" in uploaded && !img.published) {
        imgDetails = await publishImage(uploaded.id, publishImageAsset);
      }

      if (!("id" in uploaded) || !imgDetails) {
        setFailedImgsState([
          ...imageState,
          {
            id,
            form: img.form,
            uploaded,
            published: false,
            children: img.children,
            caption: img.caption,
          },
        ]);
        failedImgs.push({
          id,
          form: img.form,
          uploaded,
          published: false,
          children: img.children,
          caption: img.caption,
        });
      } else {
        // if it is both uploaded and published
        imgNodes[id] = {
          ...imgDetails,
          children: img.children,
          caption: img.caption || {
            text: "",
          },
        };
      }
    });

    crrAttempts++;
  }

  if (failedImgs.length !== 0) {
    // set a different error message telling the user to reload the page
    setCrticalImgsError("Problemas de conexion por favor recarga la pagina");
    // delete every already created image on the db
    postedImgIds.forEach(
      async (id: string) => await deleteImage(id, deleteImageAsset)
    );

    return null;
  } else {
    return imgNodes;
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
