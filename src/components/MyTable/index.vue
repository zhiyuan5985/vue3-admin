<template>
   <el-table
    :data="data.tableData"
    border
    style="width: 100%">
    <el-table-column v-if="data.tableConfig.selection" label="" type="selection" width="40" ></el-table-column>
    <el-table-column
      v-for="item in data.tableConfig.thead"
      :key="item.label"
      align="center"
      :prop="item.prop"
      :label="item.label">
    </el-table-column>
  </el-table>
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted, computed, watch, onBeforeMount, onBeforeUpdate, onUpdated } from '@vue/composition-api';

export default {
  name:"MyTable",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, {root}) {
    
    /**********************************
     * 数据
     */
    const data = reactive({
        tableConfig: {
          thead:[],
          selection: false
        },
        tableData: [{
          user: '2016-05-02',
          name: '王小虎',
          phone: '1112315165',
          district: "广东",
          role: "管理员"
        }, {
          user: '12313-02',
          name: '王小虎',
          phone: '1112315165',
          district: "南京",
          role: "管理员"
        }]
      })
    /***********************************
     * 方法
     */


    /************************************
     * 生命周期
     */
    onBeforeMount(() => {
      data.tableConfig = props.config;
    })

    /************************************
     * 返回
     */
    return {
      // ref  

      // reactive 
      data
      // methods
   
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
<!--
组件目录位置：
组件引用方式：
参数配置：
-->