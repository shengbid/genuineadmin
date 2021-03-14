import request from '@/utils/request';

export async function queryList(params: {current: number, pageSize: number}) {
  return request('/TAdvertisement/listByTAdvertisement', {
    params: {
      pageNo: params.current,
      pageSize: params.pageSize
    }
  })
}
export async function uploadFile() {
  return request('/api/upload', {method: 'POST'})
}