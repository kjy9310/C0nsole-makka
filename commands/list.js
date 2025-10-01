// commands/list.js
import { blogList } from '../data/blogList.js';

export default function list() {
  if (!blogList || blogList.length === 0) {
    return { type: 'output', text: '게시된 글이 없습니다.' };
  }

  const header = [
      { type: 'output', text: ' Volume in drive C0nsole Makka' },
      { type: 'output', text: ' Directory of blog\\posts' },
      { type: 'output', text: '' },
  ];

  const footer = [
      { type: 'output', text: '' },
      { type: 'output', text: `     ${blogList.length} File(s)` },
  ];

  const postLines = blogList.map(post => {
    const slug = post.slug
    const date = post.date ? post.date.split('T')[0] : '          ';
    const title = post.title.toUpperCase().padEnd(20, ' ');
    return { type: 'output', text: `${date}    <BLOG>     ${slug}.blog     ${title}` };
  });

  return [...header, ...postLines, ...footer];
}