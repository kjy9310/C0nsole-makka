// scripts/generate-blog-list-js.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(__dirname, '../_posts');
const dataDir = path.join(__dirname, '../data');
const outputPath = path.join(dataDir, 'blogList.js');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const posts = fs
  .readdirSync(blogDir)
  .filter((file) => file.endsWith('.mdx'))
  .map((file) => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return {
      slug: file.replace(/\.mdx$/, ''),
      title: data.title || file.replace(/\.mdx$/, ''),
      date: data.date ? new Date(data.date).toISOString() : null,
    };
  });

// Sort posts by date, newest first
posts.sort((a, b) => {
  if (!a.date) return 1;
  if (!b.date) return -1;
  return new Date(b.date) - new Date(a.date);
});

const content = `export const blogList = ${JSON.stringify(posts, null, 2)};\n`;

fs.writeFileSync(outputPath, content);
console.log('✅ data/blogList.js generated with titles and dates.');