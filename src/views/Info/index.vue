<template>
  <div class="info-index-wrapper">
    <el-row :gutter="16">
      <!-- 下拉选择器 start -->
      <el-col :span="4">
        <div class="item-wrap category">
          <label for="">类型：</label>
          <div class="content">
            <el-select v-model="typeSelect" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div> 
      </el-col>
      <!-- 下拉选择器 end -->

      <!-- 日期选择 start -->
      <el-col :span="7">
        <div class="item-wrap date">
          <label for="">日期：</label>
          <div class="content">
            <el-date-picker
              v-model="dateValue"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
              style="width: 100%">
            </el-date-picker>   
          </div>
        </div>
      </el-col>
      <!-- 日期选择 end -->

      <!-- 下拉选择器 关键字 start -->
      <el-col :span="7">
        <div class="item-wrap keyword">
          <label for="">关键字：</label>
          <div class="content">
            <el-select v-model="keywordSelect" style="width: 100%">
              <el-option
                v-for="item in keywordOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <!-- 下拉选择器 关键字 end -->

      <!-- 输入框  start -->
      <el-col :span="3">
        <el-input
          placeholder="请输入内容"
          v-model="keywordInput" style="width: 100%">
        </el-input>  
      </el-col>
      <!-- 输入框  end -->

      <!-- 按钮  start -->
      <el-col :span="3">
        <el-button type="danger" size="small" style="width: 100%;">搜索</el-button>
      </el-col>
      <!-- 按钮  start -->
    </el-row>
    <div class="black-space-30"></div>
    <!-- 表格 start -->
    <el-table
    :data="tableData"
    border
    style="width: 100%">
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="category" label="类别" align="center" width="90"></el-table-column>
      <el-table-column prop="date" label="日期" align="center" width="180"></el-table-column>
      <el-table-column prop="admin" label="管理员" align="center" width="90"></el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="240">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格  end -->
    <div class="black-space-30"></div>
    <!-- 底部分页  start -->
    <el-row>
      <el-col :span="12">
        <el-button type="medium" class="pull-left">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, jumper"
          :total="1000">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 底部分页  end -->

    <!-- 新增按钮 -->
    <div class="add-button pull-right" @click="dialogOpen">
       <svg-icons iconClass="add font22" iconName="add"/>
    </div>
    <!-- 新增弹窗 -->
    <dialog-info :flag="dialogVisible" @closeDialog="dialogVisible = false"/>
  </div>
</template>
<script>
import DialogInfo from './dialog/index' 
import { reactive, ref, isRef, toRefs, onMounted, computed } from '@vue/composition-api';
export default {
  name:"infoIndex",
  components: {
    DialogInfo
  },
  setup(props) {
    /**
     * 数据
     */
    const typeSelect = ref('');           // 类型选中
    const keywordSelect = ref('id');      // 关键词选中       
    const dateValue = ref('');            // 日期选中值
    const keywordInput = ref('');         // 关键词输入框输入值
    const dialogVisible = ref(false);      // 弹窗是否可见
    // 类型选项
    const typeOptions = reactive([{
      value: 1,
      label: '国际信息'
    }, {
      value: 2,
      label: '国内信息'
    }, {
      value: 3,
      label: '行业信息'
    }]);
    // 关键词选项
    const keywordOptions = reactive([{
      value: 'id',
      label: 'ID'
    }, {
      value: 'title',
      label: '标题'
    }]);
     // 表格数据
    const tableData =  reactive([{
      title: '纽约市长白思豪宣布退出总统竞选',
      category: '国内信息',
      admin:'张三',
      date: '2019-09-10 19:31:31'
    }, {
      title: '纽约市长白思豪宣布退出总统竞选',
      category: '国内信息',
      admin: '李四',
      date: '2019-09-10 19:31:31'
    }]);
    /***********************************
     * 方法
     */
    const handleSizeChange = (val) => {
      console.log(`每页 ${val} 条`);
    };
    const handleCurrentChange = (val) => {
      console.log(`当前页: ${val}`);
    };
    const dialogOpen = () => { 
      dialogVisible.value = true;
    }
    /************************************
     * 返回
     */
    return {
      typeOptions,
      keywordOptions,
      typeSelect,
      keywordSelect,
      dateValue,
      dialogVisible,
      keywordInput,
      tableData,
      handleSizeChange,
      handleCurrentChange,
      dialogOpen
    }
  }
}
</script>
<style lang="scss" scoped>
@import "styles/config.scss";
.info-index-wrapper {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 15px;
}
.item-wrap {
  &.category {
    @include labelDom(left, 50, 40, 110);
  }
  &.date {
    @include labelDom(right, 48, 40, 360);
  }
  &.keyword {
    margin-left: 100px;
    @include labelDom(right, 90, 40, 85);
  }
}
.el-button.el-button--danger {
  color: white;
}
.el-button.el-button--success {
  color: white;
}
.add-button {
  position: fixed;
  right: 15px;
  bottom: 50px;
}
</style>