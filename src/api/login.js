import service from '@/utils/request';
/**
 * 获取验证码
 */
export function getSmsApi(data) {
  return service.request({
    method: 'post',
    url: '/getSms/',
    data: data,
  });
}

/**
 * 获取用户角色
 */

/**
 * 登录
 */
export function loginApi(data) {
  return service.request({
    method: 'post',
    url: '/login/',
    data: data,
  });
}
/**
 * 注册
 */
export function registerApi(data) {
  return service.request({
    method: 'post',
    url: '/register/',
    data: data,
  });
}
