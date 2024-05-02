// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const TOKEN = localStorage.getItem('TOKEN_STRING');
const REQUEST_HEADER = {
  'Authorization':TOKEN,
}
/** 获取当前的用户 GET /api/currentUser */
// export async function currentUser(options?: { [key: string]: any }) {
//   return request<{
//     data: API.CurrentUser;
//   }>('/api/currentUser', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
// get user information
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/admin/system/index/getUserInfo', {
    method: 'GET',
    headers: {
      token:TOKEN
      // 'Authorization':TOKEN,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    // ...(options || {}),
  });
}

// get user staff
export async function getStaffLit(options?: { [key: string]: any }) {
  return request(`/admin/system/sysUser/findByPage/${1}/${10}`, {
    method: 'GET',
    headers: {
      token:TOKEN
    },
    ...(options || {}),
  });
}

// updateSysUser
export async function updateUserInfo(options?: { [key: string]: any }) {
  return request<{
    data: API.userInfo;
  }>('/admin/system/sysUser/updateSysUser', {
    method: 'PUT',
    ...(options || {}),
  });
}

// saveSysUser
// export async function updateProduct(body, options?: { [key: string]: any }) {
//   return request<API.LoginResult>('/admin/product/product/updateById', {
//     method: 'POST',
//     headers: {
//       token:TOKEN,
//     },
//     data: body,
//     ...(options || {}),
//   });
export async function addStaff(body,options?: { [key: string]: any }) {
  return request('/admin/system/sysUser/saveSysUser', {
    method: 'POST',
    headers: {
      token:TOKEN,
    },
    data: body,
    // ...(options || {}),
  });
}
// delete user By Id
export async function deleteUserByID(options?: { [userId: any]: any }) {
  return request<{
    data: API.userInfo;
  }>('/admin/system/sysUser/deleteById', {
    method: 'DELETE',
    ...(options || {}),
  });
}
// update user Role
export async function updateUserRole(options?: { [userId: any]: any }) {
  return request<{
    data: API.userInfo;
  }>('/admin/system/sysRole/updateSysRole', {
    method: 'PUT',
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/admin/system/index/logout', {
    method: 'GET',
    headers: {
      token:TOKEN
    },
    ...(options || {}),
  });
}

// add product
export async function addProduct(body, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/admin/product/product/save', {
    method: 'POST',
    headers: {
      token:TOKEN,
    },
    data: body,
    ...(options || {}),
  });
}

// update product
export async function updateProduct(body, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/admin/product/product/updateById', {
    method: 'POST',
    headers: {
      token:TOKEN,
    },
    data: body,
    ...(options || {}),
  });
}


// get product list
export async function getProductList(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/admin/product/product', {
    method: 'GET',
    headers: {
      token:TOKEN
    },
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
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

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    limit?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}

/** delete order GET /admin/product/product/deleteById */
export async function deleteOrerById(
  params: {
    // query
    id?: number;
  
  },
  options?: { [key: string]: any },
){
  console.log("deleteOrerById--params",params)
  return request(`/admin/product/product/deleteById/${params}  `, {
  
    method: 'DELETE',
    params: {
      
    },
    headers: {
      token:TOKEN
    },
    ...(options || {}),
  });
}

/** 获取入库列表 GET /admin/product/product */
export async function getInStorageList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    name?: string;
  },
  options?: { [key: string]: any },
) {
  console.log("getInStorageList--params",params)
  let formData = new FormData();
  formData.append("name", params.name);
  return request(`/admin/product/product/${params.current}/${params.pageSize}`, {
  
    method: 'GET',
    // body:formData,
    // params:{
    //   productDto:formData
    // },
    params: {
      name:params?.name,
      categoryld:params?.categoryld || '',
      orderId:params?.orderId
      // productDto:{
      //   name:params?.name,
      //   categoryld:params?.categoryld || ''
      // }
    },
    headers: {
      token:TOKEN,
      // 'Content-Type': 'multipart/form-data'
      // 'Content-Type': 'form-data'
      // 'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
    },
    ...(options || {}),
  });
}

/** out storage */
export async function outStorageById(
  params: {
    id?: number;
  },
  options?: { [key: string]: any },
) {
  console.log("outStorageById--params",params)
  return request(`/admin/product/product/updateStatus/${params}/${-1}`, {
    method: 'GET',
    // params,
    headers: {
      token:TOKEN,
    },
    ...(options || {}),
  });
}