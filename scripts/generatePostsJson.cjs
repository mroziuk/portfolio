const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, '..', 'public', 'posts');
const outputFile = path.join(__dirname, '..', 'public', 'posts.json');

const files = fs.readdirSync(postsDir);
const posts = [];

files.forEach((file) => {
  if (path.extname(file) !== '.md') return;

  const filePath = path.join(postsDir, file);
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(rawContent);

  posts.push({
    ...data,
    slug: file.replace(/\.md$/, ''),
  });
});

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
    