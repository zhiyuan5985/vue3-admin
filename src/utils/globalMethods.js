import { MessageBox } from 'element-ui';
import { Message } from 'element-ui';

export default {
  install (Vue, options) {
    Vue.prototype.confirmDelete = function (params) {
      MessageBox.confirm(params.content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        params.fn && params.fn(params.id || '');
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
}