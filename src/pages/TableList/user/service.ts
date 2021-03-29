import request from '@/utils/request';

export async function queryList(params: {current: number, pageSize: number}) {
  return request('/gsh/listByTGshUser', {
    params: {
      pageNo: params.current,
      pageSize: params.pageSize
    }
  })
}

export async function toFreeze(id: number, type: number) {
  return request(`/gsh/freeze/${id}/${type}`, {
    method: 'delete'
  })
}

export async function getUserDetail(id: number) {
  return request(`/gsh/gshUserDetail/${id}`, {
  })
}