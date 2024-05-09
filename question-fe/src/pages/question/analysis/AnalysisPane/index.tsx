import React from 'react';
import styles from './index.module.scss';
import { useGetAnalysisDetail } from '@/hooks/analysis';
import cs from 'classnames';
interface AnalysisPaneProps {}

export const AnalysisPane: React.FC<AnalysisPaneProps> = () => {
  const { selectedId } = useGetAnalysisDetail();
  return (
    <div className={cs(styles['analysis-pane'], { hidden: !selectedId })}>
      AnalysisPane
    </div>
  );
};
