import { useTitle } from '@/hooks/common';
import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {}

export const QuestionAnalysis: React.FC<Props> = () => {
  const params = useParams();

  useTitle(`问卷分析 ${params.id}`);

  return <div>QuestionAnalysis {[params.id]}</div>;
};
