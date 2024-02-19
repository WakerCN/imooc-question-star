import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useState } from 'react';
import styles from './index.module.scss';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SEARCH_KEY } from '@/constants';

interface ListSearchProps {}

export const ListSearch: React.FC<ListSearchProps> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const [keywords, setKeywords] = useState<string>(
    searchParams.get(SEARCH_KEY.KEYWORD) || ''
  );

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
    navigate({
      pathname,
      search: `${SEARCH_KEY.KEYWORD}=${e.target.value}`
    });
  };

  return (
    <Input
      className={styles['list-search']}
      value={keywords}
      onChange={handleKeywordsChange}
      size="small"
      placeholder="请输入关键字"
      prefix={<SearchOutlined />}
    />
  );
};
