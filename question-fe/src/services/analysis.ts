/*
 * @Author       : 魏威
 * @Date         : 2024-04-11 14:28
 * @LastEditTime : 2024-04-15 11:01
 * @LastEditors  : starone
 * @Description  :
 */

import axiosInstance, { ResponseData } from '.';

/** 获取问卷分析页数据 */
const getAnswerList = async (id: string): Promise<ResponseData> => {
  const url = `/api/question/analysis/answer/${id}`;
  const data = axiosInstance.get(url);
  return data;
};

export const AnalysisService = {
  getAnalysisData: getAnswerList
};
