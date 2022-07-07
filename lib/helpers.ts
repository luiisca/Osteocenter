import {postImageAsset} from '../services/assets'
export const toSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, "")
    .replace(/[\W-]+/g, "");
};

export const rebuildImgNodes = (
  content: Array<{ type: string; url?: string }>
) => {
  const files = content.map(async (node, index) => {
    let file;
    if (node.type === "img") {
      file = dataURLtoFile(node.url, `content-image-${index + 1}`);

      const form = new FormData()
      form.append(`content-image-${index + 1}`, file)

      const {id: imageId} = await postImageAsset(form)
    }
    return file;
  });

  // return [
  //   {
  // src: string;
  // type: "image";
  // title: string;
  // width: number;
  // handle: string;
  // height: number;
  // caption?: Array<{}>;
  // mimeType: string;
  //   }
  // ]
};

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
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
