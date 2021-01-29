import { MessageBox } from 'element-ui';
export default {
  install (Vue, options) {
    Vue.prototype.confirmDelete = function (message) {
      MessageBox.confirm(message.content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        root.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        root.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
}