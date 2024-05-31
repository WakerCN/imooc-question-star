/*
 * @Author       : 魏威
 * @Date         : 2024-04-11 14:28
 * @LastEditTime : 2024-05-27 15:51
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

/** 获取某个问题具体数据 */
const getAnswerDetails = async (id: string): Promise<ResponseData> => {
  const url = `/api/question/analysis/details/${id}`;
  const data = axiosInstance.get(url);
  return data;
};

export const AnalysisService = {
  getAnalysisData: getAnswerList,
  getAnswerDetails
};
