<template>
  <el-upload
    class="avatar-uploader"
    action="http://upload-z1.qiniup.com"
    :data="uploadKey"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted, computed, watch } from '@vue/composition-api';
import { qiniuTokenApi } from '@/api/common';
export default {
  name: "imgUpload",
  props: {
    imgUrl: {
      type: String,
      default: ""
    }
  },
  setup(props, { root, emit }) {
    /**
     * Ref
     */
    const imageUrl = ref("");
    /****************************
     * Reactive
     */
    const uploadKey = reactive({
      token: "",
      key: ""
    });
    /****************************
     * Methods
     */
    // 上传缩略图
    const handleAvatarSuccess = (res, file) => {
      imageUrl.value = `http://map.zhiyuan-space.top/${res.key}`;
      emit("update:imgUrl", `http://map.zhiyuan-space.top/${res.key}`);
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
      uploadKey.key = key;
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
        uploadKey.token = res.data.data.token;
      })
    }
    // 监听
    watch(() => props.imgUrl, (val) => {
      imageUrl.value = val;
    })
    // 组件加载后
    onMounted(() => {
      getQiniuToken();
    })
    return {
      // ref
      imageUrl,
      // reactive
      uploadKey,
      // methods
      handleAvatarSuccess, beforeAvatarUpload, getQiniuToken
    }
  }
}
</script>
<style lang="scss" scoped>
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