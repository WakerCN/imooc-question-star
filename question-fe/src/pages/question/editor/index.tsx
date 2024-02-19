import { useTitle } from '@/hooks/common';
import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {}

export const QuestionEditor: React.FC<Props> = () => {
  const params = useParams();

  useTitle(`编辑 ${params.id}`);

  return (
    <div>
      QuestionEditor
      <div>Edit {params.id}</div>
    </div>
  );
};
