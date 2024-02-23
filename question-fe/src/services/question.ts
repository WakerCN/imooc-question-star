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

export const QuestionService = {
  getQuestion,
  createQuestion,
  getQuestionList
};
