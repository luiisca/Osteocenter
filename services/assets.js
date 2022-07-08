import axios from "axios";

export const postImageAsset = async (obj) => {
  const result = await axios.post("/api/postImage", obj);

  console.log(result);
  return result.json();
};
