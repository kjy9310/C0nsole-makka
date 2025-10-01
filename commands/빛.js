// commands/빛.js

export default function 빛(triggerFlash) {
  triggerFlash();
  return { type: 'output', text: 'let there be light' };
}