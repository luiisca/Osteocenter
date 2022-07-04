export const postImageAsset = async (obj) => {
  const result = await fetch("/api/postImage", {
    method: "POST",
    body: obj,
  });

  return result.json();
};
