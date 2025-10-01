// components/BlogViewer.jsx

import { useRouter } from 'next/router';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export async function getStaticProps({ params }) {
  const slug = params?.slug || 'hello';
  const filePath = path.join(process.cwd(), 'pages/blog', `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(source);
  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      mdxSource,
      frontMatter: data,
      slug,
    },
  };
}

export default function BlogViewer({ mdxSource, frontMatter, slug }) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Courier New, monospace', color: '#0f0', background: '#000' }}>
      <h1>{frontMatter.title || slug}</h1>
      <MDXRemote {...mdxSource} />
    </div>
  );
}
