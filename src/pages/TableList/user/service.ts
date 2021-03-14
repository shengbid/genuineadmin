import request from '@/utils/request';

export async function queryList(params: {current: number, pageSize: number}) {
  return request('/TManagement/listByTManagement', {
    params: {
      pageNo: params.current,
      pageSize: params.pageSize
    }
  })
}