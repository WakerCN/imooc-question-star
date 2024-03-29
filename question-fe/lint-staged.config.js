/*
 * @Author       : 魏威
 * @Date         : 2024-03-14 10:39
 * @LastEditTime : 2024-03-14 14:53
 * @LastEditors  : Waker
 * @Description  :
 */
import { ESLint } from 'eslint';

/**
 * 忽略文件从 .eslintignore
 * @link https://github.com/lint-staged/lint-staged?tab=readme-ov-file#how-can-i-ignore-files-from-eslintignore
 */
const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    })
  );
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);
  return filteredFiles.join(' ');
};

export default {
  'src/**/*.{js,jsx,ts,tsx,css,less,sass,scss,json}': 'prettier --write',
  'src/**/*.{js,jsx,ts,tsx}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    return [`eslint --max-warnings=0 ${filesToLint}`];
  }
};
