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

  const sitemap = generateSiteMap(urls);

  /**  Set Cache Control in vercel @see https://vercel.com/docs/edge-network/caching#stale-while-revalidate */
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");

  res.setHeader("Content-Type", "text/xml");

  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
