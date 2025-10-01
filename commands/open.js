// commands/open.js

import router from 'next/router';
import { blogList } from '../data/blogList';

export default async function open(filename) {
  console.log('filename', filename)
  if (typeof filename !== 'string' || filename.trim() === '') {
    return [{ type: 'output', text: '❗ 파일명을 입력해주세요. 예: open hello.blog' }];
  }

  if (!filename.endsWith('.blog')) {
    return [{ type: 'output', text: '📛 확장자는 .blog 여야 합니다' }];
  }

  const slug = filename.replace(/\.blog$/, '');

  if (!blogList.find(blog=>blog.slug===slug)) {
    return [{ type: 'output', text: `❓ 존재하지 않는 블로그: ${filename}` }];
  }

  await router.push(`/blog/${slug}`);
  return [{ type: 'output', text: `📖 ${filename} 열기 완료` }];
}
