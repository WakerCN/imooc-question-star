import { QuestionInfo } from '@/components/QuestionCard';
import axiosInstance, { RequestData } from '.';

export interface ListParams {
  keyword?: string;
  page?: number;
  pageSize?: number;
  isStar?: boolean;
  isDeleted?: boolean;
}

/** 获取调查问卷详情 */
const getQuestion = async (id: string): Promise<RequestData> => {
  const url = `/api/question/${id}`;
  const data = (await axiosInstance.post(url, id)) as RequestData;
  return data;
};

/**
 * 创建调查问卷
 */
const createQuestion = async (): Promise<RequestData> => {
  const url = '/api/question';
  const data = (await axiosInstance.post(url)) as RequestData;
  return data;
};

/**
 * 获取调查问卷列表
 */
const getQuestionList = async (
  params: Partial<ListParams>
): Promise<RequestData> => {
  const url = '/api/question';
  const data = (await axiosInstance.get(url, { params })) as RequestData;
  return data;
};

/** 更新问卷 */
const updateQuestion = async (
  id: string,
  params: Partial<QuestionInfo>
): Promise<RequestData> => {
  const url = `/api/question/${id}`;
  const data = (await axiosInstance.patch(url, params)) as RequestData;
  return data;
};

/** 复制问卷 */
const duplicateQuestion = async (id: string): Promise<RequestData> => {
  const url = `/api/question/duplicate/${id}`;
  const data = (await axiosInstance.post(url)) as RequestData;
  return data;
};

/** 彻底删除问卷 */
const deleteQuestion = async (ids: string[]): Promise<RequestData> => {
  const url = `/api/question`;
  const data = (await axiosInstance.delete(url, {
    data: { ids }
  })) as RequestData;
  return data;
};

export const QuestionService = {
  getQuestion,
  createQuestion,
  getQuestionList,
  updateQuestion,
  duplicateQuestion,
  deleteQuestion
};
