/*
 * @Author       : 魏威
 * @Date         : 2024-03-25 09:34
 * @LastEditTime : 2024-03-25 09:43
 * @LastEditors  : Waker
 * @Description  : 获取iconType的脚本
 */

const list = document.querySelectorAll('.symbol .dib >.code-name');

const arr = Array.from(list)
  .map((item) => {
    const str = item.innerHTML;
    return `'${str.slice(6, str.length)}'`;
  })
  .join(' | ');

console.log(
  '%c 🥤 arr',
  'font-size:16px;color:#666666;background:#D9D9D9',
  arr
);
