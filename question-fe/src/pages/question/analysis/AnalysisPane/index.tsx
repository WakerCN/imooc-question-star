/*
 * @Author       : 魏威
 * @Date         : 2024-04-11 11:11
 * @LastEditTime : 2024-05-27 16:32
 * @LastEditors  : starone
 * @Description  :
 */
/*
 * @Author       : 魏威
 * @Date         : 2024-04-11 11:11
 * @LastEditTime : 2024-05-27 15:54
 * @LastEditors  : starone
 * @Description  :
 */
import { Loading } from '@/components/Loading';
import { useGetAnalysisDetail } from '@/hooks/analysis';
import { AnalysisService } from '@/services/analysis';
import { CloseOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Typography } from 'antd';
import cs from 'classnames';
import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { DistributionPieChart } from '../DataPane/DistributionPieChart';
interface AnalysisPaneProps {}

export const AnalysisPane: React.FC<AnalysisPaneProps> = () => {
  const { selectedId, setSelectedId } = useGetAnalysisDetail();

  const { loading, runAsync: loadDetails } = useRequest(
    AnalysisService.getAnswerDetails,
    {
      manual: true
    }
  );

  useEffect(() => {
    console.log(`请求${selectedId}数据`);
    if (selectedId) {
      loadDetails(selectedId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const handleClose = () => {
    setSelectedId(null);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading classname={styles['loading']} />;
    }
    if (selectedId === 'qid-gender') {
      return (
        <div className={styles['content']}>
          <DistributionPieChart id={selectedId} />
        </div>
      );
    }
  };

  return (
    <div className={cs(styles['analysis-pane'], { hidden: !selectedId })}>
      <div className={styles['title']}>
        <Typography.Title className={styles['pane-name']} level={4}>
          问题详情
        </Typography.Title>
        {/* 关闭按钮 */}
        <Button
          type="text"
          className={styles['close-btn']}
          icon={<CloseOutlined />}
          onClick={handleClose}
        />
      </div>
      {renderContent()}
    </div>
  );
};
