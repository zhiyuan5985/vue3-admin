<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="20">
        <div class="item-wrap">
          <label for="">关键字：</label>
          <div class="item-content">
            <el-row :gutter="16">
              <el-col :span="3">
                <my-select :config="data.configOptions" />
              </el-col>
              <el-col :span="6">
                <el-input v-model="data.searchValue" placeholder="请输入搜索内容"></el-input>
              </el-col>
              <el-col :span="10">
                <el-button class="pull-left" type="danger">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right" >新增用户</el-button>
      </el-col>
    </el-row>
    <div class="margin-top-30">
      <my-table :config="data.configTable"/>
    </div>
  </div>
</template>
<script>
import { reactive } from '@vue/composition-api';
import mySelect from '@/components/MySelect/index';
import MyTable from '@c/MyTable/index';
export default {
  name:"userIndex",
  components: {
    mySelect,
    MyTable
  },
  setup(props) {
    const data = reactive({
      searchValue: "",
      configOptions: ["name", "phone","email"],
      configTable: {
        // 多选框
        selection: true,
        // 表头
        thead: [
          {prop:"user", label: "邮箱/用户名"},
          {prop:"name", label: "真实姓名"},
          {prop:"phone", label: "手机号"},
          {prop:"district", label: "地区"},
          {prop:"role", label: "角色"},
        ]
      }
    });
    return {
      data
    }  
  }
}
</script>
<style lang="scss" scoped>
@import "styles/config.scss";
.item-wrap {
  @include labelDom(left, 70, 50, 1800);
}
</style>