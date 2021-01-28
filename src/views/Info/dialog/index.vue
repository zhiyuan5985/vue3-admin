<template>
  <el-dialog title="新增" 
  :visible.sync="dialogVisable" 
  :modal-append-to-body='false' 
  @close="handleClose"
  style="text-align: left;"
  width="575px">
    <!-- form表单  start -->
    <el-form :model="form">
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select style="width: 160px" v-model="form.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.name" style="width: 430px"></el-input>
      </el-form-item>
       <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input type="textarea" style="width:430px;" v-model="form.name" rows="6"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
    <!-- form表单  end -->
  </el-dialog>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted, computed, watch, watchEffect } from '@vue/composition-api';
export default {
  name: "DialogInfo",
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    /**
     * 数据
     */
    const dialogVisable = ref(false);
    const formLabelWidth = ref('70px');
    const form = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    });
    /***********************
     * 函数
     */
    const handleClose = () => {
      dialogVisable.value = false;
      emit('closeDialog');
    }
    /**
     * watch
     */
    watch(() => props.flag, (newVal, oldVal) => {
      dialogVisable.value = newVal;
    })
    return {
      dialogVisable,
      formLabelWidth,
      form,
      handleClose
    }
  },
}
</script>

<style lang="scss" scoped>

</style>