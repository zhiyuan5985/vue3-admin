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
      <el-upload
        class="avatar-uploader"
        action="http://upload-z1.qiniup.com"
        :data="form.uploadKey"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
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
import { qiniuTokenApi } from '@/api/common';
import { getListApi, editInfoApi } from '@/api/news';
import { timestampToTime } from '@/utils/timeStamp';
// 引入富文本编辑器
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  name: 'InfoDetail',
  components: {
    quillEditor
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
      imageUrl: "",
      uploadKey: {
        token: "",
        key: ""
      }
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
    // 上传缩略图
    const handleAvatarSuccess = (res, file) => {
      form.imageUrl = `http://map.zhiyuan-space.top/${res.key}`;
    };
    // 缩略图预处理
    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        root.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        root.$message.error('上传头像图片大小不能超过 2MB!');
      }
      // 文件名转码
      let suffix = file.name;
      let key = encodeURI(`${suffix}`);
      form.uploadKey.key = key;
      return isJPG && isLt2M;
    };
    // 获取七牛云的token
    const getQiniuToken = () => {
      let requestData = {
        ak: "oQI1tbDCNHQDVSSB11CVkreT8EHTrIcrnGHMVrzP",
        sk: "KayIwV0CHIqSs1Nb6rlHTCRZone1-bezw3JJ9SyD",
        buckety: "zhiyuan-space"
      };
      qiniuTokenApi(requestData).then(res => {
        form.uploadKey.token = res.data.data.token;
      })
    }
    /**
     * 生命周期
     */
    onMounted(() => {
      getCategory();
      getList();
      getQiniuToken();
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
      onSubmit, handleAvatarSuccess, beforeAvatarUpload
    }
  }
}
</script>
<style scoped>
  * {
    text-align: left;
  }
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>