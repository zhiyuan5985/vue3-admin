<template>
  <el-dialog title="新增" 
  :visible.sync="dialogVisable" 
  :modal-append-to-body='false' 
  @close="handleClose"
  @open="handleOpen"
  style="text-align: left;"
  width="575px">
    <!-- form表单  start -->
    <el-form :model="form" ref="form">
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select style="width: 160px" v-model="form.type" placeholder="请选择">
          <el-option 
          :label="elem.category_name" 
          :value="elem.id" 
          v-for="elem in categoryData.item" 
          :key="elem.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.title" style="width: 430px"></el-input>
      </el-form-item>
       <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input type="textarea" style="width:430px;" v-model="form.text" rows="6"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisable = false">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="submitLoading">确 定</el-button>
    </div>
    <!-- form表单  end -->
  </el-dialog>
</template>

<script>
import { addTableInfoApi } from '@/api/news';
import { reactive, ref, isRef, toRefs, onMounted, computed, watch, watchEffect } from '@vue/composition-api';
export default {
  name: "DialogInfo",
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit, root, refs }) {
    /**
     * 数据
     */
    // ref
    const dialogVisable = ref(false);
    const formLabelWidth = ref('70px');
    const submitLoading = ref(false);
    // reactive
    const form = reactive({
      type: '',
      title: '',
      text: ''
    });
    const categoryData = reactive({
      item:[]
    });
    /***********************
     * 函数
     */
    const handleClose = () => {
      dialogVisable.value = false;
      emit('closeDialog');
    };
    const handleOpen = () => {
      categoryData.item = props.category;
    }
    const submit = () => {
      dialogVisable.value = false;
      let data = {
        categoryId: form.type,
        title: form.title,
        createDate: "2020-02-02 12:00:00",
        content: form.text
      }
      submitLoading.value = true; 
      addTableInfoApi(data).then(res => {
        root.$message({
          message: res.data.message,
          type: "success",
        });
        submitLoading.value = false;
        // 重置表单
        form.type = '';
        form.title = '';
        form.text = ''; 
        emit('addSucess');
      })
    }
    /**
     * watch
     */
    watch(() => props.flag, (newVal, oldVal) => {
      dialogVisable.value = newVal;
    })
    return {
      // ref
      dialogVisable, formLabelWidth,submitLoading,
      // reactive
      form, categoryData,
      // methods
      handleClose, handleOpen,submit
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
