import service from '@/utils/request';
/**
 * 添加一级分类
 */
export function addFirstCategoryApi(data) {
  return service.request({
    method: 'post',
    url: '/news/addFirstCategory/',
    data: data,
  });
}
/**
 * 添加二级分类
 */
export function addSecondCategoryApi(data) {
  return service.request({
    method: 'post',
    url: '/news/addChildrenCategory/',
    data: data,
  });
}
/**
 * 获取分类
 */
export function getCategoryApi(data) {
  return service.request({
    method: 'post',
    url: '/news/getCategoryAll/',
    data: data,
  });
}
/**
 * 删除分类
 */
export function deleteCategoryApi(data) {
  return service.request({
    method: 'post',
    url: '/news/deleteCategory/',
    data: data,
  });
}
/**
 * 修改分类
 */
export function editCategoryApi(data) {
  return service.request({
    method: 'post',
    url: '/news/editCategory/',
    data: data,
  });
}
/**
 * 添加信息
 */
export function addTableInfoApi(data) {
  return service.request({
    method: 'post',
    url: '/news/add/',
    data: data,
  });
}
/**
 * 获取列表
 */
export function getListApi(data) {
  return service.request({
    method: 'post',
    url: '/news/getList/',
    data: data,
  });
}
/**
 * 删除信息
 */
export function deleteInfoApi(data) {
  return service.request({
    method: 'post',
    url: '/news/deleteInfo/',
    data: data,
  });
}
/**
 * 修改信息
 */
export function editInfoApi(data) {
  return service.request({
    method: 'post',
    url: '/news/editInfo/',
    data: data,
  });
}
