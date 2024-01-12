import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { create } from "xmlbuilder";

const baseUrl = "https://phongtro-datngth03.vercel.app"; // Change your base URL

const urls = [
   "/",
   "/cho-thue-can-ho",
   "/cho-thue-phong-tro",
   "/cho-thue-mat-bang",
   "/nha-cho-thue",
   "/tim-kiem",
   "/lien-he",
   "/he-thong/quan-ly-bai-dang",
   "/he-thong/tao-moi-bai-dang",
   // Add other paths of your React application here
];

const urlset = create("urlset", { version: "1.0", encoding: "UTF-8" }).att(
   "xmlns",
   "http://www.sitemaps.org/schemas/sitemap/0.9"
);

urls.forEach((url) => {
   const loc = new URL(url, baseUrl).toString();
   const lastmod = new Date().toISOString();
   urlset.ele("url").ele("loc", loc).up().ele("lastmod", lastmod).up();
});

const xmlString = urlset.end({ pretty: true });

// Define the 'utils' directory path using import.meta.url
const currentModuleUrl = new URL(import.meta.url);
const scriptDirectory = dirname(currentModuleUrl.pathname).slice(1); // remove leading '/'

console.log(currentModuleUrl);
console.log(scriptDirectory);

// Define the outputPath in the same directory as the script
const outputPath = join(scriptDirectory, "sitemap.xml");

// Ensure the directory exists
if (!existsSync(scriptDirectory)) {
   console.log("Directory does not exist, creating...");
   mkdirSync(scriptDirectory, { recursive: true });
} else {
   console.log("Directory exists.");
}

// Check if the file exists
if (existsSync(outputPath)) {
   // File exists, overwrite its content
   writeFileSync(outputPath, xmlString);
   console.log(`Sitemap updated at: ${outputPath}`);
} else {
   // File doesn't exist, create it
   writeFileSync(outputPath, xmlString);
   console.log(`Sitemap created at: ${outputPath}`);
}
