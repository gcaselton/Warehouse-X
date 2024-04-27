import { request } from '@umijs/max';


export interface UserLoginParams {
  userName: string;
  password: string;
}

export async function fakeLogin(params: UserLoginParams) {
  return request('/admin/system/index/login', {
    method: 'POST',
    data: params,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  });
}
