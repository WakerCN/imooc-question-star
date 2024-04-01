/*
 * @Author       : 魏威
 * @Date         : 2024-02-06 11:02
 * @LastEditTime : 2024-03-29 17:24
 * @LastEditors  : Waker
 * @Description  :
 */
import { ErrorPage } from '@/components/ErrorPage';
import { useTitle } from '@/hooks/common';
import { useGetQuestionDetail, useLoadQuestionDetail } from '@/hooks/question';
import { Spin } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { WidgetBaseItem } from '../editor/QuestionCanvas/WidgetBaseItem';
import { WidgetInfo } from '@/widgets';
import { useGetAnalysisDetail } from '@/hooks/analysis';
import { DataPane } from './DataPane';

interface Props {}

export const QuestionAnalysis: React.FC<Props> = () => {
  const params = useParams();
  useTitle(`问卷分析 ${params.id}`);

  const { loading, error } = useLoadQuestionDetail();
  const { widgetList } = useGetQuestionDetail();

  const { selectedId, setSelectedId } = useGetAnalysisDetail();

  const handleSelect = (info: WidgetInfo) => {
    setSelectedId(info.fe_id);
  };

  return (
    <div className={styles['analysis-page']}>
      {loading ? (
        <Spin fullscreen tip={'加载问卷详情中...'} />
      ) : error ? (
        <ErrorPage msg={error.message} />
      ) : (
        <>
          <section className={styles['canvas']}>
            {widgetList
              .filter((w) => !w.isHidden)
              .map((w) => (
                <div key={w.fe_id} onClick={() => handleSelect(w)}>
                  <WidgetBaseItem info={w} active={selectedId === w.fe_id} />
                </div>
              ))}
          </section>
          <DataPane />
        </>
      )}
    </div>
  );
};
