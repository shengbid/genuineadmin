import request from '@/utils/request';

export async function queryList(params: {current: number, pageSize: number}) {
  return request('/gsh/listByTGshUser', {
    params: {
      pageNo: params.current,
      pageSize: params.pageSize,
      type: 0
    }
  })
}

export async function toFreeze(id: number | string, type: number | string) {
  return request(`/gsh/freeze/${id}/${type}`, {
    method: 'delete'
  })
}

export async function toBatchMassage(data: {ids: any[], message: string}) {
  return request(`/gsh/batchMassage`, {
    method: 'post',
    data
  })
}
