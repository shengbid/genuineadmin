import request from '@/utils/request';

export async function queryList(params: {current: number, pageSize: number}) {
  return request('/api/query/user/list', {
    params: {
      pageNo: params.current,
      pageSize: params.pageSize
    }
  })
}