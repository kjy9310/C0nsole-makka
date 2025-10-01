import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import DosPrompt from '@/components/DosPrompt';

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), '_posts');
  const slugs = fs.readdirSync(postsDir).filter(file => file.endsWith('.mdx'));

  const paths = slugs.map(filename => ({
    params: { slug: path.basename(filename, '.mdx') }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), '_posts', `${params.slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(fileContent);
  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      mdxSource,
      frontmatter: data,
    },
  };
}

export default function BlogPost({ mdxSource, frontmatter }) {
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);

  const toggleTerminalVisibility = () => {
    setIsTerminalVisible(prev => !prev);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        body {
          background-color: #0A0A0A;
        }
        pre {
          background-color: #050505; // Slightly different background
          border: 1px solid #00FF41;
          padding: 1rem;
          overflow-x: auto; // Handle long lines of code
        }
        code {
          font-family: 'VT323', monospace; // Ensure code also uses the mono font
          text-shadow: none; // Code blocks often look better without text-shadow
        }
      `}</style>
      <div style={{
        fontFamily: "'VT323', monospace",
        color: '#00FF41',
        background: '#000',
        border: '2px solid #00FF41',
        boxShadow: '0 0 15px rgba(0, 255, 65, 0.5)',
        padding: '2rem',
        maxWidth: '800px',
        margin: '4rem auto',
        textShadow: '0 0 8px rgba(0, 255, 65, 0.7)',
        paddingBottom: '40vh',
      }}>
        {frontmatter.title && <h1>{frontmatter.title}</h1>}
        {frontmatter.date && <p style={{ opacity: 0.7, marginTop: '-1rem' }}>{frontmatter.date}</p>}
        <hr style={{borderColor: '#00FF41', opacity: 0.3}} />
        <MDXRemote {...mdxSource} />
      </div>
      <div style={{
        position: 'fixed',
        bottom: isTerminalVisible ? '3vh' : '-30vh',
        left: 0,
        width: '100%',
        height: '35vh',
        transition: 'bottom 0.3s ease-in-out',
      }}>
        <DosPrompt mini onToggleVisibility={toggleTerminalVisibility} isTerminalVisible={isTerminalVisible} />
      </div>
    </>
  );
}
