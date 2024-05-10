// This class contains functions to interact with the backend API for user management and product management.
import { request } from '@umijs/max';
const TOKEN = localStorage.getItem('TOKEN_STRING');

// Function to get current user information
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/admin/system/index/getUserInfo', {
    method: 'GET',
    headers: {
      token: TOKEN
    },
  });
}

// Function to get role by ID
export async function getRoleById(params: any, options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>(`/admin/system/sysUser/getRoleById/${params}`, {
    method: 'GET',
    headers: {
      token: TOKEN
    },
  });
}

// Function to get user staff
export async function getStaffLit(params: any, options?: { [key: string]: any }) {
  return request(`/admin/system/sysUser/findByPage/${1}/${10}`, {
    method: 'GET',
    headers: {
      token: TOKEN
    },
    params: {
      username: params?.username
    },
    ...(options || {}),
  });
}

// Function to update user information
export async function updateUserInfo(options?: { [key: string]: any }) {
  return request<{
    data: API.userInfo;
  }>('/admin/system/sysUser/updateSysUser', {
    method: 'PUT',
    ...(options || {}),
  });
}

// Function to add staff
export async function addStaff(body: any, options?: { [key: string]: any }) {
  return request('/admin/system/sysUser/saveSysUser', {
    method: 'POST',
    headers: {
      token: TOKEN,
    },
    data: body,
    ...(options || {}),
  });
}

// Function to update staff
export async function updateStaff(body: any, options?: { [key: string]: any }) {
  return request('/admin/system/sysUser/updateSysUser', {
    method: 'PUT',
    headers: {
      token: TOKEN,
    },
    data: body,
    ...(options || {}),
  });
}

// Function to assign role
export async function assignRole(body: any, options?: { [key: string]: any }) {
  let res = request<API.LoginResult>(`/admin/system/sysUser/doAssign`, {
    method: 'POST',
    headers: {
      token: TOKEN,
    },
    params: body,
    ...(options || {}),
  });
  console.log(res, 'doAssign res')
  return res;
}

// Function to delete user by ID
export async function deleteUserByID(params: any, options?: { [userId: any]: any }) {
  return request(`/admin/system/sysUser/deleteById/${params}`, {
    method: 'DELETE',
    headers: {
      token: TOKEN
    },
    ...(options || {}),
  });
}

// Function to update user role
export async function updateUserRole(options?: { [userId: any]: any }) {
  return request<{
    data: API.userInfo;
  }>('/admin/system/sysRole/updateSysRole', {
    method: 'PUT',
    ...(options || {}),
  });
}

// Function to logout
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/admin/system/index/logout', {
    method: 'GET',
    headers: {
      token: TOKEN
    },
    ...(options || {}),
  });
}

// Function to add product
export async function addProduct(body: any, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/admin/product/product/save', {
    method: 'POST',
    headers: {
      token: TOKEN,
    },
    data: body,
    ...(options || {}),
  });
}

// Function to update product
export async function updateProduct(body: any, options?: { [key: string]: any }) {
  let res = request<API.LoginResult>('/admin/product/product/updateById', {
    method: 'POST',
    headers: {
      token: TOKEN,
    },
    data: body,
    ...(options || {}),
  });
  console.log(res, 'updateProduct res')
  return res
}

// Function to get product list
export async function getProductList(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/admin/product/product', {
    method: 'GET',
    headers: {
      token: TOKEN
    },
    ...(options || {}),
  });
}

// Function to login
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

// Function to get notices
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

// Function to get rule list
export async function rule(params: any, options?: { [key: string]: any }) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// Function to update rule
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

// Function to add rule
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

// Function to remove rule
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}

// Function to delete order
export async function deleteOrerById(params: any, options?: { [key: string]: any }) {
  console.log("deleteOrerById--params", params)
  return request(`/admin/product/product/deleteById/${params}  `, {

    method: 'DELETE',
    params: {
    },
    headers: {
      token: TOKEN
    },
    ...(options || {}),
  });
}

// Function to get in storage list
export async function getInStorageList(params: any, options?: { [key: string]: any }) {
  console.log("getInStorageList--params", params)
  let formData = new FormData();
  formData.append("name", params.name);
  return request(`/admin/product/product/${params.current}/${params.pageSize}`, {

    method: 'GET',
    params: {
      name: params?.name,
      categoryld: params?.categoryld || '',
      orderId: params?.orderId,
      serialId: params?.serialId,
    },
    headers: {
      token: TOKEN,
    },
    ...(options || {}),
  });
}

// Function to out storage
export async function outStorageById(params: any, options?: { [key: string]: any }) {
  console.log("outStorageById--params", params)
  return request(`/admin/product/product/updateStatus/${params}/${-1}`, {
    method: 'GET',
    headers: {
      token: TOKEN,
    },
    ...(options || {}),
  });
}
