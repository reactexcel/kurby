// pages/sitemap.xml.js
import { fetchingAllUrl } from "../hooks/url-services";

function generateSiteMap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     ${urls
       .map(({ url }) => {
         if (!url) {
           return;
         }
         return `
           <url>
               <loc>${`${url}`}</loc>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const urls = await fetchingAllUrl();

  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(urls);

  res.setHeader("Content-Type", "text/xml");
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
