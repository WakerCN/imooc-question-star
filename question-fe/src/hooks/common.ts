/*
 * @Author       : 魏威
 * @Date         : 2024-02-06 14:19
 * @LastEditTime : 2024-03-11 14:17
 * @LastEditors  : Waker
 * @Description  :
 */
import { useEffect } from 'react';

export const useTitle = (title: string) => {
  useEffect(() => {
    window.document.title = `慧簿✨ | ${title}`;
  }, [title]);
};
