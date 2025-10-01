import fs from 'fs';
import path from 'path';
import DosPrompt from '../components/DosPrompt';

export async function getStaticProps() {
  const blogDir = path.join(process.cwd(), '_posts');
  const files = fs.readdirSync(blogDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));

  return {
    props: {
      blogList: files,
    },
  };
}

export default function Home() {
  return (
    <>
      <style jsx global>{`
        body {
          background-color: #0A0A0A;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
        }
      `}</style>
      <div style={{
        background: '#1c1c1c',
        padding: '2rem',
        border: '2px solid #333',
        borderRadius: '10px',
        boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.5)',
      }}>
        <DosPrompt />
      </div>
    </>
  );
}