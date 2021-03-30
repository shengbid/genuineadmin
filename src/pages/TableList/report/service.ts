import request from '@/utils/request';

export async function queryList(params: {current: number, pageSize: number}) {
  return request('/gsh/listByTReport', {
    params: {
      pageNo: params.current,
      pageSize: params.pageSize
    }
  })
}

export async function setSugestionStatus(id: number | string) {
  return request(`/gsh/setReportStatus/${id}`, {
    method: 'put'
  })
}