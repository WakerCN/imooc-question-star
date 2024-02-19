import { useEffect } from 'react';

export const useTitle = (title: string) => {
  useEffect(() => {
    window.document.title = `慧簿 | ${title}`;
  }, [title]);
};
