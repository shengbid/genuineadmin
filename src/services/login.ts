import request from '@/utils/request';

export type LoginParamsType = {
  userName?: string;
  password?: string;
  mobile?: string;
  captcha?: string;
  type?: number | string;
  code?: number | string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  // return request('/TManagement/login', {
  return request('/TGshUser/login', {
    method: 'POST',
    data: {
      userAccount: params.userName,
      userPwd: params.password
    },
  });
}
// 注册
export async function getRegister(params: LoginParamsType) {
  return request('/gsh/saveTGshUser', {
    method: 'POST',
    data: {
      email: params.mobile,
      password: params.password,
      code: params.captcha
    },
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/email/sendSimpleEmail?toEmail=${mobile}`);
}
