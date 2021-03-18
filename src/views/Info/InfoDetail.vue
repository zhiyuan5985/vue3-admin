<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="信息分类:">
      <el-select v-model="form.categoryId" placeholder="请选择">
        <el-option
          v-for="item in typeOptions.category"
          :key="item.id"
          :label="item.category_name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻标题:">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="缩略图:">
      <upload-img :imgUrl.sync="form.imageUrl" />
    </el-form-item>
    <el-form-item label="发布日期:">
       <el-date-picker
        v-model="form.dateTime"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="详细内容:">
      <quill-editor 
        v-model="form.content" 
        ref="myQuillEditor">
      </quill-editor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>  
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted, computed, watch } from '@vue/composition-api';
import { common } from '@/api/common';
import { getListApi, editInfoApi } from '@/api/news';
import { timestampToTime } from '@/utils/timeStamp';
import UploadImg from '@/components/imgUpload/index';
// 引入富文本编辑器
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  name: 'InfoDetail',
  components: {
    quillEditor,
    UploadImg
  },
  setup(props, { root }) {
    /**
     * 公用方法数据
     */
    const { getCategory, category } = common();
    /**
     * 数据
     */
    // ref
    const submitLoading = ref(false);
    // reactive
    const  form = reactive({
      id: root.$store.getters["infoDetail/infoId"],
      categoryId: "",
      title: root.$store.getters["infoDetail/infoTitle"],
      content: "",
      dateTime: "",
      imageUrl: ""
    });
    const typeOptions = reactive({
      category: [],
    });
    /**
     * methods
     */
    const onSubmit = () => {
      let data = {
        id: form.id,
        categoryId: form.categoryId,
        title: form.title,
        createDate: form.dateTime,
        content: form.content,
        imgUrl: form.imageUrl
      }
      submitLoading.value = true; 
      editInfoApi(data).then(res => {
        console.log(res);
        root.$message({
          message: res.data.message,
          type: "success",
        });
        submitLoading.value = false;
        root.$router.push({
          name: 'infoIndex'
        });
      })
    }
    // 获取列表数据
    const getList = () => {
      // 单独处理数据
      let data = {
        id: form.id,
        pageNumber: 1,
        pageSize: 1,
      }
      getListApi(data).then(res => {
        // 找到对应的对象
        let resDataIndex = res.data.data.data.findIndex(item => item.id == form.id);
        let resData = res.data.data.data[resDataIndex];
        form.categoryId = resData.categoryId;
        form.content = resData.content;
        form.dateTime = timestampToTime(resData.createDate);
        form.imageUrl = resData.imgUrl;
      })
    };
    
    /**
     * 生命周期
     */
    onMounted(() => {
      getCategory();
      getList();
    })
    watch(() => category.item, (cur) => {
      typeOptions.category = cur;
    })
    return {
      // ref
      submitLoading,
      // reactive
      form, typeOptions,
      // methods
      onSubmit
    }
  }
}
</script>
<style scoped>
  * {
    text-align: left;
  }

</style>