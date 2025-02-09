const { createWriteStream } = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");

// Define the list of your routes
const routes = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "weekly", priority: 0.8 },
  { url: "/services", changefreq: "weekly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.6 },
  // Add all your routes here
];

// Generate the sitemap
const generateSitemap = async () => {
  const sitemapStream = new SitemapStream({
    hostname: "https://skylap.in/", // Replace with your domain
  });

  const writeStream = createWriteStream("./public/sitemap.xml"); // Save in the 'public' folder
  sitemapStream.pipe(writeStream);

  routes.forEach((route) => {
    sitemapStream.write(route);
  });

  sitemapStream.end();

  const sitemap = await streamToPromise(sitemapStream);
  console.log("Sitemap generated successfully!");
  return sitemap.toString();
};

generateSitemap().catch((err) => console.error("Error generating sitemap:", err));
