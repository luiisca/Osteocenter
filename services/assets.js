import axios from "axios";

export const postImageAsset = async (obj) => {
  const result = await axios("/api/postImage", {
    method: "POST",
    body: obj,
  });

  return result.json();
};
