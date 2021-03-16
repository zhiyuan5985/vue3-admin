import { reactive } from '@vue/composition-api';
import { getCategoryApi } from './news';
import service from '@/utils/request';
export function common() {
  const category = reactive({
    item: []
  });
  const getCategory = () => {
    getCategoryApi({}).then(res => {
      category.item = res.data.data;
    }).catch(err => {
  
    })
  }
  return {
    getCategory,
    category
  }  
}
/**
 * 获取七牛云token 
 */
export function qiniuTokenApi(data) {
  return service.request({
    method: 'post',
    url: '/uploadImgToken/',
    data: data,
  });
}
