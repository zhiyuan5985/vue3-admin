<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <el-row :gutter="30">
      <el-col :span="8">
        <div class="category">
          <h4>
            <svg-icons iconClass="minus_square font15" iconName="minus_square"/>
            新闻
            <div class="button-group">
              <el-button type="danger" size="mini" round>编辑</el-button>
              <el-button type="success" size="mini" round>添加子级</el-button>
              <el-button size="mini" round>删除</el-button>
            </div>
          </h4>
          <ul>
            <li>国内</li>
            <li>国际</li>
            <li>军事</li>
            <li>航天</li>
            <li>无人机</li>
          </ul>
          <h4>
            <svg-icons iconClass="add_square font15" iconName="add_square"/>
            科技
          </h4>
        </div>
      </el-col>
      <el-col :span="16">
        <h4 class="menu-title">一级分类编辑</h4>
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
          <el-form-item label="一级分类名称:" label-width="110px" class="w410">
            <el-input v-model="form.text1"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称:" label-width="110px" class="w410"> 
            <el-input v-model="form.text2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="mini">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive } from '@vue/composition-api'
export default {
  name:"infoIndex",
  setup(props) {
    const form = reactive({
      text1: "",
      text2: ""
    });
    return {
      form
    }
  }
}
</script>
<style lang="scss" scoped>
#category {
  text-align: left;
}
.category {
  line-height: 44px;
  position: relative;
  &:before {
    content: '';
    z-index: 10;
    position: absolute;
    width: 32px;
    height: 290px;
    border-right: 1px dotted rgb(129, 124, 124);
    top: 30px;
    left: 0;
    bottom: 0;
  }
  h4 {
    position: relative;
    width: 100%;
    height: 44px;
    padding-left: 45px;
    box-sizing: border-box;
    svg {
      position: absolute;
      left:25px;
      top:14px;
    }
    .button-group {
      display: none;
      position: absolute;
      right: 7px;
      top: -1px;
      z-index: 10;
      button {
        font-size: 12px;
        height: 35px;
        line-height: 20px;
      }
    }
  }
  li {
    padding-left: 40px;
    list-style: none;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      width: 32px;
      border-top: 1px dotted #000;
      top: 22px;
      left: -8px;
    }
  }
  li, h4 {
    @include webkit(transition, all .5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.menu-title {
  line-height: 44px;
  background-color: #f3f3f3;
  padding-left: 20px;
}
.w410 {
  width: 410px;
}
button {
  font-size: 12px;
  height: 35px;
  line-height: 20px;
}
</style>