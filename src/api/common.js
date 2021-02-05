import { reactive } from '@vue/composition-api';
import { getCategoryApi } from './news';
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