/*
 * @Author       : 魏威
 * @Date         : 2024-02-06 11:02
 * @LastEditTime : 2024-04-22 15:26
 * @LastEditors  : starone
 * @Description  :
 */
import { ErrorPage } from '@/components/ErrorPage';
import { useTitle } from '@/hooks/common';
import { useGetQuestionDetail, useLoadQuestionDetail } from '@/hooks/question';
import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styles from './index.module.scss';
import { WidgetBaseItem } from '../editor/QuestionCanvas/WidgetBaseItem';
import { WidgetInfo } from '@/widgets';
import { useGetAnalysisDetail, useLoadAnalysisDetail } from '@/hooks/analysis';
import { DataPane } from './DataPane';
import { AnalysisPane } from './AnalysisPane';

interface Props {}

export const QuestionAnalysis: React.FC<Props> = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  useTitle(`问卷分析 ${params.id}`);

  const { loading: questionLoading, error } = useLoadQuestionDetail();
  const { loading: analysisLoading } = useLoadAnalysisDetail();

  const { widgetList } = useGetQuestionDetail();
  const { selectedId, setSelectedId } = useGetAnalysisDetail();

  const handleSelect = (e: React.MouseEvent, info: WidgetInfo) => {
    e.stopPropagation();
    setSearchParams({ questionId: info.fe_id });
  };

  const handleCancelSelect = () => {
    setSearchParams({});
  };

  useEffect(() => {
    setSelectedId(searchParams.get('questionId'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className={styles['analysis-page']}>
      {questionLoading || analysisLoading ? (
        <Spin fullscreen tip={'加载问卷详情中...'} />
      ) : error ? (
        <ErrorPage msg={error.message} />
      ) : (
        <>
          <div className={styles['canvas-area']} onClick={handleCancelSelect}>
            <section className={styles['canvas']}>
              {widgetList
                .filter((w) => !w.isHidden)
                .map((w) => (
                  <div key={w.fe_id} onClick={(e) => handleSelect(e, w)}>
                    <WidgetBaseItem info={w} active={selectedId === w.fe_id} />
                  </div>
                ))}
            </section>
          </div>
          <DataPane />
          <AnalysisPane />
        </>
      )}
    </div>
  );
};
