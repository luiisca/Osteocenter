const siteUrl = "https://osteocenter.vercel.app/";
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ["/pages/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://osteocenter.vercel.app/server-sitemap.xml"],
  },
};
