import request from '@/utils/request';

export type LoginParamsType = {
  userName?: string;
  password?: string;
  mobile?: string;
  userAccount?: string;
  captcha?: string;
  type?: number | string;
  code?: number | string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/gsh/login', {
    method: 'POST',
    data: {
      userAccount: params.mobile,
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
// 退出登录
export async function logout(params: LoginParamsType) {
  return request('/gsh/logOut', {
    method: 'POST',
    data: {
      userAccount: params.userAccount,
    },
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/email/sendSimpleEmail?toEmail=${mobile}`);
}
