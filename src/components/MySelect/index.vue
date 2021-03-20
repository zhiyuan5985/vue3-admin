<template>
  <el-select v-model="data.selectValue" placeholder="">
    <el-option
      v-for="item in data.initOption"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted, computed, watch } from '@vue/composition-api';

export default {
  name: "mySelect",
  props: {
    config: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { root, emit }) {
    /****************************
     * Reactive
     */
    const data = reactive({
      options: [
        {value: "name", label: "姓名"},
        {value: "phone", label: "手机号"},
        {value: "email", label: "邮箱"},
        {value: "id", label: "ID"},
        {value: "title", label: "标题"},
      ],
      selectValue: "",
      initOption: []
    });

    /****************************
     * Methods
     */
    // 初始化下拉框
    const initOptions = () => {
      let optionArr = [];
      props.config.forEach((item) => {
        let rightObj = data.options.filter(elem => elem.value == item)[0];
        optionArr.push(rightObj);
      })
      data.initOption = optionArr;
      data.selectValue = optionArr[0].value;
    }
    // 组件加载后
    onMounted(() => {
      initOptions();
    })

    return {
      // reactive
      data, 
      // methods
       
    }
  }
}
</script>
<style lang="scss" scoped>

</style>