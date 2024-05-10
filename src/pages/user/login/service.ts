// Import the request function from UmiJS
import { request } from '@umijs/max';

// Define the interface for user login parameters
export interface UserLoginParams {
  userName: string;
  password: string;
}

// Async function to handle login request
export async function handleLogin(params: UserLoginParams) {
  // Send a POST request to the login endpoint with the provided parameters
  return request('/admin/system/index/login', {
    method: 'POST',
    data: params,
  });
}
