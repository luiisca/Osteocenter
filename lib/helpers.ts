export const toSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, "")
    .replace(/[\W-]+/g, "");
};

